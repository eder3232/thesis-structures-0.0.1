import { useAtom } from 'jotai'
import { atomGetReactVertices } from '../../store/vertices'
import { useState } from 'react'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { PopoverContent } from '@radix-ui/react-popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { atomSetReactEdgesCombobox } from '../../store/edges'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

interface Props {
  collection: { id: string; name: string }[]
  value: { id: string; name: string; from: string; to: string }
  field: 'from' | 'to'
  index: number
}

const EdgesCombobox = ({ value, collection, field, index }: Props) => {
  const [open, setOpen] = useState(false)
  // const [value, setValue] = useState('')
  // const [vertices] = useAtom(atomGetReactVertices)
  const [, setReactEdgesCombobox] = useAtom(atomSetReactEdgesCombobox)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-36 justify-between"
        >
          {/* {value
            ? collection.find((framework) => framework.name === value.name)
                ?.name
            : 'Nudo...'} */}
          {value[field]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 p-0 z-10">
        <Command className="border">
          <CommandInput placeholder="Nudo..." />
          <CommandEmpty className="break-words p-4">
            Nudo no encontrado.
          </CommandEmpty>

          <CommandGroup>
            {collection.map((framework) => (
              <CommandItem
                key={framework.id}
                value={framework.name}
                onSelect={(currentValue) => {
                  // setValue(currentValue === value ? '' : currentValue)
                  setReactEdgesCombobox({ field, index, value: currentValue })

                  setOpen(false)
                }}
              >
                {framework.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default EdgesCombobox
