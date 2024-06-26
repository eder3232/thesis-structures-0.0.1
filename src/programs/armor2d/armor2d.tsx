'use client'

import { useAtom } from 'jotai'

import TypographyH1 from '@/components/typography/typography-h1'
import TypographyH2 from '@/components/typography/typography-h2'
import TypographyH3 from '@/components/typography/typography-h3'

import AreDofDefinedByUser from './components/areDofDefinedByUser'
import AreRestrictedOnTop from './components/areRestrictedsOnTop'
import EdgesTable from './components/edgesTable/edgesTable'
import EdgesErrors from './components/errors/edgesErrors'
import VerticesErrors from './components/errors/verticesErrors'
import Results from './components/results/results'
import VerticesTable from './components/verticesTable/verticesTable'
import Graphic2D from './components/graphs/graphEsquema/graphic2D'

import { atomGetErrors } from './store/errors/errors'

const Armor2D = () => {
  const [errors] = useAtom(atomGetErrors)
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Armaduras 2D</TypographyH1>

      <p>Ingresa los datos:</p>

      <AreDofDefinedByUser />

      <TypographyH2>Nudos</TypographyH2>

      <VerticesTable />

      <TypographyH3>Barras:</TypographyH3>

      <EdgesTable />

      <div className="flex flex-col gap-2">
        <VerticesErrors />

        <EdgesErrors />
      </div>

      <Graphic2D />

      <div className="flex flex-col gap-4">
        <TypographyH2>Resultados: </TypographyH2>
        <AreRestrictedOnTop />
        {errors.length === 0 && <Results />}
      </div>
    </div>
  )
}

export default Armor2D
