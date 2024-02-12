import { useAtom } from 'jotai'

import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import TypographyH3 from '@/components/typography/typography-h3'

import { atomGetResults } from '../../store/results'
import { atomGetAreDofDefinedByUser } from '../../store/areDofDefinedByUser'
import { atomGetAreRestrictedOnTop } from '../../store/areRestrictedsOnTop'
import Locals from './locals/locals'
import OrderOfDof from './orderOfDof'
import TwoDimensionalArray from './shared/twoDimensionalArray'
import GlobalByStep from './globalByStep'
import { cn } from '@/lib/utils'

const Results = () => {
  const [response] = useAtom(atomGetResults)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)
  const [areRestrictedOnTop] = useAtom(atomGetAreRestrictedOnTop)

  // response.results.locals.forEach((local, key) => {
  //   console.log(key, local)
  // })

  return (
    <div className="flex flex-col gap-2">
      {response.status !== 'prevalidationError' &&
        response.status !== 'verticesError' &&
        response.status !== 'edgesError' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Matrices locales de rigidez de cada elemento:
              </TypographyH3>

              <p>
                Selecciona las matrices que deseas visualizar, o desactiva la
                siguiente opción para no ver ninguna:
              </p>

              <Locals locals={response.results.locals} />
            </div>

            <div className="flex flex-col gap-2">
              <TypographyH3>Orden de los grados de libertad:</TypographyH3>

              <p>El orden de los grados de libertad es el siguiente:</p>
              <p>
                El programa tomará en cuenta el orden de los grados de libertad
                para el ordenamiento si es que se ingresaron en la tabla, de lo
                contrario, se tomará el orden por defecto.
              </p>
              <p>
                Puedes invertir el orden, haciendo que los grados de libertad
                restringidos esten en la parte superior o en la parte inferior
                con la opción inicial de los resultados.
              </p>

              <OrderOfDof orderOfDof={response.results.orderDOF} />
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
                Ecuación global de rigidez del sistema:
              </TypographyH3>

              <p>La ecuación global de rigidez tiene la siguiente forma:</p>
              <div className="ml-0 text-xl md:ml-8">
                <InlineMath math="\begin{bmatrix}F\end{bmatrix}=\begin{bmatrix}K\end{bmatrix} \cdot \begin{bmatrix}U\end{bmatrix}" />
              </div>
              <p>
                Cuyos valores numéricos correspondientes son los siguientes:
              </p>

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
          </div>
        )}
    </div>
  )
}

export default Results
