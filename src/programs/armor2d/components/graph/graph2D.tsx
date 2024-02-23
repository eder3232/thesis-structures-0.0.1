'use client'

import { ElementRef, useRef } from 'react'

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

import { Line, OrthographicCamera } from '@react-three/drei'

interface IGraficoArmor2DProps {
  points: Array<[number, number, number]>
  lines: Array<Array<[number, number, number]>>
}

const Graph2D = ({ lines, points }: IGraficoArmor2DProps) => {
  return (
    <Canvas
      className="bg-green-100"
      // style={{ height: '500px', width: '500px' }}
    >
      <Content points={points} lines={lines} />
    </Canvas>
  )
}

const Content = ({ lines, points }: IGraficoArmor2DProps) => {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const camera = useRef<any>()

  const minX = Math.min(...points.map((p) => p[0]))
  const maxX = Math.max(...points.map((p) => p[0]))
  const minY = Math.min(...points.map((p) => p[1]))
  const maxY = Math.max(...points.map((p) => p[1]))

  // Calcula el centro y el tamaño del área que cubren los puntos
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const width = maxX - minX
  const height = maxY - minY

  const zoom =
    Math.min(size.width / (width * aspect), size.height / height) * 0.9

  useFrame(() => {
    if (camera.current) {
      // Ajusta la posición y el tamaño de la cámara
      camera.current.position.set(centerX, centerY, 1000)
      camera.current.zoom = zoom
      camera.current.updateProjectionMatrix()
    }
  })

  return (
    <>
      <OrthographicCamera
        ref={camera}
        zoom={1}
        // near={1}
        // far={2000}
        makeDefault
        position={[centerX, centerY, 10]}
      />
      <group>
        <ambientLight />
        {points.map((point, index) => (
          <mesh position={point} key={index}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
        ))}

        {lines.map((line, index) => (
          <Line color="black" lineWidth={1} points={line} key={index} />
        ))}
      </group>
    </>
  )
}

export default Graph2D
