interface xyzNumber {
  x: number
  y: number
  z: number
}

interface xyzBoolean {
  x: boolean
  y: boolean
  z: boolean
}

export interface IInputReactVertices {
  name: string
  coordinateX: number
  coordinateY: number
  coordinateZ: number
  forceX: number
  forceY: number
  forceZ: number
  displacementX: number
  displacementY: number
  displacementZ: number
  isRestrainedX: boolean
  isRestrainedY: boolean
  isRestrainedZ: boolean
  springX: number
  springY: number
  springZ: number
  userDOFX: number
  userDOFY: number
  userDOFZ: number
  id: string
}

export interface IInputVertices {
  name: string
  coordinates: xyzNumber
  forces: xyzNumber
  displacements: xyzNumber
  isRestrained: xyzBoolean
  springs: xyzNumber
  userDOF: xyzNumber
  id: string
}
