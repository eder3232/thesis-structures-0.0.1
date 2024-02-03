export const errorsCode = {
  e100: {
    name: 'Nombre de nudo duplicado',
    message: 'No pueden haber dos nudos con el mismo nombre.',
    typeError: 'vertices',
    errorCode: 100,
    severity: 'error',
  },
  e101: {
    name: 'Fuerza no numérica',
    message:
      'La fuerza aplicada sobre un nudo debe tener un valor numérico válido.',
    typeError: 'vertices',
    errorCode: 101,
    severity: 'error',
  },
  e102: {
    name: 'Desplazamiento no numérico',
    message:
      'El desplazamiento aplicado sobre un nudo debe tener un valor numérico válido.',
    typeError: 'vertices',
    errorCode: 102,
    severity: 'error',
  },
  e200: {
    name: 'Nombre de resorte duplicado',
    message: 'No pueden haber dos resortes con el mismo nombre.',
    typeError: 'edges',
    errorCode: 200,
    severity: 'error',
  },
  e201: {
    name: 'Rigidez k no numérica',
    message: 'La rigidez de un resorte debe ser un valor numerico.',
    typeError: 'vertices',
    errorCode: 201,
    severity: 'error',
  },
}
export type IErrorsCode = keyof typeof errorsCode
