'use client'
import { Provider, createStore } from 'jotai'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

const JotaiProvider = ({ children }: Props) => {
  const [store] = useState(() => createStore())
  return <Provider store={store}>{children}</Provider>
}

export default JotaiProvider
