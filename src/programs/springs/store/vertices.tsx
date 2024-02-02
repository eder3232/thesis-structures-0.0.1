import { atom } from 'jotai'

import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { IInputReactVertices } from '../interfaces/vertices'
import { initialVerticesData } from '../data/data1'

const atomReactVertices = atom<IInputReactVertices[]>(initialVerticesData)

export const atomGetReactVertices = atom((get) => get(atomReactVertices))
