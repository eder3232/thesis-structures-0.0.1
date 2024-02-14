import React from 'react'
import Graph2D from './graph2D'

const Page = () => {
  const points: Array<[number, number, number]> = [
    [0, 0, 0],
    [3, 0, 0],
    [0, 4, 0],
    [3, 4, 0],
  ]

  const lines = [
    [points[0], points[1]],
    [points[2], points[3]],

    [points[0], points[2]],
    [points[1], points[3]],

    [points[1], points[2]],
    [points[0], points[3]],
  ]
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-pink-200">
      <Graph2D points={points} lines={lines} />
    </div>
  )
}

export default Page
