import { IErrorsCode } from '../store/errors/errorsCode'

type ISeverity = 'error' | 'warning' | 'info'
type ITypeError = 'vertices' | 'edges'

export interface IErrorVertices {
  name: string
  message: string
  // stack: string
  typeError: 'vertices'
  errorCode: IErrorsCode
  severity: ISeverity
}

export interface IErrorEdges {
  name: string
  message: string
  // stack: string
  typeError: 'edges'
  errorCode: IErrorsCode
  severity: ISeverity
}

export interface IError {
  name: string
  message: string
  // stack: string
  typeError: ITypeError
  errorCode: IErrorsCode
  severity: ISeverity
}
