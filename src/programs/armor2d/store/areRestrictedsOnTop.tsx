import { atom } from 'jotai'

const atomAreRestrictedsOnTop = atom(true)

export const atomGetAreRestrictedOnTop = atom((get) =>
  get(atomAreRestrictedsOnTop)
)

export const atomSetSwitchAreRestrictedOnTop = atom(null, (_get, set) => {
  const currentValue = _get(atomAreRestrictedsOnTop)

  set(atomAreRestrictedsOnTop, !currentValue)
})
