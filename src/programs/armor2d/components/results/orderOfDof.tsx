import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { IOrderDOF } from '../../logic/Armor2D'

interface Props {
  orderOfDof: IOrderDOF[]
}
const OrderOfDof = ({ orderOfDof }: Props) => {
  return (
    <div className="max-w-min overflow-x-auto">
      <div className="p-2 bg-muted rounded-lg">
        <Table className="table-auto">
          <TableCaption>Orden de los grados de libertad</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Grado de libertad</TableCell>
              <TableCell>Restringido</TableCell>
              <TableCell>Interno</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_td]:whitespace-nowrap">
            {orderOfDof.map((dof, key) => (
              <TableRow key={key}>
                <TableCell>{dof.name}</TableCell>
                <TableCell className="text-center">
                  {dof.isRestricted ? 'Si' : 'No'}
                </TableCell>
                <TableCell className="text-center">
                  {dof.dof_internal}
                </TableCell>
                <TableCell className="text-center">{dof.dof_user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OrderOfDof
