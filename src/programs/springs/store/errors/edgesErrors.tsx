import { atom } from 'jotai'
import { IErrorEdges } from '../../interfaces/errors'
import { atomGetEdges } from '../edges'

export const atomGetEdgesErrors = atom<IErrorEdges[]>((get) => {
  const edges = get(atomGetEdges)

  const edgesErrors: IErrorEdges[] = []

  //Los nombres deben ser unicos y se debe saber cual es el que esta repetido

  const names = edges.map((edge) => edge.name)

  const repeatedNames = names.filter(
    (name, index, names) => names.indexOf(name) !== index
  )

  repeatedNames.forEach((name) => {
    const indexes = edges
      .map((edge, index) => (edge.name === name ? index : -1))
      .filter((index) => index !== -1)

    indexes.forEach((index) => {
      edgesErrors.push({
        name: 'Nombres de resortes repetidos',
        message: `El resorte ${name} esta repetido`,
        typeError: 'edges',
        errorCode: 'e200',
        severity: 'error',
      })
    })
  })

  //Los valores de rigidez k no deben ser NAN

  edges.forEach((edge, index) => {
    if (isNaN(edge.k)) {
      edgesErrors.push({
        name: 'Rigidez con valor no numerico.',
        message: `El resorte ${edge.name} tiene un valor de rigidez no numerico`,
        typeError: 'edges',
        errorCode: 'e201',
        severity: 'error',
      })
    }
  })

  return edgesErrors
})
