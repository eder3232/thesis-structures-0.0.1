import { Box, Cone } from '@react-three/drei'
import React from 'react'

interface Props {
  applicationPoint: [number, number, number]
  directorCosines: [number, number, number]
  sphereSize: number
  size: number
}

const ArticulatedSuport = ({ size, sphereSize, applicationPoint }: Props) => {
  const coneWidth = size
  const coneHeight = size
  const boxWidth = size
  const boxHeight = size / 2.5
  const boxDepth = size
  return (
    <group
      position={[applicationPoint[0], applicationPoint[1], applicationPoint[2]]}
    >
      <Cone
        args={[0.2 * Math.sqrt(2), coneHeight, 4, 1]}
        position={[0, -coneHeight / 2 - sphereSize, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshBasicMaterial color="gray" />
      </Cone>

      <Box
        args={[boxWidth, boxHeight, boxDepth]}
        position={[0, -coneHeight - boxHeight / 2 - sphereSize, 0]}
      >
        <meshBasicMaterial color="red" />
      </Box>
    </group>
  )
}

export default ArticulatedSuport
