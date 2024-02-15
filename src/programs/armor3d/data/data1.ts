import { v4 as uuidv4 } from 'uuid'

import { IInputReactVertices, IInputVertices } from '../interfaces/vertices'
import { IInputReactEdges } from '../interfaces/edges'

const raw: IInputVertices[] = [
  {
    name: 'a',
    coordinates: { x: 0, y: 0, z: 0 },
    forces: { x: 0, y: 0, z: 0 },
    displacements: { x: 0, y: 0, z: 0 },
    isRestrained: { x: true, y: true, z: true },
    springs: { x: 0, y: 0, z: 0 },
    userDOF: { x: 1, y: 2, z: 3 },
    id: uuidv4(),
  },
  {
    name: 'b',
    coordinates: { x: 3.5, y: 0, z: 0 },
    forces: { x: 0, y: 0, z: 0 },
    displacements: { x: 0, y: 0, z: -0.01 },
    isRestrained: { x: true, y: true, z: true },
    springs: { x: 0, y: 0, z: 0 },
    userDOF: { x: 4, y: 5, z: 6 },
    id: uuidv4(),
  },
  {
    name: 'c',
    coordinates: { x: 3.5, y: 2, z: 0 },
    forces: { x: 0, y: 0, z: 0 },
    displacements: { x: 0, y: 0, z: -0.01 },
    isRestrained: { x: false, y: false, z: true },
    springs: { x: 0, y: 0, z: 0 },
    userDOF: { x: 7, y: 8, z: 9 },
    id: uuidv4(),
  },
  {
    name: 'd',
    coordinates: { x: 1.5, y: 1.2, z: 3 },
    forces: { x: 0, y: 0, z: -25 },
    displacements: { x: 0, y: 0, z: -0.01 },
    isRestrained: { x: false, y: false, z: false },
    springs: { x: 0, y: 0, z: 0 },
    userDOF: { x: 10, y: 11, z: 12 },
    id: uuidv4(),
  },
]

export const initialVerticesData: IInputReactVertices[] = raw.map((v) => {
  return {
    name: v.name,
    coordinateX: v.coordinates.x,
    coordinateY: v.coordinates.y,
    coordinateZ: v.coordinates.z,
    forceX: v.forces.x,
    forceY: v.forces.y,
    forceZ: v.forces.z,
    displacementX: v.displacements.x,
    displacementY: v.displacements.y,
    displacementZ: v.displacements.z,
    isRestrainedX: v.isRestrained.x,
    isRestrainedY: v.isRestrained.y,
    isRestrainedZ: v.isRestrained.z,
    springX: v.springs.x,
    springY: v.springs.y,
    springZ: v.springs.z,
    userDOFX: v.userDOF.x,
    userDOFY: v.userDOF.y,
    userDOFZ: v.userDOF.z,
    id: v.id,
  }
})

export const initialEdgesData: IInputReactEdges[] = [
  {
    name: '1',
    from: 'a',
    to: 'b',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
  {
    name: '2',
    from: 'b',
    to: 'c',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
  {
    name: '3',
    from: 'a',
    to: 'c',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
  {
    name: '4',
    from: 'a',
    to: 'd',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
  {
    name: '5',
    from: 'b',
    to: 'd',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
  {
    name: '6',
    from: 'c',
    to: 'd',
    area: 0.002,
    elasticity: 20000000,
    id: uuidv4(),
  },
]
