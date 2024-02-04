import { useAtom } from 'jotai'
import React from 'react'
import { atomGetResults } from '../../store/results/results'

const Results = () => {
  const [] = useAtom(atomGetResults)
  return <div>Results</div>
}

export default Results
