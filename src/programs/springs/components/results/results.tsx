import { useAtom } from 'jotai'
import React from 'react'
import { atomGetResults } from '../../store/results/results'
import TypographyH2 from '@/components/typography/typography-h2'
import TypographyH3 from '@/components/typography/typography-h3'
import { atomGetAreDofDefinedByUser } from '../../store/areDofDefinedByUser'

import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import TypographyP from '@/components/typography/typography-p'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Locals from './locals'
import GlobalByStep from './globalByStep'

const Results = () => {
  const [response] = useAtom(atomGetResults)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)
  return (
    <div className="flex flex-col gap-2">
      {response.status !== 'prevalidationError' &&
        response.status !== 'verticesError' &&
        response.status !== 'edgesError' && (
          <div className="flex flex-col gap-2">
            {/* Orden de los grados de libertad */}
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Definimos el orden de los grados de libertad:
              </TypographyH3>

              <p>Por defecto los grados de libertad restringidos van arriba.</p>
              {areDofDefinedByUser && (
                <p>
                  Los nudos restringidos se ordenarán ascendentemente de acuerdo
                  al grado de libertad ingresado, al igual que los no
                  restringidos.
                </p>
              )}

              <Alert className="my-2 w-80 md:w-[600px]">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Atención!</AlertTitle>
                <AlertDescription>
                  Puedes invertir el orden de los grados de libertad con la
                  opción:
                  <br />
                  Los grados de libertad restringidos van arriba.
                </AlertDescription>
              </Alert>

              <p>El orden de los grados de libertad será el siguiente:</p>

              <div className="overflow-x-auto overflow-y-visible md:max-w-min my-2">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Posición</TableHead>
                      <TableHead className="text-center">Nudo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {response.results.orderDOF.map((e, index) => (
                      <TableRow key={e.id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">{e.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Matrices locales de rigidez de cada elemento */}
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Matrices locales de rigidez de cada elemento:
              </TypographyH3>

              <p>
                La matriz local de rigidez de cada elemento tiene la siguiente
                forma:
              </p>

              <div className="ml-0 text-xl md:ml-8 mt-4">
                <InlineMath
                  math="\begin{bmatrix} 
                         k & -k\\
                         -k & k
                         \end{bmatrix}"
                />
              </div>

              <p>
                Las etiquetas en filas y columnas se corresponden con los grados
                de libertad asociados.
              </p>

              <div className="my-2">
                <Locals locals={response.results.locals} />
              </div>
            </div>

            {/* Matriz de rigidez global por pasos*/}
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Ensamblando de la matriz globlal de rigideces:
              </TypographyH3>
            </div>

            <p>Proceso de ensamblado de la matriz global de rigideces.</p>

            <GlobalByStep
              kGlobalHistory={response.results.utils.kGlobalHistory}
            />
          </div>
        )}
    </div>
  )
}

export default Results
