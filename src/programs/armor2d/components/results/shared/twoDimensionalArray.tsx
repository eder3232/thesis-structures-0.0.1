import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const decimalsArray = [
  { id: 0, name: '0' },
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
]

interface Props {
  arr: (number | string)[][]
  name: string | React.ReactNode
  caption?: string
  decimals?: number
}

const TwoDimensionalArray = ({ arr, name, caption, decimals = 2 }: Props) => {
  const index = decimalsArray.findIndex((e) => e.id === decimals)
  const [selected, setSelected] = useState(decimalsArray[index])

  if (arr.length === 0) return <></>
  if (arr[0].length === 0) return <></>
  return (
    <div className="bg-muted rounded-lg p-2">
      <Table className="w-auto table-auto overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead
              colSpan={arr[0].length + 1}
              className="text-center text-xl font-bold"
            >
              {name}
            </TableHead>
          </TableRow>

          <TableRow>
            <TableHead className="p-1">
              <div className="w-full h-full">
                <Select
                  value={selected.name}
                  onValueChange={(e) =>
                    setSelected(
                      decimalsArray.find((d) => d.name === e) || selected
                    )
                  }
                >
                  <SelectTrigger className="w-full h-full bg-primary text-primary-foreground">
                    <SelectValue placeholder="0.00" />
                  </SelectTrigger>
                  <SelectContent>
                    {decimalsArray.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TableHead>

            {arr[0].map((_, index) => (
              <TableHead
                key={index}
                className="font-bold text-base bg-muted-foreground/10 text-center text-muted-foreground/90"
              >
                {index + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {arr.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold text-base bg-muted-foreground/10 text-center text-muted-foreground/90">
                {index + 1}
              </TableCell>
              {row.map((cell, index) => (
                <TableCell
                  key={index}
                  className="border text-right whitespace-nowrap"
                >
                  {typeof cell === 'number' ? cell.toFixed(selected.id) : cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {caption && <TableCaption>{caption}</TableCaption>}

        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={arr[0].length + 1}>Total</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

export default TwoDimensionalArray
