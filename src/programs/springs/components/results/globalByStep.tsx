import { cn } from '@/lib/utils'
import { useState } from 'react'
import TwoDimensionalArray from './shared/twoDimensionalArray'

interface Props {
  kGlobalHistory: {
    label: string
    value: number[][]
  }[]
}

const GlobalByStep = ({ kGlobalHistory }: Props) => {
  const [current, setCurrent] = useState<number>(kGlobalHistory.length - 1)
  return (
    <div>
      {/* Stepper */}

      <div>
        <ol className="flex w-full items-center">
          {kGlobalHistory.map((e, index) => (
            <li
              key={index}
              className={cn(
                'flex w-full items-center transition after:border-secondary',
                {
                  "after:inline-block after:h-1 after:w-full after:border-4 after:border-b  after:content-[''] ":
                    index !== kGlobalHistory.length - 1,
                },
                {
                  'after:border-primary': index < current,
                }
              )}
              onClick={() => setCurrent(index)}
            >
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-foreground/25 text-secondary lg:h-12 lg:w-12',
                  { 'bg-primary': index === current },
                  {
                    'bg-secondary-foreground/75': index < current,
                  }
                )}
              >
                {e.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Matriz global de rigideces */}
      <div className="md:flex md:justify-center py-6">
        <TwoDimensionalArray
          arr={kGlobalHistory[current].value}
          name={kGlobalHistory[current].label}
          decimals={2}
        />
      </div>
    </div>
  )
}

export default GlobalByStep
