import { atom } from 'jotai'
import { atomGetErrors } from '../errors/errors'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'
import { atomGetResults } from '../results'
import { ICoordinate3D } from '../../interfaces/utils'

type IStatus = 'prevalidationError' | 'calculationError' | 'ok'

interface IBar {
  name: string
  force: number
  state: 'compression' | 'tension' | 'zero'
  coordinates: [ICoordinate3D, ICoordinate3D]
}

interface IResponse {
  status: IStatus
  points: Array<ICoordinate3D>
  lines: IBar[]
}
export const atomGetGraphResults = atom<IResponse>((get) => {
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

  const results = get(atomGetResults)

  if (results.status !== 'ok') {
    response.status = 'calculationError'
    return response
  }

  response.points = vertices.map((vertex) => [
    vertex.coordinateX,
    vertex.coordinateZ,
    0,
  ])

  return response
})
