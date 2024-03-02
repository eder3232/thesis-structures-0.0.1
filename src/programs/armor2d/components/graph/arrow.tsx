import { Cone, Cylinder, FontData, Text3D } from '@react-three/drei'

import font from '../../../../../public/font/Anta_Regular.json'
const fontUnk = font as unknown
const fontTyped = fontUnk as FontData

interface Props {
  applicationPoint: [number, number, number]
  directorCosines: [number, number, number]
  arrowSize: number
  sphereSize: number
  forceValue: number
}

const Arrow = ({
  applicationPoint,
  directorCosines,
  arrowSize,
  sphereSize,
  forceValue,
}: Props) => {
  const cilinderHeight = arrowSize * 0.7
  const cilinderWidth = arrowSize * 0.025
  const coneHeight = arrowSize * 0.3
  const coneWidth = arrowSize * 0.1

  const textHeight = arrowSize * 0.15
  const textOffset = arrowSize * 0.1

  return (
    <group
      rotation={[
        (directorCosines[0] * Math.PI) / 180,
        (directorCosines[1] * Math.PI) / 180,
        (directorCosines[2] * Math.PI) / 180,
      ]}
      position={[applicationPoint[0], applicationPoint[1], applicationPoint[2]]}
    >
      <Cylinder
        args={[cilinderWidth, cilinderWidth, cilinderHeight]}
        position={[0, -cilinderHeight / 2 - coneHeight - sphereSize, 0]}
      >
        <meshBasicMaterial color="green" />
      </Cylinder>

      <Cone
        args={[coneWidth, coneHeight]}
        position={[0, -coneHeight / 2 - sphereSize, 0]}
      >
        <meshBasicMaterial color="green" />
      </Cone>

      <Text3D
        size={textHeight}
        font={fontTyped}
        position={[
          -textOffset,
          -cilinderHeight / 2 - coneHeight - sphereSize,
          0,
        ]}
        rotation={[
          (directorCosines[0] * Math.PI) / 180,
          (directorCosines[1] * Math.PI) / 180,
          -(directorCosines[2] * Math.PI) / 180,
        ]}
      >
        {forceValue.toFixed(2)}
        <meshNormalMaterial />
      </Text3D>
    </group>
  )
}

export default Arrow
