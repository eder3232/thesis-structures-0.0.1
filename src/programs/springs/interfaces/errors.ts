import { IErrorsCode } from '../store/errors/errorsCode'

type ISeverity = 'error' | 'warning' | 'info'
type ITypeError = 'vertices' | 'edges' | 'logic'

interface IErrorBase {
  name: string
  message: string
  // stack: string
  errorCode: IErrorsCode
  severity: ISeverity
}

export interface IErrorVertices extends IErrorBase {
  typeError: 'vertices'
}

export interface IErrorEdges extends IErrorBase {
  typeError: 'edges'
}

export interface IErrorLogic extends IErrorBase {
  typeError: 'logic'
}

export interface IErrors {
  name: string
  message: string
  // stack: string
  typeError: ITypeError
  errorCode: IErrorsCode
  severity: ISeverity
}
