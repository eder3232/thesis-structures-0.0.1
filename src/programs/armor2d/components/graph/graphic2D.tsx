import {
  Cylinder,
  Line,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere,
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import {
  IForce,
  IReaction,
  atomGetGraph,
} from '../../store/graphics/graphEsquema'
import Arrow from './arrow'
import RollerSuport from './rollerSuport'
import ArticulatedSuport from './articulatedSuport'

const Graphic2D = () => {
  const [graph] = useAtom(atomGetGraph)

  if (graph.status !== 'ok') return null

  // console.log(graph)
  return (
    <div className="w-80 md:w-[500px] bg-primary/10 h-80 md:h-[500px]">
      <Canvas>
        <Content
          points={graph.points}
          lines={graph.lines}
          forces={graph.forces}
          reactions={graph.reactions}
        />
      </Canvas>
    </div>
  )
}

interface IGraficoArmor2DProps {
  points: Array<[number, number, number]>
  lines: Array<Array<[number, number, number]>>
  forces: IForce[]
  reactions: IReaction[]
}

const Content = ({
  lines,
  points,
  forces,
  reactions,
}: IGraficoArmor2DProps) => {
  const { size, viewport } = useThree()
  const aspect = size.width / size.height
  // const aspect = size.width / viewport.width
  const camera = useRef<any>()

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

  // useFrame(() => {
  //   if (camera.current) {
  //     // Ajusta la posición y el tamaño de la cámara
  //     camera.current.position.set(centerX, centerY, 1000)
  //     camera.current.lookAt(centerX, centerY, 0)
  //     camera.current.zoom = zoom
  //     camera.current.updateProjectionMatrix()
  //     console.log('raa')
  //   }
  // })

  // console.log(reactions)

  return (
    <>
      {/* <OrthographicCamera
        ref={camera}
        makeDefault
        position={[centerX, centerY, 100]}
      /> */}

      <OrthographicCamera
        // args={[0, 10, 10, 0, 1, 1000]}
        position={[centerX, centerY, 1000]}
        zoom={zoom}
        makeDefault
        far={1000}
        near={1}
        // ref={camera}
      />
      {/* 
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[centerX, centerY, 20]}
        zoom={1}
      /> */}

      {/* <axesHelper args={[3]} /> */}
      {/* <OrbitControls /> */}

      <group>
        {lines.map((line, index) => (
          <Line
            key={index}
            points={line}
            color="black"
            lineWidth={2}
            dashed={false}
          />
        ))}

        {points.map((point, index) => (
          <Sphere key={index} position={point} args={[sphereSize]}>
            <meshBasicMaterial color="purple" />
          </Sphere>
        ))}

        {forces.map((force, index) => (
          <Arrow
            key={index}
            applicationPoint={force.applicationPoint}
            directorCosines={force.directorCosines}
            arrowSize={1}
            sphereSize={sphereSize}
            forceValue={force.forceValue}
          />
        ))}

        {reactions.map((reaction, index) => (
          <>
            {reaction.reactionType === 'rollerSuport' && (
              <RollerSuport
                key={index}
                applicationPoint={reaction.applicationPoint}
                directorCosines={reaction.directorCosines}
                sphereSize={sphereSize}
                size={0.4}
              />
            )}
            {reaction.reactionType === 'articulatedSuport' && (
              <ArticulatedSuport
                key={index}
                applicationPoint={reaction.applicationPoint}
                directorCosines={reaction.directorCosines}
                sphereSize={sphereSize}
                size={0.4}
              />
            )}
          </>
        ))}

        {/* <RollerSuport
          applicationPoint={[3, 0, 0]}
          directorCosines={[0, 0, 180]}
          sphereSize={sphereSize}
          size={0.4}
        /> */}

        {/* <ArticulatedSuport
          applicationPoint={[0, 0, 0]}
          directorCosines={[0, 0, 180]}
          sphereSize={sphereSize}
          size={0.4}
        /> */}
      </group>
    </>
  )
}

export default Graphic2D
