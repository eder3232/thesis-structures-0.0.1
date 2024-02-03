import { atom } from 'jotai'

import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { IInputReactVertices } from '../interfaces/vertices'
import { initialVerticesData } from '../data/data1'
import { get } from 'http'

const atomVertices = atom<IInputReactVertices[]>(initialVerticesData)

export const atomGetVertices = atom((get) => get(atomVertices))

type stringFields = 'name'

type numberFields = 'force' | 'displacement' | 'userDOF'

type booleanFields = 'isRestricted'

export const atomSetVerticesString = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
      index,
    }: { field: stringFields; value: string; index: number }
  ) => {
    set(
      atomVertices,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)

export const atomSetVerticesNumber = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
      index,
    }: { field: numberFields; value: number; index: number }
  ) => {
    set(
      atomVertices,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)

export const atomSetVerticesBoolean = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
      index,
    }: { field: booleanFields; value: boolean; index: number }
  ) => {
    set(
      atomVertices,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)

export const atomSetVerticesAddNewRow = atom(
  null,
  (_get, set, index: number) => {
    set(
      atomVertices,
      produce((draft) => {
        draft.splice(index + 1, 0, {
          id: uuidv4(),
          name: `v${draft.length + 1}`,
          force: 0,
          displacement: 0,
          isRestricted: false,
          userDOF: draft.length + 1,
        })
      })
    )
  }
)

export const atomSetVerticesDeleteRow = atom(
  null,
  (_get, set, index: number) => {
    set(
      atomVertices,
      produce((draft) => {
        draft.splice(index, 1)
      })
    )
  }
)
