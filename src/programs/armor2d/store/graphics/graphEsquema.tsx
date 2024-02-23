import { atom } from 'jotai'
import { atomGetErrors } from '../errors/errors'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'

type IStatus = 'prevalidationError' | 'ok'

type ICoordinate3D = [number, number, number]

interface IResponse {
  status: IStatus
  points: Array<ICoordinate3D>
  lines: [ICoordinate3D, ICoordinate3D][]
}

export const atomGetGraph = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    points: [],
    lines: [],
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

  return response
})
