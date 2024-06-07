import { IReactionForGraphic } from '@/programs/armor2d/store/graphics/graphResults'
import Arrow from '../graphEsquema/arrow'

interface Props {
  reactions: IReactionForGraphic[]
  sphereSize: number
}

const Reactions = ({ reactions, sphereSize }: Props) => {
  return (
    <group>
      {reactions.map((reaction, index) => {
        let directorCosines: [number, number, number] = [0, 0, 0]
        if (reaction.axis === 'x' && reaction.value > 0) {
          directorCosines = [0, 0, 270]
        } else if (reaction.axis === 'x' && reaction.value < 0) {
          directorCosines = [0, 0, 90]
        }
        return (
          <group key={index}>
            <Arrow
              applicationPoint={reaction.applicationPoint}
              directorCosines={directorCosines}
              arrowSize={1}
              forceValue={reaction.value}
              sphereSize={sphereSize}
            />
          </group>
        )
      })}
    </group>
  )
}

export default Reactions
