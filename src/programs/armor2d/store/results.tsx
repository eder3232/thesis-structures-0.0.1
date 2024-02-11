import { atom } from 'jotai'
import { IErrorLogic } from '../interfaces/errors'
import { ILocalArrays, IOrderDOF } from '../logic/Armor2D'
import { atomGetEdgesErrors } from './errors/edgesErrors'
import { atomGetVertices } from './vertices'
import { atomGetEdges } from './edges'
import { atomGetAreRestrictedOnTop } from './areRestrictedsOnTop'
import { Vertices } from '../logic/Vertices'
import { Edges } from '../logic/Edges'
import { Armor2D } from '../logic/Armor2D'

interface ISpringsResults {
  orderDOF: IOrderDOF[]
  locals: Map<string, ILocalArrays>
  utils: {
    kGlobalHistory: {
      label: string
      value: number[][]
    }[]
    internalForces: Map<
      string,
      {
        u_i: number
        u_j: number
        k: number
        internalForce: number
      }
    >
  }
  k: {
    global: number[][]
    krr: number[][]
    kru: number[][]
    kur: number[][]
    kuu: number[][]
  }
  f: {
    global: (number | string)[][]
    restricted: string[][]
    unrestricted: number[][]
    solved: number[][]
  }
  u: {
    global: (number | string)[][]
    restricted: number[][]
    unrestricted: string[][]
    solved: number[][]
  }
}

type IStatus =
  | 'prevalidationError'
  | 'verticesError'
  | 'edgesError'
  | 'inverseMatrixError'
  | 'ok'

interface IResponse {
  status: IStatus

  errors: IErrorLogic[]

  results: ISpringsResults
}

export const atomGetResults = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    errors: [],
    results: {
      locals: new Map(),
      orderDOF: [],
      utils: {
        kGlobalHistory: [],
        internalForces: new Map(),
      },
      k: {
        global: [],
        krr: [],
        kru: [],
        kur: [],
        kuu: [],
      },
      f: {
        global: [],
        restricted: [],
        unrestricted: [],
        solved: [],
      },
      u: {
        global: [],
        restricted: [],
        unrestricted: [],
        solved: [],
      },
    },
  }

  let status: IStatus = 'ok'

  const errors = get(atomGetEdgesErrors)

  // Si hay errores no se calculan los resultados
  if (errors.length > 0) {
    status = 'prevalidationError'
    return response
  }

  const verticesData = get(atomGetVertices)
  const edgesData = get(atomGetEdges)
  const areRestrictedOnTop = get(atomGetAreRestrictedOnTop)

  // Creando la instancia de clase Vertices

  // Se entiende que los vertices han sido validados, pero la clase vertices, realiza sus propias validaciones, asi que se controlan estos errores en caso ocurran.

  const vertices = new Vertices()

  verticesData.map((vertex) => {
    try {
      vertices.add({
        id: vertex.name,
        coordinates: {
          x: vertex.coordinateX,
          z: vertex.coordinateZ,
        },
        forces: {
          x: vertex.forceX,
          z: vertex.forceZ,
        },
        displacements: {
          x: vertex.displacementX,
          z: vertex.displacementZ,
        },
        isRestricted: {
          x: vertex.isRestrictedX,
          z: vertex.isRestrictedZ,
        },
        userDOF: { x: vertex.userDOFX, z: vertex.userDOFZ },
        springs: {
          x: vertex.springX,
          z: vertex.springZ,
        },
      })
    } catch (e) {
      if (e instanceof Error) {
        status = 'verticesError'
        response.errors.push({
          name: 'Error en la lógica al agregar un nudo',
          message: `Ha ocurrido un error al agregar el nudo ${vertex.id}: ${e.message}`,
          typeError: 'logic',
          errorCode: 'e300',
          severity: 'error',
        })
      }
    }
  })

  // Creando la instancia de clase Edges

  const edges = new Edges(vertices.getData())

  edgesData.map((edge) => {
    try {
      edges.add({
        id: edge.name,
        from: edge.from,
        to: edge.to,
        area: edge.area,
        elasticity: edge.elasticity,
      })
    } catch (e) {
      if (e instanceof Error) {
        status = 'edgesError'
        response.errors.push({
          name: 'Error en la lógica al agregar una barra',
          message: `Ha ocurrido un error al agregar la barra ${edge.id}: ${e.message}`,
          typeError: 'logic',
          errorCode: 'e301',
          severity: 'error',
        })
      }
    }
  })

  // Si hay errores no se calculan los resultados
  if (status !== 'ok') {
    response.status = status
    return response
  }

  // Creando la instancia de clase Armor2D

  const armor2D = new Armor2D(edges.getData())

  response.results.locals = armor2D.generateLocals()

  armor2D.generateDataArray()

  response.results.orderDOF = armor2D.generateOrderOfDOF({
    isRestrictedAbove: areRestrictedOnTop,
  })

  return response
})
