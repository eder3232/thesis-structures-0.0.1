export interface IVertex {
  id: string;
  coordinates: { x: number; z: number };
  forces: { x: number; z: number };
  displacements: { x: number; z: number };
  isRestricted: { x: boolean; z: boolean };
  DOF: {
    x: { internal: number; user: number };
    z: { internal: number; user: number };
  };
  springs: { x: number; z: number };
}

interface IInputVertex {
  id: string;
  coordinates: { x: number; z: number };
  forces: { x: number; z: number };
  displacements: { x: number; z: number };
  isRestricted: { x: boolean; z: boolean };
  userDOF: { x: number; z: number };
  springs: { x: number; z: number };
}

export interface IVerticesUtils {
  axis: ReadonlyArray<"x" | "z">;
  axisDOF: ReadonlyArray<"x" | "z">;
  restrictedDOF: number;
  unrestrictedDOF: number;
  totalDOF: number;
}

export interface IVerticesGetData {
  data: Map<string, IVertex>;
  utils: IVerticesUtils;
}

export class Vertices {
  data = new Map<string, IVertex>();

  utils: IVerticesUtils = {
    axis: ["x", "z"],
    axisDOF: ["x", "z"],
    restrictedDOF: 0,
    unrestrictedDOF: 0,
    totalDOF: 0,
  };

  add(
    { id, coordinates, forces, displacements, isRestricted, userDOF, springs }:
      IInputVertex,
  ) {
    // Verificar si el nudo existe
    if (this.data.has(id)) {
      throw new Error(`El vertice con el ${id} ya existe. No pueden haber dos vertices con el mismo id.`);
    }

    // Verificar que los grados de libertad restringidos
    // no tenga una fuerza aplicada

    for (const a of this.utils.axisDOF) {
      if (isRestricted[a] === true && forces[a] !== 0) {
        throw new Error(`El vertice con el ${id} tiene un grado de libertad restringido con una fuerza aplicada. No puede haber una fuerza aplicada en un grado de libertad restringido.`);
      }
      if (isRestricted[a] === false && displacements[a] !== 0) {
        throw new Error(`El vertice con el ${id} tiene un grado de libertad libre con un desplazamiento aplicado. No puede haber un desplazamiento aplicado en un grado de libertad libre.`);
      }
    }

    // Verificar si un grado de libertad que posee un resorte, no este restringido.

    for (const a of this.utils.axisDOF) {
      if (springs[a] !== 0 && isRestricted[a] === true) {
        throw new Error(`El vertices ${id}en el eje ${a} tiene un resortes y está restringido, el grado de libertad no puede estar restringido, ya que de ser asi calculariamos la reacción, pero lo que queremos calcular en ese grado de libertad es el desplazamiento, con el que podras calcular la fuerza interna del resorte.`);
      }
    }

    // Contando grados de libertad

    for (const axis of this.utils.axisDOF) {
      if (isRestricted[axis]) {
        this.utils.restrictedDOF += 1;
      } else {
        this.utils.unrestrictedDOF += 1;
      }
      this.utils.totalDOF += 1;
    }
    const DOF = {
      x: { internal: 0, user: userDOF['x'] },
      z: { internal: 0, user: userDOF['z'] }
    }

    const enumerator = this.data.size * this.utils.axisDOF.length;

    for (const [index, element] of this.utils.axisDOF.entries()) {
      DOF[element].internal = enumerator + index;
    }

    this.data.set(id, {
      id, forces, displacements, isRestricted, coordinates, DOF, springs
    })
  }

  getData(): IVerticesGetData {
    return {
      data: this.data,
      utils: this.utils
    }
  }
}
