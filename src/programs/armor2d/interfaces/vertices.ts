interface xzNumber {
  x: number
  z: number
}

interface xzBoolean {
  x: boolean
  z: boolean
}

export interface IInputReactVertices {
  name: string
  coordinateX: number
  coordinateZ: number
  forceX: number
  forceZ: number
  displacementX: number
  displacementZ: number
  isRestrictedX: boolean
  isRestrictedZ: boolean
  springX: number
  springZ: number
  userDOFX: number
  userDOFZ: number
  id: string
}

export interface IInputVertices {
  name: string
  coordinates: xzNumber
  forces: xzNumber
  displacements: xzNumber
  isRestricted: xzBoolean
  springs: xzNumber
  userDOF: xzNumber
  id: string
}
