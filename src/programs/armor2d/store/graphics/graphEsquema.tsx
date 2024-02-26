import { atom } from 'jotai'
import { atomGetErrors } from '../errors/errors'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'

type IStatus = 'prevalidationError' | 'ok'

type ICoordinate3D = [number, number, number]

export type IForce = {
  forceValue: number
  applicationPoint: ICoordinate3D
  directorCosines: ICoordinate3D
}

interface IResponse {
  status: IStatus
  points: Array<ICoordinate3D>
  lines: [ICoordinate3D, ICoordinate3D][]
  forces: IForce[]
}

export const atomGetGraph = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    points: [],
    lines: [],
    forces: [],
  }

  const getErrors = get(atomGetErrors)

  if (getErrors.length > 0) {
    response.status = 'prevalidationError'
    return response
  }

  const vertices = get(atomGetVertices)
  const edges = get(atomGetEdges)

  response.points = vertices.map((vertex) => [
    vertex.coordinateX,
    vertex.coordinateZ,
    0,
  ])

  response.lines = edges.map((edge) => [
    [
      vertices.find((vertex) => vertex.name === edge.from)!.coordinateX,
      vertices.find((vertex) => vertex.name === edge.from)!.coordinateZ,
      0,
    ],
    [
      vertices.find((vertex) => vertex.name === edge.to)!.coordinateX,
      vertices.find((vertex) => vertex.name === edge.to)!.coordinateZ,
      0,
    ],
  ])

  const forces: IForce[] = []
  //Para los cosenos directores tenemos que:
  // z = 0, mirando hacia arriba
  // z = 90, mirando hacia la izquierda
  // z = 180, mirando hacia abajo
  // z = 270, mirando hacia la derecha
  // O sea parte del eje

  vertices.map((vertex) => {
    const obj: IForce = {
      forceValue: 0,
      applicationPoint: [vertex.coordinateX, vertex.coordinateZ, 0],
      directorCosines: [0, 0, 0],
    }
    if (vertex.forceX !== 0) {
      obj.forceValue = vertex.forceX
      if (vertex.forceX > 0) {
        obj.directorCosines = [0, 0, 270]
      } else {
        obj.directorCosines = [0, 0, 90]
      }
      forces.push(obj)
    }
  })
  vertices.map((vertex) => {
    const obj: IForce = {
      forceValue: 0,
      applicationPoint: [vertex.coordinateX, vertex.coordinateZ, 0],
      directorCosines: [0, 0, 0],
    }

    if (vertex.forceZ !== 0) {
      obj.forceValue = vertex.forceZ
      if (vertex.forceZ > 0) {
        obj.directorCosines = [0, 0, 0]
      } else {
        obj.directorCosines = [0, 0, 180]
      }
      forces.push(obj)
    }
  })

  response.forces = forces

  return response
})
