import { atom } from 'jotai'
import { ICoordinate3D } from '../../interfaces/utils'
import { atomGetErrors } from '../errors/errors'
import { atomGetResults } from '../results'

type IStatus = 'prevalidationError' | 'calculationError' | 'ok'

export interface IBar {
  name: string
  forceValue: number
  state: 'compression' | 'tension' | 'zero'
  coordinates: [ICoordinate3D, ICoordinate3D]
}

export interface IReactionForGraphic {
  applicationPoint: ICoordinate3D
  axis: string
  value: number
}

interface IResponse {
  status: IStatus
  points: Array<ICoordinate3D>
  lines: IBar[]
  reactions: IReactionForGraphic[]
}

const calculateBarState = (
  force: number
): 'compression' | 'tension' | 'zero' => {
  const minForce = 0.00001
  if (force < 0 && Math.abs(force) > minForce) return 'compression'
  if (force > 0 && Math.abs(force) > minForce) return 'tension'
  return 'zero'
}

export const atomGetGraphResults = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    points: [],
    lines: [],
    reactions: [],
  }

  const getErrors = get(atomGetErrors)

  if (getErrors.length > 0) {
    response.status = 'prevalidationError'
    return response
  }

  const results = get(atomGetResults)
  // const edges = get(atomGetEdges)
  const edges = results.data.edges
  // const vertices = get(atomGetVertices)
  const vertices = results.data.vertices

  if (results.status !== 'ok') {
    response.status = 'calculationError'
    return response
  }

  // response.points = vertices.map((vertex) => [
  //   vertex.coordinateX,
  //   vertex.coordinateZ,
  //   0,
  // ])

  response.points = Array.from(vertices.values()).map((vertex) => [
    vertex.coordinates.x,
    vertex.coordinates.z,
    0,
  ])

  response.lines = Array.from(edges.values()).map((edge) => ({
    name: edge.id,
    forceValue: results.results.utils.internalForces.get(edge.id)!
      .internalForce,
    state: calculateBarState(
      results.results.utils.internalForces.get(edge.id)!.internalForce
    ),
    coordinates: [
      [edge.coordinates.xi, edge.coordinates.zi, 0],
      [edge.coordinates.xj, edge.coordinates.zj, 0],
    ],
  }))

  // reacciones:
  const reactions: IReactionForGraphic[] = []

  Array.from(vertices.values()).map((vertex) => {
    results.data.utils.axisDOF.map((axis) => {
      if (vertex.isRestricted[axis]) {
        reactions.push({
          applicationPoint: [vertex.coordinates.x, vertex.coordinates.z, 0],
          axis: axis,
          value:
            results.results.f.globalSolved[
              results.results.utils.dofPointerInDataArray.get(
                vertex.DOF[axis].internal
              )!
            ][0],
        })
      }
    })
  })

  response.reactions = reactions

  return response
})
