import { Input } from '@/components/ui/input'
import { ClickAwayListener } from '@mui/base'
import { evaluate } from 'mathjs'
import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
}

const EderInputV1 = () => {
  //Cambiar
  const [value, setValue] = useState<string>('')
  const [evaluatedValue, setEvaluatedValue] = useState<string>('')

  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      evaluate(value)
      setEvaluatedValue(evaluate(value))
    } catch {
      setEvaluatedValue('Error')
    }
  }, [isEditMode, value])

  return (
    <div className="bg-red-500">
      <ClickAwayListener onClickAway={() => setIsEditMode(false)}>
        {isEditMode ? (
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditMode(false)
                setValue(inputRef.current?.value || '')
              }
            }}
          />
        ) : (
          <div
            className="w-32 h-8 bg-blue-500"
            onClick={(e) => {
              e.stopPropagation()
              setIsEditMode(true)
              setTimeout(() => {
                inputRef.current?.focus()
              }, 0)
            }}
          >
            {evaluatedValue}
          </div>
        )}
      </ClickAwayListener>
    </div>
  )
}

export default EderInputV1
