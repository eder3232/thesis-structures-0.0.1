import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Props {
  internalForces: Map<
    string,
    {
      u_i: number
      u_j: number
      k: number
      internalForce: number
    }
  >
}

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

const InternalForces = ({ internalForces }: Props) => {
  const [selected, setSelected] = useState(decimalsArray[2])
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        Selecciona el número de decimales:
        <Select>
          <SelectTrigger className="w-auto">
            <SelectValue>{selected.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {decimalsArray.map((item) => (
              <SelectItem
                key={item.id}
                value={item.name}
                onSelect={() => setSelected(item)}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="my-4 flex flex-col gap-y-4">
        {Array.from(internalForces).map((e, index) => (
          <div key={index} className="flex flex-col gap-y-2">
            <p className="text-2xl">Elemento {e[0]}:</p>

            <p>Para calcular la deformación tenemos:</p>

            <div>
              <InlineMath
                math={`\\Delta_{${e[0]}} = ${e[1].u_j.toFixed(
                  selected.id
                )} - ${e[1].u_i.toFixed(selected.id)}`}
              />
            </div>
            <div>
              <InlineMath
                math={`\\Delta_{${e[0]}} = ${(e[1].u_j - e[1].u_i).toFixed(
                  selected.id
                )}`}
              />
            </div>

            <p>Para la fuerza interna tenemos:</p>

            <div>
              <InlineMath
                math={`F_{${e[0]}} = ${e[1].k.toFixed(selected.id)} \\cdot ${(
                  e[1].u_j - e[1].u_i
                ).toFixed(selected.id)}`}
              />
            </div>

            <div>
              <InlineMath
                math={`F_{${e[0]}} = ${e[1].internalForce.toFixed(
                  selected.id
                )}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InternalForces
