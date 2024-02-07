import { atom } from 'jotai'
import { IInputReactVertices } from '../interfaces/vertices'
import { initialVerticesData } from '../data/data1'
import { number } from 'mathjs'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'

const atomVertices = atom<IInputReactVertices[]>(initialVerticesData)

export const atomGetVertices = atom((get) => get(atomVertices))

type IAxis = 'x' | 'z'

const axis: IAxis[] = ['x', 'z']

type stringFields = 'name'

type numberFields =
  | 'coordinateX'
  | 'coordinateZ'
  | 'forceX'
  | 'forceZ'
  | 'displacementX'
  | 'displacementZ'
  | 'springX'
  | 'springZ'
  | 'userDOFX'
  | 'userDOFZ'

type booleanFields = 'isRestrictedX' | 'isRestrictedZ'

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
          coordinateX: 0,
          coordinateZ: 0,
          forceX: 0,
          forceZ: 0,
          displacementX: 0,
          displacementZ: 0,
          isRestrictedX: false,
          isRestrictedZ: false,
          springX: 0,
          springZ: 0,
          userDOFX: draft.length * axis.length + 1,
          userDOFZ: draft.length * axis.length + 2,
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

export const atomSetVerticesResetDofs = atom(
  null,
  (_get, set, { areRestrictedOnTop }: { areRestrictedOnTop: boolean }) => {
    let restrictedCounter = 0
    let unrestrictedCounter = 0

    const numberOfRestricted = _get(atomGetVertices).filter(
      (vertex) => vertex.isRestrictedX || vertex.isRestrictedZ
    ).length

    const numberOfUnrestricted = _get(atomGetVertices).filter(
      (vertex) => !vertex.isRestrictedX && !vertex.isRestrictedZ
    ).length

    set(
      atomVertices,
      produce((draft) => {
        if (areRestrictedOnTop) {
          draft.forEach((vertex) => {
            if (vertex.isRestrictedX || vertex.isRestrictedZ) {
              vertex.userDOFX = restrictedCounter + 1
              vertex.userDOFZ = restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFX = numberOfRestricted + unrestrictedCounter + 1
              vertex.userDOFZ = numberOfRestricted + unrestrictedCounter + 2
              unrestrictedCounter++
            }
          })
        } else {
          draft.forEach((vertex) => {
            if (vertex.isRestrictedX || vertex.isRestrictedZ) {
              vertex.userDOFX = numberOfUnrestricted + restrictedCounter + 1
              vertex.userDOFZ = numberOfUnrestricted + restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFX = unrestrictedCounter + 1
              vertex.userDOFZ = unrestrictedCounter + 1
              unrestrictedCounter++
            }
          })
        }
      })
    )
  }
)
