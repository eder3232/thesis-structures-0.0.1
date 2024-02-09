import { atom } from 'jotai'
import { initialEdgesData } from '../data/data1'
import { IInputReactEdges } from '../interfaces/edges'
import { produce } from 'immer'
import { atomGetVertices } from './vertices'
import { v4 as uuidv4 } from 'uuid'

type stringFields = 'name' | 'from' | 'to'

type numberFields = 'area' | 'elasticity'

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

export const atomSetEdgesAddNewRow = atom(null, (_get, set, index: number) => {
  set(
    atomEdges,
    produce((draft) => {
      const vertices = _get(atomGetVertices)

      const fistItem = vertices[0]
      const lastItem = vertices.at(-1)
      draft.push({
        id: uuidv4(),
        name: `e${draft.length + 1}`,
        from: fistItem?.name || '',
        to: lastItem?.name || '',
        area: 0,
        elasticity: 0,
      })
    })
  )
})

export const atomSetEdgesDeleteRow = atom(null, (_get, set, index: number) => {
  set(
    atomEdges,
    produce((draft) => {
      draft.splice(index, 1)
    })
  )
})
