import { Input } from '@/components/ui/input'
import { ClickAwayListener } from '@mui/base'
import { evaluate } from 'mathjs'
import { useEffect, useRef, useState } from 'react'

interface EderInputProps {
  value: string
  onChange: (value: string) => void
}

const EderInputV2: React.FC<EderInputProps> = ({ value, onChange }) => {
  const [showValue, setShowValue] = useState<string>(value)
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
      onChange('Error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, showValue])

  return (
    <div>
      <ClickAwayListener onClickAway={() => setIsEditMode(false)}>
        {isEditMode ? (
          <input
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

export default EderInputV2
