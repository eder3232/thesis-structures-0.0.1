import { atom } from 'jotai'

const atomAreDofDefinedByUser = atom(true)

export const atomGetAreDofDefinedByUser = atom((get) =>
  get(atomAreDofDefinedByUser)
)

export const atomSetSwitchAreDofDefinedByUser = atom(null, (get, set) => {
  const currentValue = get(atomAreDofDefinedByUser)

  set(atomAreDofDefinedByUser, !currentValue)
})
