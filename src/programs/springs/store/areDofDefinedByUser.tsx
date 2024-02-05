import { atom } from 'jotai'
import { atomSetVerticesResetDofs } from './vertices'
import { atomGetAreRestrictedOnTop } from './areRestrictedsOnTop'

const atomAreDofDefinedByUser = atom(true)

export const atomGetAreDofDefinedByUser = atom((get) =>
  get(atomAreDofDefinedByUser)
)

export const atomSetSwitchAreDofDefinedByUser = atom(null, (_get, set) => {
  const currentValue = _get(atomAreDofDefinedByUser)
  if (currentValue) {
    set(atomSetVerticesResetDofs, _get(atomGetAreRestrictedOnTop))
  }

  set(atomAreDofDefinedByUser, !currentValue)
})
