import { atom } from 'jotai'
import { IErrors } from '../../interfaces/errors'
import { atomGetEdgesErrors } from './edgesErrors'
import { atomGetVerticesErrors } from './verticesErrors'

const atomErrors = atom<IErrors[]>((get) => {
  const edgesErrors = get(atomGetEdgesErrors)
  const verticesErrors = get(atomGetVerticesErrors)
  return [...structuredClone(edgesErrors), ...structuredClone(verticesErrors)]
})
