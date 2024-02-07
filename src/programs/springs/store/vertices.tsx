import { atom } from 'jotai'

import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { initialVerticesData } from '../data/data1'
import { IInputReactVertices } from '../interfaces/vertices'

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

export const atomSetVerticesSwitchRestricted = atom(
  null,
  (_get, set, { value, index }: { value: boolean; index: number }) => {
    // set(
    //   atomVertices,
    //   produce((draft) => {
    //     if (draft[index]['isRestricted'] === false) {
    //       draft[index]['force'] = 0
    //     }
    //     if (draft[index]['isRestricted'] === true) {
    //       draft[index]['displacement'] = 0
    //     }
    //     draft[index]['isRestricted'] = !draft[index]['isRestricted']
    //   })
    // )

    //Make the same as the previous code but without using produce
    const draft = structuredClone(_get(atomVertices))
    if (draft[index]['isRestricted'] === false) {
      draft[index]['force'] = 0
    }
    if (draft[index]['isRestricted'] === true) {
      draft[index]['displacement'] = 0
    }
    draft[index]['isRestricted'] = !draft[index]['isRestricted']
    set(atomVertices, draft)
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

export const atomSetVerticesResetDofs = atom(
  null,
  (_get, set, areRestrictedOnTop: boolean) => {
    let restrictedCounter = 0
    let unrestrictedCounter = 0

    const numberOfRestricted = _get(atomGetVertices).filter(
      (vertex) => vertex.isRestricted
    ).length

    const numberOfUnrestricted = _get(atomGetVertices).filter(
      (vertex) => !vertex.isRestricted
    ).length

    set(
      atomVertices,
      produce((draft) => {
        if (areRestrictedOnTop) {
          draft.forEach((vertex) => {
            if (vertex.isRestricted) {
              vertex.userDOF = restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOF = numberOfRestricted + unrestrictedCounter + 1
              unrestrictedCounter++
            }
          })
        } else {
          draft.forEach((vertex) => {
            if (vertex.isRestricted) {
              vertex.userDOF = numberOfUnrestricted + restrictedCounter + 1
              restrictedCounter++
            } else {
              vertex.userDOF = unrestrictedCounter + 1
              unrestrictedCounter++
            }
          })
        }
      })
    )
  }
)
