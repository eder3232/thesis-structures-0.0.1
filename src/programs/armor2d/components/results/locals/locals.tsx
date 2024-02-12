import { useState } from 'react'

import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import TypographyH4 from '@/components/typography/typography-h4'
import { ILocalArrays } from '../../../logic/Armor2D'
import TwoDimensionalArray from './twoDimensionalArrayForLocals'
import TwoDimensionalArrayForLocalsInGlobal from './twoDimensionalArrayForLocalsInGlobal'

interface Props {
  locals: Map<string, ILocalArrays>
}

const Locals = ({ locals }: Props) => {
  const [showLocal, setShowLocal] = useState({
    transform: true,
    transformTransposed: true,
    withoutEa_localCoordinates: true,
    local_localCoordinates: true,
    withoutEa_globalCoordinates: true,
    local_globalCoordinates: true,
    tableDOF: true,
    //TODO: Cambiar a true, false solo para desarrollo
    all: true,
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Selectores de matrices locales: */}

      <div className="flex items-center space-x-2">
        <Switch
          className="data-[state=checked]:bg-warning"
          checked={showLocal.all}
          onCheckedChange={() =>
            setShowLocal({
              transform: !showLocal.transform,
              transformTransposed: !showLocal.transformTransposed,
              withoutEa_localCoordinates: !showLocal.withoutEa_localCoordinates,
              local_localCoordinates: !showLocal.local_localCoordinates,
              withoutEa_globalCoordinates:
                !showLocal.withoutEa_globalCoordinates,
              local_globalCoordinates: !showLocal.local_globalCoordinates,
              tableDOF: !showLocal.tableDOF,
              all: !showLocal.all,
            })
          }
          id="withoutEa_localCoordinates"
        />
        <Label htmlFor="withoutEa_localCoordinates" className="font-bold">
          Mostrar matrices locales de rigidez de cada elemento.
        </Label>
      </div>

      {showLocal.all && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TypographyH4>
                Matrices locales de rigidez en coordenadas locales:
              </TypographyH4>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.withoutEa_localCoordinates}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      withoutEa_localCoordinates:
                        !showLocal.withoutEa_localCoordinates,
                    })
                  }
                  id="withoutEa_localCoordinates"
                />
                <Label htmlFor="withoutEa_localCoordinates">
                  Matriz local de rigidez en coordenadas locales sin el factor
                  EA.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.local_localCoordinates}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      local_localCoordinates: !showLocal.local_localCoordinates,
                    })
                  }
                  id="local_localCoordinates"
                />
                <Label htmlFor="local_localCoordinates">
                  Matriz local de rigidez en coordenadas locales con el factor
                  EA.
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <TypographyH4>Matrices de transformación:</TypographyH4>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.transform}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      transform: !showLocal.transform,
                    })
                  }
                  id="transform"
                />
                <Label htmlFor="transform">Matriz de transformación.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.transformTransposed}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      transformTransposed: !showLocal.transformTransposed,
                    })
                  }
                  id="transformTransposed"
                />
                <Label htmlFor="transformTransposed">
                  Matriz de transformación transpuesta.
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <TypographyH4>
                Matrices locales de rigidez en coordenadas globales:
              </TypographyH4>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.withoutEa_globalCoordinates}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      withoutEa_globalCoordinates:
                        !showLocal.withoutEa_globalCoordinates,
                    })
                  }
                  id="withoutEa_globalCoordinates"
                />
                <Label htmlFor="withoutEa_globalCoordinates">
                  Matriz local de rigidez en coordenadas globales sin el factor
                  EA.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showLocal.local_globalCoordinates}
                  onCheckedChange={() =>
                    setShowLocal({
                      ...showLocal,
                      local_globalCoordinates:
                        !showLocal.local_globalCoordinates,
                    })
                  }
                  id="local_globalCoordinates"
                />
                <Label htmlFor="local_globalCoordinates">
                  Matriz local de rigidez en coordenadas locales con el factor
                  EA.
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p>Para cada barra tenemos:</p>
            {Array.from(locals).map(([key, value], index) => (
              <div key={index} className="flex flex-col gap-4">
                <TypographyH4>Barra: {key}</TypographyH4>

                {(showLocal.withoutEa_localCoordinates ||
                  showLocal.local_localCoordinates) && (
                  <div className="flex flex-col gap-4">
                    <p>Matriz local de rigidez en coordenadas locales:</p>
                    <div className="overflow-x-auto relative">
                      <div className="min-w-min flex items-center">
                        <div className="mx-4 text-3xl">
                          <InlineMath math={`k_{${key}}`} />
                        </div>

                        {showLocal.withoutEa_localCoordinates && (
                          <>
                            <div className="mx-4 text-3xl  whitespace-nowrap">
                              <InlineMath math={`= E \\times A`} />
                            </div>
                            <TwoDimensionalArray
                              arr={value.withoutEa_localCoordinates}
                              name="L - L - sin EA"
                              caption="Matriz local de rigidez en coordenadas locales sin el factor
                          EA"
                            />
                          </>
                        )}

                        {showLocal.local_localCoordinates && (
                          <>
                            <div className="mx-4 text-3xl whitespace-nowrap">
                              <InlineMath math={`=`} />
                            </div>
                            <TwoDimensionalArray
                              arr={value.local_localCoordinates}
                              name="L - L - con EA"
                              caption="Matriz local de rigidez en coordenadas locales con el factor EA"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(showLocal.transform || showLocal.transformTransposed) && (
                  <div className="flex flex-col gap-4">
                    <p>
                      Matrices de transformación para pasar de coordenadas
                      locales a globales:
                    </p>
                    <div className="overflow-x-auto relative">
                      <div className="min-w-min flex items-center">
                        {showLocal.withoutEa_localCoordinates && (
                          <>
                            <div className="mx-4 text-3xl whitespace-nowrap">
                              <InlineMath
                                math={`
                          A
                          =
                          \\begin{bmatrix}
                          C_x & 0\\\\
                          C_y & 0\\\\
                          0 & C_x\\\\
                          0 & C_y
                          \\end{bmatrix}
                          =
                          `}
                              />
                            </div>
                            <TwoDimensionalArray
                              arr={value.transform}
                              name="A"
                              caption="Matriz de transformación"
                            />
                          </>
                        )}

                        {showLocal.transformTransposed && (
                          <>
                            <div className="mx-4 text-3xl whitespace-nowrap">
                              <InlineMath
                                math={`
                          A^T
                          =
                          \\begin{bmatrix}
                          C_x & C_y & 0 & 0\\\\
                          0 & 0 & C_x & C_y\\\\
                          \\end{bmatrix}
                          =
                          `}
                              />
                            </div>
                            <TwoDimensionalArray
                              arr={value.transformTransposed}
                              name="A^T"
                              caption="Matriz de transformación transpuesta"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(showLocal.withoutEa_globalCoordinates ||
                  showLocal.local_globalCoordinates) && (
                  <div className="flex flex-col gap-4">
                    <p>Matrices locales de rigidez en coordenadas globales:</p>
                    <div className="overflow-x-auto relative">
                      <div className="min-w-min flex items-center">
                        <div className="mx-4 text-3xl  whitespace-nowrap">
                          <InlineMath math={`kGlobal_{${key}}`} />
                        </div>

                        {showLocal.withoutEa_globalCoordinates && (
                          <>
                            <div className="mx-4 text-3xl whitespace-nowrap">
                              <InlineMath math={`= E \\times A`} />
                            </div>
                            <TwoDimensionalArray
                              arr={value.withoutEa_globalCoordinates}
                              name="L - L - sin EA"
                              caption="Matriz local de rigidez en coordenadas globales sin el factor
                          EA"
                            />
                          </>
                        )}

                        {showLocal.local_globalCoordinates && (
                          <>
                            <div className="mx-4 text-3xl">
                              <InlineMath math={`=`} />
                            </div>
                            <TwoDimensionalArrayForLocalsInGlobal
                              arr={value.local_globalCoordinates}
                              name="L - L - con EA"
                              caption="Matriz local de rigidez en coordenadas globales con el factor EA"
                              tableOfDof={value.tableDOF}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* <pre className="whitespace-pre-wrap">
              {JSON.stringify(value.tableDOF, null, 2)}
            </pre> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Locals
