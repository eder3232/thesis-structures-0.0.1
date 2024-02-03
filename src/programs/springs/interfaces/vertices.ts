export interface IInputReactVertices {
  name: string
  force: number
  displacement: number
  isRestricted: boolean
  userDOF: number
  id: string
}

export interface IParsedVertexData {
  force: number
  displacement: number
  id: string
  isRestricted: boolean
  userDOF: { x: number }
}
