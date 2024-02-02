'use client'

import TypographyH1 from '../../components/typography/typography-h1'
import TypographyH2 from '@/components/typography/typography-h2'
import TypographyH3 from '@/components/typography/typography-h3'
import AreRestrictedOnTop from './components/areRestrictedsOnTop'
import DofDefinedByUser from './components/dofDefinedByUser'
import EdgesTable from './components/edgesTable'
import VertexTable from './components/vertexTable'

const Springs = () => {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Resortes</TypographyH1>

      <div className="flex flex-col gap-4">
        <TypographyH2>Ingresa los datos:</TypographyH2>

        <TypographyH3>Nudos:</TypographyH3>

        <DofDefinedByUser />

        <VertexTable />

        <TypographyH3>Resortes:</TypographyH3>

        <EdgesTable />

        <AreRestrictedOnTop />
      </div>

      <div>
        <TypographyH2>Resultados: </TypographyH2>
      </div>
    </div>
  )
}

export default Springs
