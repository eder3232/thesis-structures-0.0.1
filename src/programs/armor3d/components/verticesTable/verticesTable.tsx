import { useAtom } from 'jotai'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { MinusCircle, PlusCircle } from 'lucide-react'

import {
  atomGetVertices,
  atomSetVerticesAddNewRow,
  atomSetVerticesBoolean,
  atomSetVerticesDeleteRow,
  atomSetVerticesNumber,
  atomSetVerticesString,
  atomSetVerticesSwitchRestricted,
} from '../../store/vertices'
import { atomGetAreDofDefinedByUser } from '../../store/areDofDefinedByUser'
import EderInput from '@/components/shared/utils/ederInput'

const VerticesTable = () => {
  const [vertices] = useAtom(atomGetVertices)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)

  const [, setVerticesString] = useAtom(atomSetVerticesString)
  const [, setVerticesNumber] = useAtom(atomSetVerticesNumber)
  // const [, setVerticesBoolean] = useAtom(atomSetVerticesBoolean)
  const [, setVerticesSwitchRestricted] = useAtom(
    atomSetVerticesSwitchRestricted
  )
  const [, setVerticesAddNewRow] = useAtom(atomSetVerticesAddNewRow)
  const [, setVerticesDeleteRow] = useAtom(atomSetVerticesDeleteRow)

  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible md:max-w-min">
      <div className="p-4 bg-muted rounded-lg">
        <Table className="border">
          <TableHeader>
            <TableRow className="[&>*]:text-center [&>*]:py-1 [&>.eder-head-text]:font-bold">
              <TableHead />
              <TableHead />
              <TableHead className="eder-head-text" rowSpan={2}>
                Nombre
              </TableHead>
              <TableHead className="eder-head-text" colSpan={3}>
                Coordenadas
              </TableHead>
              <TableHead className="eder-head-text" colSpan={3}>
                Fuerzas
              </TableHead>
              <TableHead className="eder-head-text" colSpan={3}>
                Desplazamientos
              </TableHead>
              <TableHead className="eder-head-text" colSpan={3}>
                Restringido
              </TableHead>
              <TableHead className="eder-head-text" rowSpan={2}>
                Condiciones especiales
              </TableHead>
              {areDofDefinedByUser && (
                <TableHead className="eder-head-text" colSpan={3}>
                  Grados de libertad
                </TableHead>
              )}
            </TableRow>

            <TableRow className="[&>*]:text-center [&>*]:py-1 [&>.eder-head-text]:font-bold">
              <TableHead className="text-primary px-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setVerticesAddNewRow({ index: -1 })}
                >
                  <PlusCircle className="m-auto" />
                </Button>
              </TableHead>

              <TableHead className="px-0">
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:text-muted-foreground"
                  disabled
                >
                  <MinusCircle className="m-auto" />
                </Button>
              </TableHead>

              {/* Coordenadas */}
              <TableHead className="eder-head-text">x</TableHead>
              <TableHead className="eder-head-text">y</TableHead>
              <TableHead className="eder-head-text">z</TableHead>
              {/* Fuerza */}
              <TableHead className="eder-head-text">x</TableHead>
              <TableHead className="eder-head-text">y</TableHead>
              <TableHead className="eder-head-text">z</TableHead>
              {/* Desplazamiento */}
              <TableHead className="eder-head-text">x</TableHead>
              <TableHead className="eder-head-text">y</TableHead>
              <TableHead className="eder-head-text">z</TableHead>
              {/* Restringido */}
              <TableHead className="eder-head-text">x</TableHead>
              <TableHead className="eder-head-text">y</TableHead>
              <TableHead className="eder-head-text">z</TableHead>

              {areDofDefinedByUser && (
                <>
                  <TableHead className="eder-head-text">x</TableHead>
                  <TableHead className="eder-head-text">y</TableHead>
                  <TableHead className="eder-head-text">z</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {vertices.map((vertex, index) => (
              <TableRow
                key={vertex.id}
                className={cn(
                  '[&>*]:py-1 [&>*]:px-1',
                  '[&>.eder-result]:text-right'
                )}
              >
                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-primary"
                    onClick={() => setVerticesAddNewRow({ index })}
                  >
                    <PlusCircle className="m-auto" />
                  </Button>
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-primary"
                  >
                    <MinusCircle
                      className="m-auto"
                      onClick={() => setVerticesDeleteRow({ index })}
                    />
                  </Button>
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={vertex.name}
                    className="w-32"
                    onBlur={(e) =>
                      setVerticesString({
                        field: 'name',
                        value: e.target.value,
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.coordinateX}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'coordinateX',
                        value,
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.coordinateY}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'coordinateY',
                        value,
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.coordinateZ}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'coordinateZ',
                        value,
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.forceX}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'forceX',
                        value,
                        index,
                      })
                    }
                    disabled={vertex.isRestrainedX}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.forceY}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'forceY',
                        value,
                        index,
                      })
                    }
                    disabled={vertex.isRestrainedY}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.forceZ}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'forceZ',
                        value,
                        index,
                      })
                    }
                    disabled={vertex.isRestrainedZ}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.displacementX}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'displacementX',
                        value,
                        index,
                      })
                    }
                    disabled={!vertex.isRestrainedX}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.displacementY}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'displacementY',
                        value,
                        index,
                      })
                    }
                    disabled={!vertex.isRestrainedY}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={vertex.displacementZ}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'displacementZ',
                        value,
                        index,
                      })
                    }
                    disabled={!vertex.isRestrainedZ}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={vertex.isRestrainedX}
                    onCheckedChange={() =>
                      setVerticesSwitchRestricted({
                        axis: 'x',
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={vertex.isRestrainedY}
                    onCheckedChange={() =>
                      setVerticesSwitchRestricted({
                        axis: 'y',
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={vertex.isRestrainedZ}
                    onCheckedChange={() =>
                      setVerticesSwitchRestricted({
                        axis: 'z',
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-center">Implementar!</TableCell>

                {areDofDefinedByUser && (
                  <>
                    <TableCell className="text-left whitespace-nowrap">
                      <EderInput
                        value={vertex.userDOFX}
                        onChange={(value) =>
                          setVerticesNumber({
                            field: 'userDOFX',
                            value,
                            index,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-left whitespace-nowrap">
                      <EderInput
                        value={vertex.userDOFY}
                        onChange={(value) =>
                          setVerticesNumber({
                            field: 'userDOFY',
                            value,
                            index,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-left whitespace-nowrap">
                      <EderInput
                        value={vertex.userDOFZ}
                        onChange={(value) =>
                          setVerticesNumber({
                            field: 'userDOFZ',
                            value,
                            index,
                          })
                        }
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default VerticesTable
