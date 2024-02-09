import { atom } from 'jotai'
import { IErrorVertices } from '../../interfaces/errors'
import { atomGetVertices } from '../vertices'

// const atomVerticesErrors = atom<IErrorVertices[]>([])

export const atomGetVerticesErrors = atom<IErrorVertices[]>((get) => {
  const vertices = get(atomGetVertices)

  const verticesErrors: IErrorVertices[] = []

  //Los nombres deben ser unicos y se debe saber cual es el que esta repetido

  const names = vertices.map((vertex) => vertex.name)
  const repeatedNames = names.filter(
    (name, index, names) => names.indexOf(name) !== index
  )

  repeatedNames.forEach((name) => {
    const indexes = vertices
      .map((vertex, index) => (vertex.name === name ? index : -1))
      .filter((index) => index !== -1)

    indexes.forEach((index) => {
      verticesErrors.push({
        name: 'Nombres de nudos repetidos',
        message: `El nudo ${name} esta repetido`,
        typeError: 'vertices',
        errorCode: 'e100',
        severity: 'error',
      })
    })
  })

  // Los valores de fuerza y desplazamiento no deben ser NAN

  vertices.forEach((vertex, index) => {
    if (isNaN(vertex.forceX)) {
      verticesErrors.push({
        name: 'Fuerza con valor no numerico.',
        message: `El nudo ${vertex.forceX} tiene un valor de fuerza no numerico en el eje X.`,
        typeError: 'vertices',
        errorCode: 'e110',
        severity: 'error',
      })
    }
    if (isNaN(vertex.forceX)) {
      verticesErrors.push({
        name: 'Fuerza con valor no numerico.',
        message: `El nudo ${vertex.forceZ} tiene un valor de fuerza no numerico en el eje Z.`,
        typeError: 'vertices',
        errorCode: 'e110',
        severity: 'error',
      })
    }
    if (isNaN(vertex.displacementX)) {
      verticesErrors.push({
        name: 'Desplazamiento con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de desplazamiento no numerico en el eje X.`,
        typeError: 'vertices',
        errorCode: 'e111',
        severity: 'error',
      })
    }
    if (isNaN(vertex.displacementZ)) {
      verticesErrors.push({
        name: 'Desplazamiento con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de desplazamiento no numerico en el eje Z.`,
        typeError: 'vertices',
        errorCode: 'e111',
        severity: 'error',
      })
    }
    if (isNaN(vertex.springX)) {
      verticesErrors.push({
        name: 'Resorte con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de resorte no numerico en el eje X.`,
        typeError: 'vertices',
        errorCode: 'e112',
        severity: 'error',
      })
    }
    if (isNaN(vertex.springZ)) {
      verticesErrors.push({
        name: 'Resorte con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de resorte no numerico en el eje Z.`,
        typeError: 'vertices',
        errorCode: 'e112',
        severity: 'error',
      })
    }
    if (isNaN(vertex.userDOFX)) {
      verticesErrors.push({
        name: 'Grado de libertad con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de grado de libertad no numerico en el eje X.`,
        typeError: 'vertices',
        errorCode: 'e113',
        severity: 'error',
      })
    }
    if (isNaN(vertex.userDOFZ)) {
      verticesErrors.push({
        name: 'Grado de libertad con valor no numerico.',
        message: `El nudo ${vertex.name} tiene un valor de grado de libertad no numerico en el eje Z.`,
        typeError: 'vertices',
        errorCode: 'e113',
        severity: 'error',
      })
    }
  })

  return verticesErrors
})
