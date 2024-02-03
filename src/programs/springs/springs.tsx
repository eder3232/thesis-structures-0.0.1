'use client'

import TypographyH1 from '../../components/typography/typography-h1'
import TypographyH2 from '@/components/typography/typography-h2'
import TypographyH3 from '@/components/typography/typography-h3'
import AreRestrictedOnTop from './components/areRestrictedsOnTop'
import AreDofDefinedByUser from './components/areDofDefinedByUser'
import EdgesTable from './components/edgesTable/edgesTable'
import VerticesTable from './components/verticesTable'
import VerticesErrors from './components/errors/verticesErrors'
import EdgesErrors from './components/errors/edgesErrors'

const Springs = () => {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Resortes</TypographyH1>

      <div className="flex flex-col gap-4">
        <TypographyH2>Ingresa los datos:</TypographyH2>

        <TypographyH3>Nudos:</TypographyH3>

        <AreDofDefinedByUser />

        <VerticesTable />

        <TypographyH3>Resortes:</TypographyH3>

        <EdgesTable />

        <div className="flex flex-col gap-2">
          <VerticesErrors />

          <EdgesErrors />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <TypographyH2>Resultados: </TypographyH2>

        <AreRestrictedOnTop />
      </div>
    </div>
  )
}

export default Springs
