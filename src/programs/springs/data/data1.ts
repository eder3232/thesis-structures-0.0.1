import { IInputReactEdges } from '../interfaces/edges'
import { IInputReactVertices } from '../interfaces/vertices'
import { v4 as uuidv4 } from 'uuid'

export const initialVerticesData: IInputReactVertices[] = [
  {
    force: '0',
    displacement: '0',
    name: 'v4',
    isRestricted: true,
    userDOF: '1',
    id: uuidv4(),
  },
  {
    force: '0',
    displacement: '0',
    name: 'v5',
    isRestricted: true,
    userDOF: '2',
    id: uuidv4(),
  },
  {
    force: '5',
    displacement: '0',
    name: 'v1',
    isRestricted: false,
    userDOF: '3',
    id: uuidv4(),
  },
  {
    force: '4',
    displacement: '0',
    name: 'v2',
    isRestricted: false,
    userDOF: '4',
    id: uuidv4(),
  },
  {
    force: '0',
    displacement: '0',
    name: 'v3',
    isRestricted: false,
    userDOF: '5',
    id: uuidv4(),
  },
]

export const initialEdgesData: IInputReactEdges[] = [
  { name: 'e1', from: 'v4', to: 'v2', k: '10', id: uuidv4() },
  { name: 'e2', from: 'v2', to: 'v3', k: '4', id: uuidv4() },
  { name: 'e3', from: 'v3', to: 'v5', k: '3', id: uuidv4() },
  { name: 'e4', from: 'v2', to: 'v1', k: '8', id: uuidv4() },
]
