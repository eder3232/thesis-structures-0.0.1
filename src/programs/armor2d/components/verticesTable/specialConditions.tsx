import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
} from '@/components/ui/table'

import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAtom } from 'jotai'
import {
  atomGetVertices,
  atomSetVerticesNumber,
  atomSetVerticesSwitchRestricted,
} from '../../store/vertices'
import EderInput from '@/components/shared/utils/ederInput'

interface Props {
  index: number
  valueX: boolean
  valueZ: boolean
}

const SpecialConditions = ({ index, valueX, valueZ }: Props) => {
  const [vertices] = useAtom(atomGetVertices)
  const [, setVerticesSwitchRestricted] = useAtom(
    atomSetVerticesSwitchRestricted
  )
  const [, setVerticesNumber] = useAtom(atomSetVerticesNumber)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Condiciones especiales</DialogTitle>
          <DialogDescription>
            Agrega aquí las condiciones especiales que se aplicarán a este nudo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Resortes:</div>

          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Ojo!</AlertTitle>
            <AlertDescription>
              Solo se puede asignar un resorte a un grado de libertad{' '}
              <strong>no restringido</strong> (Debido a que se desea calcular el
              desplazamiento en ese nudo).
              <br />
              Si restringes un grado de libertad, este hara que la fuerza en ese
              grado de libertad sea cero, o si restringes un grado de libertad
              en un nudo, este hara que el desplazamiento en ese grado de
              libertad sea cero.
            </AlertDescription>
          </Alert>

          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableCell>Restringido</TableCell>
                <TableCell>Eje</TableCell>
                <TableCell>Valor K</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  <Checkbox
                    checked={valueX}
                    onCheckedChange={() =>
                      // setVerticesBoolean({
                      //   field: 'isRestrictedX',
                      //   value: !vertex.isRestrictedX,
                      //   index,
                      // })
                      setVerticesSwitchRestricted({
                        axis: 'x',
                        index,
                      })
                    }
                  />
                </TableCell>
                <TableCell className="text-center">X</TableCell>
                <TableCell>
                  <EderInput
                    value={vertices[index].forceX}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'forceX',
                        value,
                        index,
                      })
                    }
                    disabled={vertices[index].isRestrictedX}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-center">
                  <Checkbox
                    checked={valueZ}
                    onCheckedChange={() =>
                      // setVerticesBoolean({
                      //   field: 'isRestrictedX',
                      //   value: !vertex.isRestrictedX,
                      //   index,
                      // })
                      setVerticesSwitchRestricted({
                        axis: 'z',
                        index,
                      })
                    }
                  />
                </TableCell>
                <TableCell className="text-center">Z</TableCell>
                <TableCell>
                  {/* <Input type="number" /> */}
                  <EderInput
                    value={vertices[index].forceZ}
                    onChange={(value) =>
                      setVerticesNumber({
                        field: 'forceZ',
                        value,
                        index,
                      })
                    }
                    disabled={vertices[index].isRestrictedZ}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SpecialConditions
