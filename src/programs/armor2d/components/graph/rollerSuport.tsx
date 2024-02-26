import { Cone, Sphere } from '@react-three/drei'

interface Props {
  applicationPoint: [number, number, number]
  directorCosines: [number, number, number]
  sphereSize: number
  size: number
}
const RollerSuport = ({ size, sphereSize, applicationPoint }: Props) => {
  const coneWidth = size
  const coneHeight = size
  return (
    <group position={applicationPoint}>
      <Cone
        args={[coneWidth, coneHeight, 4, 1]}
        position={[0, -coneHeight / 2 - sphereSize, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshBasicMaterial color="blue" />
      </Cone>

      <Sphere
        args={[size / 4]}
        position={[-size / 2, -coneHeight - size / 4 - sphereSize, 0]}
      >
        <meshBasicMaterial color="red" />
      </Sphere>

      <Sphere
        args={[size / 4]}
        position={[0, -coneHeight - size / 4 - sphereSize, 0]}
      >
        <meshBasicMaterial color="red" />
      </Sphere>

      <Sphere
        args={[size / 4]}
        position={[size / 2, -coneHeight - size / 4 - sphereSize, 0]}
      >
        <meshBasicMaterial color="red" />
      </Sphere>
    </group>
  )
}

export default RollerSuport
