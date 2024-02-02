export interface IInputReactVertices {
  name: string
  force: string
  displacement: string
  isRestricted: boolean
  userDOF: string
  id: string
}

export interface IParsedVertexData {
  force: number
  displacement: number
  id: string
  isRestricted: boolean
  userDOF: { x: number }
}
