import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ClickAwayListener } from '@mui/base'
import { evaluate } from 'mathjs'
import { useEffect, useRef, useState } from 'react'

interface EderInputProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const EderInputV3: React.FC<EderInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [showValue, setShowValue] = useState<string>(value.toString() || '0')
  const [evaluatedValue, setEvaluatedValue] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   setShowValue(value.toString() || '0')
  //   try {
  //     setEvaluatedValue(evaluate(showValue))
  //   } catch {
  //     setEvaluatedValue('Error')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value])

  console.log({
    showValue,
    value,
    evaluatedValue,
  })

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
  }, [isEditMode, value])

  return (
    <div className="w-32">
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
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              {
                'cursor-not-allowed opacity-50': disabled,
              }
            )}
            onClick={(e) => {
              if (disabled) return
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

export default EderInputV3
