import { Button } from '@/components/ui/button'
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
import { useAtom } from 'jotai'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { atomGetEdges } from '../../store/edges'
import { atomGetVertices } from '../../store/vertices'
import EdgesCombobox from './edgesCombobox'

const EdgesTable = () => {
  const [edges] = useAtom(atomGetEdges)
  const [vertices] = useAtom(atomGetVertices)

  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible md:max-w-min ">
      <div className="p-4 bg-muted rounded-lg">
        <Table className="border">
          <TableHeader>
            <TableRow className="[&>*]:text-center [&>*]:py-1 [&>.eder-head-text]:font-bold">
              <TableHead className="text-primary px-0">
                <Button size="icon" variant="outline">
                  <PlusCircle className="m-auto" />
                </Button>
              </TableHead>

              <TableHead className="text-primary px-0">
                <Button size="icon" variant="outline">
                  <MinusCircle className="m-autp" />
                </Button>
              </TableHead>

              <TableHead className="eder-head-text">Nombre</TableHead>

              <TableHead className="eder-head-text whitespace-nowrap">
                Viene de
              </TableHead>

              <TableHead className="eder-head-text whitespace-nowrap">
                Va hacia
              </TableHead>

              <TableHead className="eder-head-text">K</TableHead>
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
                    <MinusCircle className="m-auto" />
                  </Button>
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={edge.name}
                    className="w-32"
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
                  <Input type="text" defaultValue={edge.k} className="w-32" />
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
