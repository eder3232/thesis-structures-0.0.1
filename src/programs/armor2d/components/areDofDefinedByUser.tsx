import { Checkbox } from '@/components/ui/checkbox'
import {
  atomGetAreDofDefinedByUser,
  atomSetSwitchAreDofDefinedByUser,
} from '../store/areDofDefinedByUser'
import { useAtom } from 'jotai'

const AreDofDefinedByUser = () => {
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)

  const [, setSwitchAreDofDefinedByUser] = useAtom(
    atomSetSwitchAreDofDefinedByUser
  )
  return (
    <div className="flex items-center gap-4">
      <span>¿Desea ingresar los grados de libertad?</span>
      <Checkbox
        checked={areDofDefinedByUser}
        onCheckedChange={() => setSwitchAreDofDefinedByUser()}
      />
    </div>
  )
}

export default AreDofDefinedByUser
