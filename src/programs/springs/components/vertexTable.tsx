import { useAtom } from 'jotai'
import { atomGetReactVertices } from '../store/vertices'
import {
  atomGetAreDofDefinedByUser,
  atomSetSwitchAreDofDefinedByUser,
} from '../store/areDofDefinedByUser'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const VertexTable = () => {
  const [vertices] = useAtom(atomGetReactVertices)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)

  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible md:max-w-min">
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
                    defaultValue={vertex.name}
                    className="w-32"
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={vertex.force}
                    className="w-32"
                  />
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={vertex.displacement}
                    className="w-32"
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox checked={vertex.isRestricted} />
                </TableCell>

                {areDofDefinedByUser && (
                  <TableCell className="text-left whitespace-nowrap">
                    <Input
                      type="text"
                      defaultValue={vertex.userDOF}
                      className="w-32"
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default VertexTable
