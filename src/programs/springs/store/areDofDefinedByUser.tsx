import { atom } from 'jotai'

const atomAreDofDefinedByUser = atom(true)

export const atomGetAreDofDefinedByUser = atom((get) =>
  get(atomAreDofDefinedByUser)
)

export const atomSetSwitchAreDofDefinedByUser = atom(null, (_get, set) => {
  const currentValue = _get(atomAreDofDefinedByUser)

  set(atomAreDofDefinedByUser, !currentValue)
})

//TODO: IMPLEMENT THE UPDATE FUNCTION, WHEN IT CHANGE, IT SHOULD UPDATE THE VERTICES DOFS
