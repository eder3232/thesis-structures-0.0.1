import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

const DofDefinedByUser = () => {
  return (
    <div className="flex items-center gap-4">
      <span>¿Desea ingresar los grados de libertad?</span>
      <Checkbox />
    </div>
  )
}

export default DofDefinedByUser
