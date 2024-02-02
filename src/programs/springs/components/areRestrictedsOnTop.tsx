import { Checkbox } from '@/components/ui/checkbox'

const AreRestrictedOnTop = () => {
  return (
    <div className="flex items-center gap-4">
      <span>¿Los grados de libertad restringidos van arriba?</span>

      <Checkbox />
    </div>
  )
}

export default AreRestrictedOnTop
