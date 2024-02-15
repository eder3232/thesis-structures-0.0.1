export interface ICoordinates {
  x: number
  y: number
  z: number
}

export interface IVertex {
  id: string
  coordinates: ICoordinates
  forces: ICoordinates
  displacements: ICoordinates
  isRestrained: {
    x: boolean
    y: boolean
    z: boolean
  }
  DOF: {
    x: { internal: number; user: number }
    y: { internal: number; user: number }
    z: { internal: number; user: number }
  }
  springs: ICoordinates
}

interface IInputVertex {
  id: string
  coordinates: ICoordinates
  forces: ICoordinates
  displacements: ICoordinates
  springs: ICoordinates
  isRestrained: {
    x: boolean
    y: boolean
    z: boolean
  }
  userDOF?: {
    x: number
    y: number
    z: number
  }
}

export interface IVerticesUtils {
  axis: ReadonlyArray<'x' | 'y' | 'z'>
  // axisDOF: ReadonlyArray<'x' | 'y' | 'z'>
  restrictedDOF: number
  unrestrictedDOF: number
  totalDOF: number
}

export interface IVerticesSettings {
  userHasDefinedDOF: boolean
}

export class Vertices {
  data = new Map<string, IVertex>()

  utils: IVerticesUtils = {
    axis: ['x', 'y', 'z'],
    // axisDOF: ['x', 'y', 'z'],
    restrictedDOF: 0,
    unrestrictedDOF: 0,
    totalDOF: 0,
  }

  settings: IVerticesSettings = {
    userHasDefinedDOF: false,
  }

  constructor({ userHasDefinedDOF }: { userHasDefinedDOF: boolean }) {
    this.settings.userHasDefinedDOF = userHasDefinedDOF
  }
  add({
    id,
    coordinates,
    forces,
    displacements,
    isRestrained,
    springs,
    userDOF,
  }: IInputVertex) {
    //Validaciones
    if (this.settings.userHasDefinedDOF && userDOF === undefined) {
      throw new Error(
        `Se debe proporcionar unos grados de libertad para el vertice: ${id}`
      )
    }
    // Verificar si el vertice ya existe
    if (this.data.has(id)) {
      throw new Error(
        `El vertice con el ${id} ya existe. No pueden haber dos vertices con el mismo id.`
      )
    }
    // Verificar que los grados de libertad restringidos no tengan una fuerza aplicada
    for (const a of this.utils.axis) {
      if (isRestrained[a] === true && forces[a] !== 0) {
        throw new Error(
          `El vertice con el ${id} tiene un grado de libertad restringido con una fuerza aplicada. No puede haber una fuerza aplicada en un grado de libertad restringido.`
        )
      }
      if (isRestrained[a] === false && displacements[a] !== 0) {
        throw new Error(
          `El vertice con el ${id} tiene un grado de libertad libre con un desplazamiento aplicado. No puede haber un desplazamiento aplicado en un grado de libertad libre.`
        )
      }
    }
    // Verificar si un grado de libertad que posee un resorte, no este restringido.
    for (const a of this.utils.axis) {
      if (springs[a] !== 0 && isRestrained[a] === true) {
        throw new Error(
          `El vertices ${id}en el eje ${a} tiene un resortes y está restringido, el grado de libertad no puede estar restringido, ya que de ser asi calculariamos la reacción, pero lo que queremos calcular en ese grado de libertad es el desplazamiento, con el que podras calcular la fuerza interna del resorte.`
        )
      }
    }
    // Contando grados de libertad

    for (const axis of this.utils.axis) {
      if (isRestrained[axis]) {
        this.utils.restrictedDOF += 1
      } else {
        this.utils.unrestrictedDOF += 1
      }
      this.utils.totalDOF += 1
    }

    const DOF = {
      x: { internal: 0, user: userDOF!['x'] },
      y: { internal: 0, user: userDOF!['y'] },
      z: { internal: 0, user: userDOF!['z'] },
    }

    const enumerator = this.data.size * this.utils.axis.length

    for (const [index, element] of this.utils.axis.entries()) {
      DOF[element].internal = enumerator + index
    }

    this.data.set(id, {
      id,
      forces,
      displacements,
      isRestrained,
      coordinates,
      DOF,
      springs,
    })
  }

  getData() {
    return {
      data: this.data,
      utils: this.utils,
      settings: this.settings,
    }
  }
}

export type IVerticesGetData = ReturnType<typeof Vertices.prototype.getData>
