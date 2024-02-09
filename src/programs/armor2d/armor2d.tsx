'use client'

import TypographyH1 from '@/components/typography/typography-h1'
import TypographyH2 from '@/components/typography/typography-h2'
import VerticesTable from './components/verticesTable/verticesTable'
import AreDofDefinedByUser from './components/areDofDefinedByUser'
import TypographyH3 from '@/components/typography/typography-h3'
import EdgesTable from './components/edgesTable/edgesTable'

const Armor2D = () => {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Armaduras 2D</TypographyH1>

      <p>Ingresa los datos:</p>

      <AreDofDefinedByUser />

      <TypographyH2>Nudos</TypographyH2>

      <VerticesTable />

      <TypographyH3>Barras:</TypographyH3>

      <EdgesTable />
    </div>
  )
}

export default Armor2D
