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
    errorCode: 111,
    severity: 'error',
  },
  e112: {
    name: 'Valor de resorte no numérico',
    message:
      'El valor del resorte aplicado sobre un nudo debe tener un valor numérico válido.',
    typeError: 'vertices',
    errorCode: 112,
    severity: 'error',
  },
  e113: {
    name: 'Valor del grado de libertad no numérico',
    message:
      'El valor del grado de libertad aplicado sobre un nudo debe tener un valor numérico válido.',
    typeError: 'vertices',
    errorCode: 113,
    severity: 'error',
  },
  e200: {
    name: 'Nombre de barra duplicado',
    message: 'No pueden haber dos barras con el mismo nombre.',
    typeError: 'edges',
    errorCode: 200,
    severity: 'error',
  },
  e210: {
    name: 'Elasticidad no numérica',
    message: 'La elasticidad de una barra debe ser un valor numérico.',
    typeError: 'edges',
    errorCode: 210,
    severity: 'error',
  },
  e211: {
    name: 'Area no numérica',
    message: 'El área de una barra debe ser un valor numérico.',
    typeError: 'edges',
    errorCode: 210,
    severity: 'error',
  },
  e220: {
    name: 'Nudo de barra no existente',
    message: 'El nudo de origen de una barra no existe.',
    typeError: 'edges',
    errorCode: 220,
    severity: 'error',
  },
  e221: {
    name: 'Nudo de barra no existente',
    message: 'El nudo de destino de una barra no existe.',
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
    message: 'Error en la lógica al agregar una barra',
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
