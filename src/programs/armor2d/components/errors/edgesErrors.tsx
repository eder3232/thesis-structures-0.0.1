import { useAtom } from 'jotai'
import { atomGetEdgesErrors } from '../../store/errors/edgesErrors'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const EdgesErrors = () => {
  const [edgesErrors] = useAtom(atomGetEdgesErrors)

  return (
    <div className="flex flex-col gap-2">
      {edgesErrors.map((error, index) => (
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

export default EdgesErrors
