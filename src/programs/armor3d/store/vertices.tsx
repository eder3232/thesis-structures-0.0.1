import { atom } from 'jotai'
import { IInputReactVertices } from '../interfaces/vertices'
import { initialVerticesData } from '../data/data1'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'

const atomVertices = atom<IInputReactVertices[]>(initialVerticesData)

export const atomGetVertices = atom((get) => get(atomVertices))

type IAxis = 'x' | 'y' | 'z'

const axis = ['x', 'y', 'z'] as const

type stringFields = 'name'

type numberFields =
  | 'coordinateX'
  | 'coordinateY'
  | 'coordinateZ'
  | 'forceX'
  | 'forceY'
  | 'forceZ'
  | 'displacementX'
  | 'displacementY'
  | 'displacementZ'
  | 'springX'
  | 'springY'
  | 'springZ'
  | 'userDOFX'
  | 'userDOFY'
  | 'userDOFZ'

type booleanFields = 'isRestrainedX' | 'isRestrainedY' | 'isRestrainedZ'

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

export const atomSetVerticesSwitchRestricted = atom(
  null,
  (_get, set, { index, axis }: { index: number; axis: IAxis }) => {
    set(
      atomVertices,
      produce((draft) => {
        if (axis === 'x') {
          if (draft[index].isRestrainedX === false) {
            draft[index]['forceX'] = 0
            draft[index]['springX'] = 0
          }
          if (draft[index].isRestrainedX === true) {
            draft[index]['displacementX'] = 0
          }
          draft[index]['isRestrainedX'] = !draft[index].isRestrainedX
        }

        if (axis === 'y') {
          if (draft[index].isRestrainedY === false) {
            draft[index]['forceY'] = 0
            draft[index]['springY'] = 0
          }
          if (draft[index].isRestrainedY === true) {
            draft[index]['displacementY'] = 0
          }
          draft[index]['isRestrainedY'] = !draft[index].isRestrainedY
        }

        if (axis === 'z') {
          if (draft[index].isRestrainedZ === false) {
            draft[index]['forceZ'] = 0
            draft[index]['springZ'] = 0
          }
          if (draft[index].isRestrainedZ === true) {
            draft[index]['displacementZ'] = 0
          }
          draft[index]['isRestrainedZ'] = !draft[index].isRestrainedZ
        }
      })
    )
  }
)

export const atomSetVerticesAddNewRow = atom(
  null,
  (_get, set, { index }: { index: number }) => {
    set(
      atomVertices,
      produce((draft) => {
        draft.splice(index + 1, 0, {
          name: '',
          coordinateX: 0,
          coordinateY: 0,
          coordinateZ: 0,
          forceX: 0,
          forceY: 0,
          forceZ: 0,
          displacementX: 0,
          displacementY: 0,
          displacementZ: 0,
          isRestrainedX: true,
          isRestrainedY: true,
          isRestrainedZ: true,
          springX: 0,
          springY: 0,
          springZ: 0,
          userDOFX: 7,
          userDOFY: 8,
          userDOFZ: 9,
          id: uuidv4(),
        })
      })
    )
  }
)

export const atomSetVerticesDeleteRow = atom(
  null,
  (_get, set, { index }: { index: number }) => {
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

    const numberOfRestricted = _get(atomGetVertices).reduce((a, c) => {
      if (c.isRestrainedX) a++
      if (c.isRestrainedY) a++
      if (c.isRestrainedZ) a++
      return a
    }, 0)

    const numberOfUnrestricted = _get(atomGetVertices).reduce((a, c) => {
      if (!c.isRestrainedX) a++
      if (!c.isRestrainedY) a++
      if (!c.isRestrainedZ) a++
      return a
    }, 0)

    set(
      atomVertices,
      produce((draft) => {
        if (areRestrictedOnTop) {
          draft.forEach((v) => {
            if (v.isRestrainedX) {
              restrictedCounter++
              v.userDOFX = restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFX = numberOfRestricted + unrestrictedCounter
            }
            if (v.isRestrainedY) {
              restrictedCounter++
              v.userDOFY = restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFY = numberOfRestricted + unrestrictedCounter
            }
            if (v.isRestrainedZ) {
              restrictedCounter++
              v.userDOFZ = restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFZ = numberOfRestricted + unrestrictedCounter
            }
          })
        } else {
          draft.forEach((v) => {
            if (v.isRestrainedX) {
              restrictedCounter++
              v.userDOFX = numberOfUnrestricted + restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFX = unrestrictedCounter
            }

            if (v.isRestrainedY) {
              restrictedCounter++
              v.userDOFY = numberOfUnrestricted + restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFY = unrestrictedCounter
            }

            if (v.isRestrainedZ) {
              restrictedCounter++
              v.userDOFZ = numberOfUnrestricted + restrictedCounter
            } else {
              unrestrictedCounter++
              v.userDOFZ = unrestrictedCounter
            }
          })
        }
      })
    )
  }
)
