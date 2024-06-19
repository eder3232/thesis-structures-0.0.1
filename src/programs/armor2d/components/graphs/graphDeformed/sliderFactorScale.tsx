import { Slider } from '@/components/ui/slider'
import {
  atomGetFactorScale,
  atomSetFactorScale,
} from '@/programs/armor2d/store/graphics/graphDeformed'
import { useAtom } from 'jotai'

const SliderFactorScale = () => {
  const [factorScale] = useAtom(atomGetFactorScale)
  const [, setFactorScale] = useAtom(atomSetFactorScale)

  return (
    <div className="flex flex-col gap-2">
      <span>Factor de escala: {factorScale}</span>
      <Slider
        value={[factorScale]}
        onValueChange={(value) => setFactorScale(value[0])}
        min={0}
        max={500}
        step={50}
        className={'w-64'}
      />
    </div>
  )
}

export default SliderFactorScale
