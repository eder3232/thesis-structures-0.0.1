'use client'

import { useAtom } from 'jotai'

import TypographyH1 from '@/components/typography/typography-h1'
import TypographyH2 from '@/components/typography/typography-h2'
import TypographyH3 from '@/components/typography/typography-h3'

import AreDofDefinedByUser from './components/areDofDefinedByUser'
import VerticesTable from './components/verticesTable/verticesTable'

const Armor3D = () => {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Armaduras 3D</TypographyH1>
      <p>Ingresa los datos.</p>

      <AreDofDefinedByUser />

      <TypographyH2>Nudos</TypographyH2>

      <VerticesTable />
    </div>
  )
}

export default Armor3D