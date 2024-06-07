import {
  Cylinder,
  Line,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere,
  Text3D,
  useFont,
} from '@react-three/drei'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  IBar,
  IReactionForGraphic,
  atomGetGraphResults,
} from '../../../store/graphics/graphResults'
import Lines from './lines'
import Reactions from './reactions'

const Graph2DResults = () => {
  const [graph] = useAtom(atomGetGraphResults)

  if (graph.status !== 'ok') return null

  return (
    <div className="w-80 md:w-[500px] bg-primary/10 h-80 md:h-[500px]">
      <Canvas>
        <Content
          points={graph.points}
          lines={graph.lines}
          reactions={graph.reactions}
        />
      </Canvas>
    </div>
  )
}

interface IGraficoArmor2DProps {
  points: Array<[number, number, number]>
  lines: IBar[]
  reactions: IReactionForGraphic[]
}

const Content = ({ lines, points, reactions }: IGraficoArmor2DProps) => {
  const { size, viewport } = useThree()
  const font2 = useFont('/font/Anta_Regular.json')
  const aspect = size.width / size.height

  const minX = Math.min(...points.map((p) => p[0]))
  const maxX = Math.max(...points.map((p) => p[0]))
  const minY = Math.min(...points.map((p) => p[1]))
  const maxY = Math.max(...points.map((p) => p[1]))

  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const width = maxX - minX
  const height = maxY - minY

  const maxReferencialValue = Math.max(width, height)

  const zoom =
    Math.min(size.width / (width * aspect), size.height / height) * 0.6

  const sphereSize = maxReferencialValue / 50

  return (
    <>
      <OrthographicCamera
        position={[centerX, centerY, 1000]}
        zoom={zoom}
        makeDefault
        far={1000}
        near={1}
      />

      <group>
        {points.map((point, index) => (
          <Sphere key={index} position={point} args={[sphereSize]}>
            <meshBasicMaterial color="purple" />
          </Sphere>
        ))}

        <Lines lines={lines} />

        <Reactions reactions={reactions} sphereSize={sphereSize} />
      </group>
    </>
  )
}

export default Graph2DResults
