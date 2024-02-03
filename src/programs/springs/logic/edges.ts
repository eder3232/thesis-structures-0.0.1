import { number } from 'mathjs'
import { IVertex, IVerticesGetData } from './vertices'

interface IInputEdge {
  id: string
  k: number
  from: string
  to: string
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

export interface IEdge {
  id: string
  k: number
  from: string
  to: string
  DOF: IDOF
}

export interface IEdgesGetData {
  edges: Map<string, IEdge>
  verticesGetData: IVerticesGetData
}

export class Edges {
  data = new Map<string, IEdge>()
  verticesGetData: IVerticesGetData

  constructor(verticesGetData: IVerticesGetData) {
    this.verticesGetData = verticesGetData
  }

  add({ id, k, to, from }: IInputEdge) {
    const verticesUtil = this.verticesGetData.utils
    const verticesData = this.verticesGetData.data
    //Verificando si el id ya existe
    if (this.data.has(id)) {
      throw new Error(`La barra ${id} ya existe.`)
    }
    //Verificando si los nudos existen
    let vertexFrom = verticesData.get(from)
    let vertexTo = verticesData.get(to)

    if (vertexFrom === undefined) {
      throw new Error(`El nudo "to" ${to} de la barra ${id} no existe.`)
    }
    if (vertexTo === undefined) {
      throw new Error(`El nudo "from" ${from} de la barra ${id} no existe.`)
    }

    const DOF: IDOF = {
      string: {
        internal: '',
        user: '',
      },
      table: [],
    }

    verticesUtil.axisDOF.map((axis) => {
      DOF.table.push({
        internal: vertexFrom!.DOF[axis].internal,
        user: vertexFrom!.DOF[axis].user,
      })
    })
    verticesUtil.axisDOF.map((axis) => {
      DOF.table.push({
        internal: vertexTo!.DOF[axis].internal,
        user: vertexTo!.DOF[axis].user,
      })
    })

    DOF.table.map((dof, i) => {
      //primero llenamos los del user
      i !== 0 ? (DOF.string.user += '-') : (DOF.string.user += '')
      DOF.string.user += String(dof.user)
      //luego llenamos los internal
      i !== 0 ? (DOF.string.internal += '-') : (DOF.string.internal += '')
      DOF.string.internal += String(dof.internal)
    })

    this.data.set(id, { id, k, to, from, DOF })
  }

  getData(): IEdgesGetData {
    return {
      edges: this.data,
      verticesGetData: this.verticesGetData,
    }
  }
}
