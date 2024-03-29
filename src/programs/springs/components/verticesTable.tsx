import { useAtom } from 'jotai'
import { atomGetAreDofDefinedByUser } from '../store/areDofDefinedByUser'
import {
  atomGetVertices,
  atomSetVerticesAddNewRow,
  atomSetVerticesSwitchRestricted,
  atomSetVerticesDeleteRow,
  atomSetVerticesNumber,
  atomSetVerticesString,
} from '../store/vertices'

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
import EderInput from '@/components/shared/utils/ederInput'

const VerticesTable = () => {
  const [vertices] = useAtom(atomGetVertices)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)
  const [, setVerticesString] = useAtom(atomSetVerticesString)
  const [, setVerticesNumber] = useAtom(atomSetVerticesNumber)
  const [, setVerticesBoolean] = useAtom(atomSetVerticesSwitchRestricted)
  const [, setVerticesAddNewRow] = useAtom(atomSetVerticesAddNewRow)
  const [, setVerticesDeleteRow] = useAtom(atomSetVerticesDeleteRow)

  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible md:max-w-min">
      <div className="p-4 bg-muted rounded-lg">
        <Table className="border">
          <TableHeader>
            <TableRow className="[&>*]:text-center [&>*]:py-1 [&>.eder-head-text]:font-bold">
              <TableHead className="text-primary px-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setVerticesAddNewRow(-1)}
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

              <TableHead className="eder-head-text">Nombre</TableHead>

              <TableHead className="eder-head-text">Fuerza</TableHead>

              <TableHead className="eder-head-text">Desplazamiento</TableHead>

              <TableHead className="eder-head-text">Restringido</TableHead>

              {areDofDefinedByUser && (
                <TableHead className="eder-head-text whitespace-nowrap">
                  Grado de libertad
                </TableHead>
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
                    onClick={() => setVerticesAddNewRow(index)}
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
                      onClick={() => setVerticesDeleteRow(index)}
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
                  {/* <Input
                    type="text"
                    value={vertex.force}
                    className="w-32"
                    // onBlur={(e) =>
                    //   setVerticesNumber({
                    //     field: 'force',
                    //     value: e.target.valueAsNumber,
                    //     index,
                    //   })
                    // }
                    onChange={(e) => {
                      if (/^-?\d*\.?\d*$/.test(e.target.value)) {
                        setVerticesNumber({
                          field: 'force',
                          value: e.target.valueAsNumber,
                          index,
                        })
                      }
                    }}
                    disabled={vertex.isRestricted}
                  /> */}
                  <EderInput
                    value={vertex.force}
                    onChange={(value) =>
                      setVerticesNumber({ field: 'force', value, index })
                    }
                    disabled={vertex.isRestricted}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  {/* <Input
                    type="number"
                    defaultValue={vertex.displacement}
                    className="w-32"
                    onBlur={(e) =>
                      setVerticesNumber({
                        field: 'displacement',
                        value: e.target.valueAsNumber,
                        index,
                      })
                    }
                    disabled={!vertex.isRestricted}
                  /> */}
                  {/* <Input
                    type="text"
                    value={vertex.displacement}
                    className="w-32"
                    // onBlur={(e) =>
                    //   setVerticesNumber({
                    //     field: 'force',
                    //     value: e.target.valueAsNumber,
                    //     index,
                    //   })
                    // }
                    onChange={(e) => {
                      if (/^-?\d*\.?\d*$/.test(e.target.value)) {
                        setVerticesNumber({
                          field: 'displacement',
                          value: e.target.valueAsNumber,
                          index,
                        })
                      }
                    }}
                    disabled={!vertex.isRestricted}
                    step="any"
                  /> */}
                  <EderInput
                    value={vertex.displacement}
                    onChange={(value) =>
                      setVerticesNumber({ field: 'displacement', value, index })
                    }
                    disabled={!vertex.isRestricted}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={vertex.isRestricted}
                    onCheckedChange={() =>
                      setVerticesBoolean({
                        value: !vertex.isRestricted,
                        index,
                      })
                    }
                  />
                </TableCell>

                {areDofDefinedByUser && (
                  <TableCell className="text-left whitespace-nowrap">
                    <Input
                      type="text"
                      defaultValue={vertex.userDOF}
                      className="w-32"
                      onBlur={(e) =>
                        setVerticesNumber({
                          field: 'userDOF',
                          value: e.target.valueAsNumber,
                          index,
                        })
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <pre>
          {JSON.stringify(
            {
              vertices,
            },
            null,
            2
          )}
        </pre> */}
      </div>
    </div>
  )
}

export default VerticesTable
