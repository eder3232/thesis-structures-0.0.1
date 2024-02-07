import { Input } from '@/components/ui/input'
import { ClickAwayListener } from '@mui/base'
import { evaluate } from 'mathjs'
import { useEffect, useRef, useState } from 'react'

interface EderInputProps {
  value: number
  onChange: (value: number) => void
}

const EderInput: React.FC<EderInputProps> = ({ value, onChange }) => {
  const [showValue, setShowValue] = useState<string>(value.toString() || '0')
  const [evaluatedValue, setEvaluatedValue] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const evaluatedValue = evaluate(showValue)
      console.log(evaluatedValue)
      setEvaluatedValue(evaluate(showValue))
      onChange(evaluatedValue)
    } catch {
      setEvaluatedValue('Error')
      onChange(NaN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  return (
    <div>
      <ClickAwayListener onClickAway={() => setIsEditMode(false)}>
        {isEditMode ? (
          <Input
            ref={inputRef}
            value={showValue}
            onChange={(e) => setShowValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditMode(false)
                setShowValue(inputRef.current?.value || '')
              }
            }}
          />
        ) : (
          <div
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

export default EderInput
