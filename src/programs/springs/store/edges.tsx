import { atom } from 'jotai'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { initialEdgesData } from '../data/data1'
import { IInputReactEdges } from '../interfaces/edges'
import { ChangeEvent } from 'react'

type stringFields = 'name' | 'from' | 'to'

type numberFields = 'k'

const atomReactEdges = atom<IInputReactEdges[]>(initialEdgesData)

export const atomGetReactEdges = atom((get) => get(atomReactEdges))

interface ISetReactEdgesString {
  field: stringFields
  value: string
  index: number
}
export const atomSetReactEdgesString = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesString) => {
    set(
      atomReactEdges,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)

interface ISetReactEdgesNumber {
  field: numberFields
  value: number
  index: number
}

export const atomSetReactEdgesNumber = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesNumber) => {
    set(
      atomReactEdges,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)

interface ISetReactEdgesCombobox {
  field: 'from' | 'to'
  value: string
  index: number
}

export const atomSetReactEdgesCombobox = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesCombobox) => {
    set(
      atomReactEdges,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)
