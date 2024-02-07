import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import { TableBody, TableCell, TableRow, Table } from '@/components/ui/table'

const SpecialConditions = () => {
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

          <Table className="table-auto">
            <TableBody>
              <TableRow>
                <TableCell>X</TableCell>
                <TableCell>
                  <Input type="number" />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Y</TableCell>
                <TableCell>
                  <Input type="number" />
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
