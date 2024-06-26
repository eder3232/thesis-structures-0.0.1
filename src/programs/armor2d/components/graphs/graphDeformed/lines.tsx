import { IBar } from '@/programs/armor2d/store/graphics/graphResults'
import { Line, Text3D, useFont } from '@react-three/drei'

interface Props {
  lines: IBar[]
}
const Lines = ({ lines }: Props) => {
  const font2 = useFont('/font/Anta_Regular.json')
  const figureRefentialSize = 1

  const textHeight = figureRefentialSize * 0.15
  return (
    <group>
      {lines.map((line, index) => {
        const interpValue = 0.25

        const xText =
          line.coordinates[0][0] +
          interpValue * (line.coordinates[1][0] - line.coordinates[0][0])

        const yText =
          line.coordinates[0][1] +
          interpValue * (line.coordinates[1][1] - line.coordinates[0][1])

        let colorLine = 'black'

        switch (line.state) {
          case 'compression':
            colorLine = 'red'
            break
          case 'tension':
            colorLine = 'green'
            break
          case 'zero':
            colorLine = 'yellow'
            break
          default:
            colorLine = 'black'
            break
        }

        return (
          <group key={index}>
            <Line points={line.coordinates} color={colorLine} lineWidth={2} />

            {/* <Text3D
              size={textHeight}
              font={font2.data}
              position={[xText + textHeight / 2, yText + textHeight / 2, 0]}
            >
              {line.forceValue.toFixed(2)}
              <meshNormalMaterial />
            </Text3D> */}
          </group>
        )
      })}
    </group>
  )
}

export default Lines
