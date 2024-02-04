import { Checkbox } from '@/components/ui/checkbox'
import { useAtom } from 'jotai'
import {
  atomGetAreRestrictedOnTop,
  atomSetSwitchAreRestrictedOnTop,
} from '../store/areRestrictedsOnTop'

const AreRestrictedOnTop = () => {
  const [areRestrictedOnTop] = useAtom(atomGetAreRestrictedOnTop)

  const [, setSwitchAreRestrictedOnTop] = useAtom(
    atomSetSwitchAreRestrictedOnTop
  )

  return (
    <div className="flex items-center gap-4">
      <span>¿Los grados de libertad restringidos van arriba?</span>

      <Checkbox
        checked={areRestrictedOnTop}
        onCheckedChange={() => setSwitchAreRestrictedOnTop()}
      />
    </div>
  )
}

export default AreRestrictedOnTop
