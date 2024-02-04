export const errorsCode = {
  e100: {
    name: 'Nombre de nudo duplicado',
    message: 'No pueden haber dos nudos con el mismo nombre.',
    typeError: 'vertices',
    errorCode: 100,
    severity: 'error',
  },
  e110: {
    name: 'Fuerza no numérica',
    message:
      'La fuerza aplicada sobre un nudo debe tener un valor numérico válido.',
    typeError: 'vertices',
    errorCode: 110,
    severity: 'error',
  },
  e111: {
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
  e210: {
    name: 'Rigidez k no numérica',
    message: 'La rigidez de un resorte debe ser un valor numerico.',
    typeError: 'vertices',
    errorCode: 210,
    severity: 'error',
  },
  e220: {
    name: 'Nudo de resorte no existente',
    message: 'El nudo de origin de un resorte no existe.',
    typeError: 'edges',
    errorCode: 220,
    severity: 'error',
  },
  e221: {
    name: 'Nudo de resorte no existente',
    message: 'El nudo de destino de un resorte no existe.',
    typeError: 'edges',
    errorCode: 221,
    severity: 'error',
  },
  e300: {
    name: 'Error en la lógica.',
    message: 'Error en la lógica al agregar un nudo',
    typeError: 'logic',
    errorCode: 300,
    severity: 'error',
  },
  e301: {
    name: 'Error en la lógica.',
    message: 'Error en la lógica al agregar un resorte',
    typeError: 'logic',
    errorCode: 301,
    severity: 'error',
  },
  e302: {
    name: 'Matriz inversa irresoluble.',
    message: 'Error al intentar obtener la inversa de la matriz kuu',
    typeError: 'logic',
    errorCode: 302,
    severity: 'error',
  },
}

export type IErrorsCode = keyof typeof errorsCode
