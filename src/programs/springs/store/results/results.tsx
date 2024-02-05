import { atom } from 'jotai'
import { ILocalArrays, IOrderDOF, Spring } from '../../logic/spring'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'
import { Vertices } from '../../logic/vertices'
import { atomGetEdgesErrors } from '../errors/edgesErrors'
import { IErrorLogic } from '../../interfaces/errors'
import { Edges } from '../../logic/edges'
import { atomGetAreRestrictedOnTop } from '../areRestrictedsOnTop'

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
        userDOF: { x: vertex.userDOF },
        force: vertex.force,
        displacement: vertex.displacement,
        isRestricted: vertex.isRestricted,
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
        k: edge.k,
        from: edge.from,
        to: edge.to,
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

  // Creando la instancia de clase Spring

  const spring = new Spring(edges.getData())

  response.results.orderDOF = spring.generateOrderDOF({
    isRestrictedAbove: areRestrictedOnTop,
  })

  spring.createDictionary()

  response.results.locals = spring.generateLocals()

  spring.generateData()

  response.results.utils.kGlobalHistory = spring.buildGlobalBySteps()

  response.results.k.global = spring.buildGlobal()

  const { krr, kru, kur, kuu } = spring.splitGlobal()

  response.results.k.krr = krr
  response.results.k.kru = kru
  response.results.k.kur = kur
  response.results.k.kuu = kuu

  const {
    global: fGlobal,
    restricted: fRestricted,
    unrestricted: fUnrestricted,
  } = spring.buildForces()

  response.results.f.global = fGlobal
  response.results.f.restricted = fRestricted
  response.results.f.unrestricted = fUnrestricted

  const {
    global: uGlobal,
    restricted: uRestricted,
    unrestricted: uUnrestricted,
  } = spring.buildDisplacement()

  response.results.u.global = uGlobal
  response.results.u.restricted = uRestricted
  response.results.u.unrestricted = uUnrestricted

  const { ok, message, uuSolved } = spring.solveDisplacements()
  if (ok) {
    response.results.u.solved = uuSolved
    response.results.f.solved = spring.solveForces()
    spring.buildNumericFandU()
    response.results.utils.internalForces = spring.solveInternalForces()
  } else {
    status = 'inverseMatrixError'
    response.errors.push({
      name: 'Error en la lógica al resolver el sistema de ecuaciones',
      message,
      typeError: 'logic',
      errorCode: 'e302',
      severity: 'error',
    })
  }

  return response
})
