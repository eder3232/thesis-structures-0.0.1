import { atom } from 'jotai'
import { atomGetErrors } from '../errors/errors'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'
import { ICoordinate3D } from '../../interfaces/utils'

type IStatus = 'prevalidationError' | 'ok'

export type IForce = {
  forceValue: number
  applicationPoint: ICoordinate3D
  directorCosines: ICoordinate3D
}

export type IReaction = {
  reactionType: 'rollerSuport' | 'articulatedSuport'
  applicationPoint: ICoordinate3D
  directorCosines: ICoordinate3D
}

interface IResponse {
  status: IStatus
  points: Array<{
    name: string
    coordinates3d: ICoordinate3D
  }>
  lines: Array<{
    name: string
    coordinates3dName: ICoordinate3D
    coordinates3dFrom: ICoordinate3D
    coordinates3dTo: ICoordinate3D
  }>
  forces: IForce[]
  reactions: IReaction[]
}

export const atomGetGraph = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
    points: [],
    lines: [],
    forces: [],
    reactions: [],
  }

  const getErrors = get(atomGetErrors)

  if (getErrors.length > 0) {
    response.status = 'prevalidationError'
    return response
  }

  const vertices = get(atomGetVertices)
  const edges = get(atomGetEdges)

  response.points = vertices.map((vertex) => ({
    name: vertex.name,
    coordinates3d: [vertex.coordinateX, vertex.coordinateZ, 0],
  }))

  response.lines = edges.map((edge) => {
    const xFrom = vertices.find(
      (vertex) => vertex.name === edge.from
    )!.coordinateX
    const zFrom = vertices.find(
      (vertex) => vertex.name === edge.from
    )!.coordinateZ
    const xTo = vertices.find((vertex) => vertex.name === edge.to)!.coordinateX
    const zTo = vertices.find((vertex) => vertex.name === edge.to)!.coordinateZ

    const inverpValue = 0.25

    const xText = xFrom + inverpValue * (xTo - xFrom)
    const zText = zFrom + inverpValue * (zTo - zFrom)
    return {
      name: edge.name,
      coordinates3dName: [xText, zText, 0],
      coordinates3dFrom: [xFrom, zFrom, 0],
      coordinates3dTo: [xTo, zTo, 0],
    }
  })

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

  const reactions: IReaction[] = []

  vertices.map((vertex) => {
    let existSuport = true
    const obj: IReaction = {
      reactionType: 'rollerSuport',
      applicationPoint: [vertex.coordinateX, vertex.coordinateZ, 0],
      directorCosines: [0, 0, 0],
    }
    if (vertex.isRestrictedX && vertex.isRestrictedZ) {
      obj.reactionType = 'articulatedSuport'
    } else if (vertex.isRestrictedX) {
      obj.directorCosines = [0, 0, 90]
    } else if (vertex.isRestrictedZ) {
      obj.directorCosines = [0, 0, 0]
    } else {
      existSuport = false
    }

    if (existSuport) reactions.push(obj)
  })

  response.reactions = reactions

  return response
})
