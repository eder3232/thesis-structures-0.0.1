import { atom } from 'jotai'
import { IInputReactVertices } from '../interfaces/vertices'
import { initialVerticesData } from '../data/data1'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { atomGetAreRestrictedOnTop } from './areRestrictedsOnTop'

const atomVertices = atom<IInputReactVertices[]>(initialVerticesData)

export const atomGetVertices = atom((get) => get(atomVertices))

type IAxis = 'x' | 'z'

const axis = ['x', 'z'] as const

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

export const atomSetVerticesSwitchRestricted = atom(
  null,
  (_get, set, { index, axis }: { index: number; axis: IAxis }) => {
    set(
      atomVertices,
      produce((draft) => {
        if (axis === 'x') {
          if (draft[index].isRestrictedX === false) {
            draft[index]['forceX'] = 0
            draft[index]['springX'] = 0
          }
          if (draft[index].isRestrictedZ === true) {
            draft[index]['displacementX'] = 0
          }
          draft[index]['isRestrictedX'] = !draft[index].isRestrictedX
        }

        if (axis === 'z') {
          if (draft[index].isRestrictedZ === false) {
            draft[index]['forceZ'] = 0
            draft[index]['springX'] = 0
          }
          if (draft[index].isRestrictedX === true) {
            draft[index]['displacementZ'] = 0
          }
          draft[index]['isRestrictedZ'] = !draft[index].isRestrictedZ
        }
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
    set(atomSetVerticesResetDofs, {
      areRestrictedOnTop: _get(atomGetAreRestrictedOnTop),
    })
  }
)

export const atomSetVerticesResetDofs = atom(
  null,
  (_get, set, { areRestrictedOnTop }: { areRestrictedOnTop: boolean }) => {
    let restrictedCounter = 0
    let unrestrictedCounter = 0

    const numberOfRestricted = _get(atomGetVertices).reduce((a, c) => {
      if (c.isRestrictedX) a++
      if (c.isRestrictedZ) a++
      return a
    }, 0)

    const numberOfUnrestricted = _get(atomGetVertices).reduce((a, c) => {
      if (!c.isRestrictedX) a++
      if (!c.isRestrictedZ) a++
      return a
    }, 0)

    set(
      atomVertices,
      produce((draft) => {
        if (areRestrictedOnTop) {
          draft.forEach((vertex) => {
            if (vertex.isRestrictedX) {
              vertex.userDOFX = restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFX = numberOfRestricted + unrestrictedCounter + 1
              unrestrictedCounter++
            }
            if (vertex.isRestrictedZ) {
              vertex.userDOFZ = restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFZ = numberOfRestricted + unrestrictedCounter + 1
              unrestrictedCounter++
            }
          })
        } else {
          draft.forEach((vertex) => {
            if (vertex.isRestrictedX) {
              vertex.userDOFX = numberOfUnrestricted + restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFX = unrestrictedCounter + 1
              unrestrictedCounter++
            }
            if (vertex.isRestrictedZ) {
              vertex.userDOFZ = numberOfUnrestricted + restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOFZ = unrestrictedCounter + 1
              unrestrictedCounter++
            }
          })
        }
      })
    )
  }
)

//TODO: Fixear bug, al eliminar un vertice, se eliminan los DOF de los vertices restantes, pero no se actualizan los DOF de los vertices restantes.
