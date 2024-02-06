import { IVertex, IVerticesGetData, IVerticesUtils } from './Vertices'

export interface IEdge {
  id: string
  area: number
  elasticity: number
  lengthEdge: number
  ea_l: number
  cos: number
  sin: number
  DOF: IDOF
  coordinates: {
    xi: number
    xj: number
    zi: number
    zj: number
  }
}

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

interface IInputEdge {
  id: string
  from: string
  to: string
  area: number
  elasticity: number
}

export interface IEdgesGetData {
  edges: Map<string, IEdge>
  vertices: Map<string, IVertex>
  utils: IVerticesUtils
}

export class Edges {
  data = new Map<string, IEdge>()
  vertices: Map<string, IVertex>
  utils: IVerticesUtils
  constructor(vertices: IVerticesGetData) {
    this.vertices = vertices.data
    this.utils = vertices.utils
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
    const fromZ = this.vertices.get(from)!.coordinates['z']

    const toX = this.vertices.get(to)!.coordinates['x']
    const toZ = this.vertices.get(to)!.coordinates['z']

    const lengthEdge = Math.sqrt(
      Math.pow(toX - fromX, 2) + Math.pow(toZ - fromZ, 2)
    )
    const ea_l = (elasticity * area) / lengthEdge
    const cos = (toX - fromX) / lengthEdge
    const sin = (toZ - fromZ) / lengthEdge

    const DOF: IDOF = {
      string: {
        internal: '',
        user: '',
      },
      table: [],
    }

    this.utils.axisDOF.map((a) =>
      DOF.table.push({
        internal: this.vertices.get(from)!.DOF[a].internal,
        user: this.vertices.get(from)!.DOF[a].user,
      })
    )
    this.utils.axisDOF.map((a) =>
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
      cos,
      sin,
      DOF,
      coordinates: {
        xi: fromX,
        xj: toX,
        zi: fromZ,
        zj: toZ,
      },
    })
  }

  getData(): IEdgesGetData {
    return {
      edges: this.data,
      vertices: this.vertices,
      utils: this.utils,
    }
  }
}
