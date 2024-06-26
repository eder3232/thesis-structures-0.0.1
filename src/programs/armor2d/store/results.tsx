import { atom } from 'jotai'
import { IErrorLogic } from '../interfaces/errors'
import { ILocalArrays, IOrderDOF } from '../logic/Armor2D'
import { atomGetEdgesErrors } from './errors/edgesErrors'
import { atomGetVertices } from './vertices'
import { atomGetEdges } from './edges'
import { atomGetAreRestrictedOnTop } from './areRestrictedsOnTop'
import { Vertices } from '../logic/Vertices'
import { Edges, IEdgesGetData } from '../logic/Edges'
import { Armor2D } from '../logic/Armor2D'
import { atomGetAreDofDefinedByUser } from './areDofDefinedByUser'

interface IArmor2DResults {
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
        // u_i: number
        // u_j: number
        // k: number
        internalForce: number
        solution: {
          local_localCoordinates: number[][]
          transformTransposed: number[][]
          u: number[][]
          internalForces: number[][]
        }
      }
    >
    dofPointerInDataArray: Map<number, number>
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
    globalSolved: number[][]
  }
  u: {
    global: (number | string)[][]
    restricted: number[][]
    unrestricted: string[][]
    solved: number[][]
    globalSolved: number[][]
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

  results: IArmor2DResults

  data: IEdgesGetData
}

export const atomGetResults = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    errors: [],
    data: {
      vertices: new Map(),
      edges: new Map(),
      utils: {
        axis: ['x', 'z'],
        axisDOF: ['x', 'z'],
        restrictedDOF: 0,
        unrestrictedDOF: 0,
        totalDOF: 0,
      },
    },
    results: {
      locals: new Map(),
      orderDOF: [],
      utils: {
        kGlobalHistory: [],
        internalForces: new Map(),
        dofPointerInDataArray: new Map(),
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
        globalSolved: [],
      },
      u: {
        global: [],
        restricted: [],
        unrestricted: [],
        solved: [],
        globalSolved: [],
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
  const areDofDefinedByUser = get(atomGetAreDofDefinedByUser)

  // Creando la instancia de clase Vertices

  // Se entiende que los vertices han sido validados, pero la clase vertices, realiza sus propias validaciones, asi que se controlan estos errores en caso ocurran.

  const vertices = new Vertices({
    userHasDefinedDOF: areDofDefinedByUser,
  })

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

  response.data.vertices = edges.getData().vertices
  response.data.edges = edges.getData().edges
  response.data.utils = edges.getData().utils

  // Creando la instancia de clase Armor2D

  const armor2D = new Armor2D(edges.getData())

  response.results.locals = armor2D.generateLocals()

  armor2D.generateDataArray()

  response.results.orderDOF = armor2D.generateOrderOfDOF({
    isRestrictedAbove: areRestrictedOnTop,
  })

  response.results.utils.dofPointerInDataArray =
    armor2D.generateDOFPointerInDataArray()

  const responseKGlobal = armor2D.buildGlobal()

  response.results.k.global = responseKGlobal.kGlobal

  response.results.utils.kGlobalHistory = responseKGlobal.record

  const responseForces = armor2D.buildForces()

  response.results.f.global = responseForces.global
  response.results.f.restricted = responseForces.restricted
  response.results.f.unrestricted = responseForces.unrestricted

  const responseDisplacements = armor2D.buildDisplacements()

  response.results.u.global = responseDisplacements.global
  response.results.u.restricted = responseDisplacements.restricted
  response.results.u.unrestricted = responseDisplacements.unrestricted

  const responseSplitGlobal = armor2D.splitGlobal()

  response.results.k.krr = responseSplitGlobal.krr
  response.results.k.kru = responseSplitGlobal.kru
  response.results.k.kur = responseSplitGlobal.kur
  response.results.k.kuu = responseSplitGlobal.kuu

  const { ok, message, uuSolved } = armor2D.solveDisplacements()

  if (ok) {
    response.results.u.solved = uuSolved
    response.results.f.solved = armor2D.solveForces()

    response.results.f.globalSolved = armor2D.joinGlobalForces()
    response.results.u.globalSolved = armor2D.joinGlobalDisplacements()
    armor2D.addDisplacementForEachEdge() //TODO FALTA COMPLETAR

    response.results.utils.internalForces = armor2D.calculateInternalForces()
  } else {
    response.status = 'inverseMatrixError'
    response.errors.push({
      name: 'Error en la lógica al resolver el sistema de ecuaciones',
      message: message,
      typeError: 'logic',
      errorCode: 'e302',
      severity: 'error',
    })
  }

  // response.results.

  return response
})
