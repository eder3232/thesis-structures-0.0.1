import { useAtom } from 'jotai'
import { atomGetVerticesErrors } from '../../store/errors/verticesErrors'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const VerticesErrors = () => {
  const [verticesErrors] = useAtom(atomGetVerticesErrors)
  return (
    <div className="flex flex-col gap-2">
      {verticesErrors.map((error, index) => (
        <Alert
          key={index}
          variant={error.severity}
          className="w-80 md:w-[600px]"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export default VerticesErrors
