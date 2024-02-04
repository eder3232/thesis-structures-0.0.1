import { ILocalArrays } from '../../logic/spring'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Props {
  locals: Map<string, ILocalArrays>
}
const Locals = ({ locals }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4">
      {Array.from(locals).map((e, index) => (
        <div key={index}>
          <p className="text-2xl">Elemento {e[0]}:</p>
          <div className="bg-muted rounded-lg p-2">
            <Table className="border">
              <TableHeader>
                <TableRow className="text-center text-xl font-bold text-primary">
                  <TableCell colSpan={(e[1].local.length || 0) + 1}>
                    {e[0]}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead>GDL</TableHead>

                  {e[1].tableDOF.map((e, index) => (
                    <TableHead
                      key={index}
                      className="font-bold text-base bg-muted-foreground/10 text-center text-muted-foreground/90"
                    >
                      {e + 1}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {e[1].local.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold text-base  bg-muted-foreground/10 text-center text-muted-foreground/90">
                      {e[1].tableDOF[index] + 1}
                    </TableCell>

                    {row.map((col, index) => (
                      <TableCell key={index} className="text-center border">
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Locals
