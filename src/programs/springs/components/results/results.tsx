import { useAtom } from 'jotai'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import TypographyH3 from '@/components/typography/typography-h3'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

import { atomGetResults } from '../../store/results'
import { atomGetAreRestrictedOnTop } from '../../store/areRestrictedsOnTop'
import { atomGetAreDofDefinedByUser } from '../../store/areDofDefinedByUser'

import GlobalByStep from './globalByStep'
import Locals from './locals'
import TwoDimensionalArray from './shared/twoDimensionalArray'
import InternalForces from './internalForces'

const Results = () => {
  const [response] = useAtom(atomGetResults)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)
  const [areRestrictedOnTop] = useAtom(atomGetAreRestrictedOnTop)
  return (
    <div className="flex flex-col gap-2">
      {response.status !== 'prevalidationError' &&
        response.status !== 'verticesError' &&
        response.status !== 'edgesError' && (
          <div className="flex flex-col gap-4">
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

              <p>Proceso de ensamblado de la matriz global de rigideces.</p>

              <GlobalByStep
                kGlobalHistory={response.results.utils.kGlobalHistory}
              />
            </div>

            {/* Ecuación global de rigidez */}
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Ecuación global de rigidez del sistema de resortes:
              </TypographyH3>

              <p>La ecuación global de rigideces tiene la siguiente forma:</p>
              <div className="ml-0 text-xl md:ml-8">
                <InlineMath math="\begin{bmatrix}F\end{bmatrix}=\begin{bmatrix}K\end{bmatrix} \cdot \begin{bmatrix}U\end{bmatrix}" />
              </div>
              <p>
                Cuyos valores numéricos correspondientes son los siguientes:
              </p>

              {/* <div className="flex maw-w-full items-center overflow-auto lg:w-auto"> */}
              <div className="overflow-auto relative">
                <div className="min-w-min flex items-center">
                  <TwoDimensionalArray
                    arr={response.results.f.global}
                    name={'fGlobal'}
                  />

                  <div className="mx-4 text-3xl">
                    <InlineMath math="=" />
                  </div>

                  <TwoDimensionalArray
                    arr={response.results.k.global}
                    name={'kGlobal'}
                  />

                  <div className="mx-4 text-3xl">
                    <InlineMath math="\cdot" />
                  </div>

                  <TwoDimensionalArray
                    arr={response.results.u.global}
                    name={'uGlobal'}
                  />
                </div>
              </div>
            </div>

            {/* Separando la ecuación global de rigidez: */}
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Separando la ecuación global de rigidez:
              </TypographyH3>

              <p>
                Se puede definir la ecuación matricial de rigidez de una forma
                más reducida:
              </p>
              {areRestrictedOnTop ? (
                <div className="ml-0 text-xl md:ml-8">
                  <InlineMath
                    math="\begin{bmatrix} F_r\\F_u \end{bmatrix}
                      =
                      \begin{bmatrix} K_{rr} & K_{ru} \\ K_{ur} & K_{uu} \end{bmatrix}
                      \cdot 
                      \begin{bmatrix} U_r\\U_u \end{bmatrix}"
                  />
                </div>
              ) : (
                <div className="ml-0 text-xl md:ml-8">
                  <InlineMath
                    math="\begin{bmatrix} F_u\\F_r \end{bmatrix}
                      =
                      \begin{bmatrix} K_{uu} & K_{ur} \\ K_{ru} & K_{rr} \end{bmatrix}
                      \cdot 
                      \begin{bmatrix} U_u\\U_r \end{bmatrix}"
                  />
                </div>
              )}
              <p>Se forman las siguientes matrices de rigidez:</p>

              {/* <div className="flex max-w-full items-center overflow-auto lg:w-auto"> */}
              <div className="overflow-auto relative">
                <div className="min-w-min flex items-center">
                  <div
                    className={cn('flex flex-col gap-4', {
                      'flex-col-reverse': areRestrictedOnTop,
                    })}
                  >
                    <TwoDimensionalArray
                      arr={response.results.f.unrestricted}
                      name={'Fu'}
                    />
                    <TwoDimensionalArray
                      arr={response.results.f.restricted}
                      name={'Fr'}
                    />
                  </div>
                  <div className="mx-4 text-2xl">
                    <InlineMath math="=" />
                  </div>
                  <div>
                    {areRestrictedOnTop ? (
                      <div className="flex items-center gap-x-4">
                        <div className="flex flex-col gap-4">
                          <TwoDimensionalArray
                            arr={response.results.k.krr}
                            name={'Krr'}
                          />
                          <TwoDimensionalArray
                            arr={response.results.k.kur}
                            name={'Kur'}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <TwoDimensionalArray
                            arr={response.results.k.kru}
                            name={'Kru'}
                          />
                          <TwoDimensionalArray
                            arr={response.results.k.kuu}
                            name={'Kuu'}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div className="flex flex-col gap-4">
                          <TwoDimensionalArray
                            arr={response.results.k.kuu}
                            name={'Kuu'}
                          />
                          <TwoDimensionalArray
                            arr={response.results.k.kru}
                            name={'Kru'}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <TwoDimensionalArray
                            arr={response.results.k.kur}
                            name={'Kur'}
                          />
                          <TwoDimensionalArray
                            arr={response.results.k.krr}
                            name={'Krr'}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mx-4 text-2xl">
                    <InlineMath math="\cdot" />
                  </div>
                  <div
                    className={cn('flex flex-col gap-4 overflow-x-auto', {
                      'flex-col-reverse': areRestrictedOnTop,
                    })}
                  >
                    <TwoDimensionalArray
                      arr={response.results.u.unrestricted}
                      name={'Uu'}
                    />
                    <TwoDimensionalArray
                      arr={response.results.u.restricted}
                      name={'Ur'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Solución del sistema de ecuaciones */}

            {response.status === 'inverseMatrixError' && (
              <Alert className="my-2 w-80 md:w-[600px]">
                <Terminal className="h-4 w-4" />
                <AlertTitle>
                  Error en la resolución del sistema de ecuaciones
                </AlertTitle>
                <AlertDescription>
                  No se pudo resolver el sistema de ecuaciones. Esto puede
                  deberse a que la matriz de rigidez global no es invertible.
                </AlertDescription>
              </Alert>
            )}

            {response.status !== 'inverseMatrixError' && (
              <div className="flex flex-col gap-4">
                {/* Solución de desplazamientos */}
                <div className="flex flex-col gap-2">
                  <TypographyH3>
                    Solución de los desplazamientos no restringidos:
                  </TypographyH3>
                  <p>
                    Se resuelve el sistema de ecuaciones matricial para obtener
                    los desplazamientos.
                  </p>

                  <div className="ml-0 text-xl md:ml-8">
                    <InlineMath
                      math="\begin{bmatrix} U_u \end{bmatrix}
                        =
                        \begin{bmatrix} K_{uu} \end{bmatrix}^{-1}
                        \cdot
                        \{
                          \begin{bmatrix} F_u \end{bmatrix}
                          -
                          \begin{bmatrix} K_{ur} \end{bmatrix}
                          \cdot
                          \begin{bmatrix} U_r \end{bmatrix}
                        \} 
                        "
                    />
                  </div>
                  <p>Entonces se tiene la siguiente ecuación:</p>

                  <div className="overflow-auto relative">
                    <div className="min-w-min flex items-center">
                      <TwoDimensionalArray
                        arr={response.results.u.unrestricted}
                        name={'Uu'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="=" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.k.kuu}
                        name={'Kuu'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="^{-1}" />
                      </div>

                      <div className="mx-4 text-2xl">
                        <InlineMath math="\cdot \{" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.f.unrestricted}
                        name={'Fu'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="-" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.k.kur}
                        name={'Kur'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="\cdot" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.u.unrestricted}
                        name={'Ur'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="\}" />
                      </div>
                    </div>
                  </div>

                  <p>Resolviendo se obtiene:</p>

                  <div className="overflow-auto relative">
                    <div className="min-w-min flex items-center">
                      <TwoDimensionalArray
                        arr={response.results.u.unrestricted}
                        name={'Uu'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="=" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.u.solved}
                        name={'UuSolved'}
                      />
                    </div>
                  </div>
                </div>

                {/* Solución de fuerzas */}
                <div className="flex flex-col gap-2">
                  <TypographyH3>
                    Solución de las fuerzas restringidas:
                  </TypographyH3>
                  <p>
                    Se despeja de la ecuacion global de rigidez las fuerzas
                    restringidas:
                  </p>

                  <div className="ml-0 text-xl md:ml-8">
                    <InlineMath
                      math="\begin{bmatrix} F_r \end{bmatrix}
                          =
                          \begin{bmatrix} K_{ru} \end{bmatrix}
                          \cdot
                          \begin{bmatrix} U_{u} \end{bmatrix}
                          +
                          \begin{bmatrix} K_{rr} \end{bmatrix}
                          \cdot
                          \begin{bmatrix} U_{r} \end{bmatrix}
                          "
                    />
                  </div>
                  <p>Entonces se tiene la siguiente ecuación:</p>

                  <div className="overflow-auto relative">
                    <div className="min-w-min flex items-center">
                      <TwoDimensionalArray
                        arr={response.results.f.restricted}
                        name={'Fr'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="=" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.k.kru}
                        name={'Kru'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="\cdot" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.u.solved}
                        name={'USolved'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="+" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.k.krr}
                        name={'Krr'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="\cdot" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.u.restricted}
                        name={'Ur'}
                      />
                    </div>
                  </div>

                  <p>Resolviendo se obtiene:</p>

                  <div className="overflow-auto relative">
                    <div className="min-w-min flex items-center">
                      <TwoDimensionalArray
                        arr={response.results.f.restricted}
                        name={'Fr'}
                      />

                      <div className="mx-4 text-2xl">
                        <InlineMath math="=" />
                      </div>

                      <TwoDimensionalArray
                        arr={response.results.f.solved}
                        name={'FrSolved'}
                      />
                    </div>
                  </div>
                </div>

                {/* Fuerzas internas */}
                <div className="flex flex-col gap-2">
                  <TypographyH3>
                    Fuerzas internas en los elementos:
                  </TypographyH3>
                  <p>
                    Se obtienen las fuerzas internas de cada elemento de acuerdo
                    a los desplazamientos obtenidos.
                  </p>

                  <p>
                    Para calcular las deformaciones y fuerzas internas tenemos:
                  </p>

                  <div className="ml-0 text-xl md:ml-8">
                    <InlineMath math="\Delta= U_j - U_i" />
                  </div>

                  <div className="ml-0 text-xl md:ml-8">
                    <InlineMath math="F =  k \cdot \Delta" />
                  </div>

                  <p>
                    Se procede a calcular las deformaciones y fuerzas internas
                    de cada elemento:
                  </p>

                  <InternalForces
                    internalForces={response.results.utils.internalForces}
                  />
                </div>

                <p className="text-xl font-bold">Fin de los resultados!</p>
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export default Results
