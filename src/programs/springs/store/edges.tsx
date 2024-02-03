import { atom } from 'jotai'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { initialEdgesData } from '../data/data1'
import { IInputReactEdges } from '../interfaces/edges'
import { ChangeEvent } from 'react'

type stringFields = 'name' | 'from' | 'to'

type numberFields = 'k'

const atomEdges = atom<IInputReactEdges[]>(initialEdgesData)

export const atomGetEdges = atom((get) => get(atomEdges))

interface ISetReactEdgesString {
  field: stringFields
  value: string
  index: number
}
export const atomSetEdgesString = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesString) => {
    set(
      atomEdges,
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

export const atomSetEdgesNumber = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesNumber) => {
    set(
      atomEdges,
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

export const atomSetEdgesCombobox = atom(
  null,
  (_get, set, { field, value, index }: ISetReactEdgesCombobox) => {
    set(
      atomEdges,
      produce((draft) => {
        draft[index][field] = value
      })
    )
  }
)
