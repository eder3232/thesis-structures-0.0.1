import { useAtom } from 'jotai'
import {
  atomGetEdges,
  atomSetEdgesAddNewRow,
  atomSetEdgesDeleteRow,
  atomSetEdgesNumber,
  atomSetEdgesString,
} from '../../store/edges'
import { atomGetVertices } from '../../store/vertices'

import { MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import EderInput from '@/components/shared/utils/ederInput'
import { Input } from '@/components/ui/input'
import EdgesCombobox from './edgesCombobox'

const EdgesTable = () => {
  const [edges] = useAtom(atomGetEdges)
  const [vertices] = useAtom(atomGetVertices)

  const [, setEdgesString] = useAtom(atomSetEdgesString)
  const [, setEdgesNumber] = useAtom(atomSetEdgesNumber)

  const [, setEdgesAddNewRow] = useAtom(atomSetEdgesAddNewRow)
  const [, setEdgesDeleteRow] = useAtom(atomSetEdgesDeleteRow)

  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible md:max-w-min ">
      <div className="p-4 bg-muted rounded-lg">
        <Table className="border">
          <TableHeader>
            <TableRow className="[&>*]:text-center [&>*]:py-1 [&>.eder-head-text]:font-bold">
              <TableHead className="text-primary px-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setEdgesAddNewRow(-1)}
                >
                  <PlusCircle className="m-auto" />
                </Button>
              </TableHead>

              <TableHead className="px-0">
                <Button
                  size="icon"
                  variant="outline"
                  disabled
                  className="disabled:text-muted-foreground"
                >
                  <MinusCircle className="m-auto" />
                </Button>
              </TableHead>

              <TableHead className="eder-head-text">Nombre</TableHead>

              <TableHead className="eder-head-text whitespace-nowrap">
                Viene de
              </TableHead>

              <TableHead className="eder-head-text whitespace-nowrap">
                Va hacia
              </TableHead>

              <TableHead className="eder-head-text">Elasticidad</TableHead>
              <TableHead className="eder-head-text">Area</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {edges.map((edge, index) => (
              <TableRow
                key={edge.id}
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
                    onClick={() => setEdgesAddNewRow(index)}
                  >
                    <PlusCircle className="m-auto" />
                  </Button>
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-primary"
                    onClick={() => setEdgesDeleteRow(index)}
                  >
                    <MinusCircle className="m-auto" />
                  </Button>
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={edge.name}
                    className="w-32"
                    onBlur={(e) =>
                      setEdgesString({
                        field: 'name',
                        value: e.target.value,
                        index,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <EdgesCombobox
                    value={edge}
                    collection={vertices}
                    field="from"
                    index={index}
                  />
                </TableCell>
                <TableCell>
                  <EdgesCombobox
                    value={edge}
                    collection={vertices}
                    field="to"
                    index={index}
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={edge.elasticity}
                    onChange={(e) =>
                      setEdgesNumber({
                        field: 'elasticity',
                        value: e,
                        index,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <EderInput
                    value={edge.area}
                    onChange={(e) =>
                      setEdgesNumber({
                        field: 'area',
                        value: e,
                        index,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EdgesTable
