import { atom } from 'jotai'
import { atomGetErrors } from '../errors/errors'
import { atomGetVertices } from '../vertices'
import { atomGetEdges } from '../edges'

type IStatus = 'prevalidationError' | 'ok'

interface IResponse {
  status: IStatus
}
export const atomGetGraphResults = atom<IResponse>((get) => {
  const response: IResponse = {
    status: 'ok',
  }

  const getErrors = get(atomGetErrors)

  if (getErrors.length > 0) {
    response.status = 'prevalidationError'
    return response
  }

  const vertices = get(atomGetVertices)
  const edges = get(atomGetEdges)

  return response
})
