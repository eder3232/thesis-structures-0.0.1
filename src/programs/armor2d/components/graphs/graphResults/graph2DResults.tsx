import { useAtom } from 'jotai'
import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { IBar, atomGetGraphResults } from '../../store/graphics/graphResults'
import { OrthographicCamera } from '@react-three/drei'

const Graph2DResults = () => {
  const [graph] = useAtom(atomGetGraphResults)

  if (graph.status !== 'ok') return null

  return (
    <div className="w-80 md:w-[500px] bg-primary/10 h-80 md:h-[500px]">
      <Canvas>
        <Content points={graph.points} lines={graph.lines} />
      </Canvas>
    </div>
  )
}

interface IGraficoArmor2DProps {
  points: Array<[number, number, number]>
  lines: IBar[]
}

const Content = ({ lines, points }: IGraficoArmor2DProps) => {
  return (
    <>
      <OrthographicCamera />

      {points.map((point, index) => (
        <Sphere key={index} position={point} args={[sphereSize]}>
          <meshBasicMaterial color="purple" />
        </Sphere>
      ))}
    </>
  )
}

export default Graph2DResults
