import {
  IVertex,
  IVerticesUtils,
  IVerticesSettings,
  ICoordinates,
  IVerticesGetData,
} from './Vertices'

interface IDOF {
  string: {
    internal: string
    user: string
  }
  table: {
    internal: number
    user: number
  }[]
}

export interface IEdge {
  id: string
  area: number
  elasticity: number
  lengthEdge: number
  ea_l: number
  cx: number
  cy: number
  cz: number
  DOF: IDOF
  coordinates: {
    i: ICoordinates
    j: ICoordinates
  }
}

interface IInputEdge {
  id: string
  from: string
  to: string
  area: number
  elasticity: number
}

export class Edges {
  data = new Map<string, IEdge>()
  vertices: Map<string, IVertex>
  verticesUtils: IVerticesUtils
  verticesSettings: IVerticesSettings
  constructor(vertices: IVerticesGetData) {
    this.vertices = vertices.data
    this.verticesUtils = vertices.utils
    this.verticesSettings = vertices.settings
  }

  add({ id, from, to, area, elasticity }: IInputEdge) {
    // Validaciones
    // Verificar que el edge con ese id no existe
    if (this.data.has(id)) {
      throw new Error(
        `La barra ${id} ya existe. Estos deben tener un nombre único.`
      )
    }
    // Verificar que el from y el to existen:
    if (this.vertices.has(from) === false) {
      throw new Error(
        `El vértice ${from}, asignado a la barra ${id} no existe.`
      )
    }
    if (this.vertices.has(to) === false) {
      throw new Error(`El vértice ${to}, asignado a la barra ${id} no existe.`)
    }
    //Valores necesarios
    const fromX = this.vertices.get(from)!.coordinates['x']
    const fromY = this.vertices.get(from)!.coordinates['y']
    const fromZ = this.vertices.get(from)!.coordinates['z']

    const toX = this.vertices.get(to)!.coordinates['x']
    const toY = this.vertices.get(to)!.coordinates['y']
    const toZ = this.vertices.get(to)!.coordinates['z']

    const lengthEdge = Math.sqrt(
      Math.pow(toX - fromX, 2) +
        Math.pow(toY - fromY, 2) +
        Math.pow(toZ - fromZ, 2)
    )

    const ea_l = (elasticity * area) / lengthEdge
    const cx = (toX - fromX) / lengthEdge
    const cy = (toY - fromY) / lengthEdge
    const cz = (toZ - fromZ) / lengthEdge

    const DOF: IDOF = {
      string: {
        internal: '',
        user: '',
      },
      table: [],
    }

    this.verticesUtils.axis.map((a) =>
      DOF.table.push({
        internal: this.vertices.get(from)!.DOF[a].internal,
        user: this.vertices.get(from)!.DOF[a].user,
      })
    )
    this.verticesUtils.axis.map((a) =>
      DOF.table.push({
        internal: this.vertices.get(to)!.DOF[a].internal,
        user: this.vertices.get(to)!.DOF[a].user,
      })
    )

    DOF.table.map((dof, i) => {
      //primero llenamos los del user
      i !== 0 ? (DOF.string.user += '-') : (DOF.string.user += '')
      DOF.string.user += String(dof.user)
      //luego llenamos los internal
      i !== 0 ? (DOF.string.internal += '-') : (DOF.string.internal += '')
      DOF.string.internal += String(dof.internal)
    })

    this.data.set(id, {
      id,
      area,
      elasticity,
      lengthEdge,
      ea_l,
      cx,
      cy,
      cz,
      DOF,
      coordinates: {
        i: {
          x: fromX,
          y: fromY,
          z: fromZ,
        },
        j: {
          x: toX,
          y: toY,
          z: toZ,
        },
      },
    })
  }

  getData() {
    return {
      edges: this.data,
      vertices: this.vertices,
      verticesUtils: this.verticesUtils,
      verticesSettings: this.verticesSettings,
    }
  }
}

export type IEdgesGetData = ReturnType<typeof Edges.prototype.getData>
