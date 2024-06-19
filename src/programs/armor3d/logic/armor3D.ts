import { IEdge, IEdgesGetData } from './edges'
import { IVertex, IVerticesSettings, IVerticesUtils } from './vertices'
import { add, inv, multiply, subtract, transpose, zeros } from 'mathjs'
import { twoDimensionalArray } from '../utils/twoDimensionalArray'
import { tablePrinter } from '../utils/printer'

export interface ILocalArrays {
  transform: number[][]
  transformTransposed: number[][]
  localCoordinates_withoutEa: number[][]
  localCoordinates_complete: number[][]
  globalCoordinates_withoutEa: number[][]
  globalCoordinates_complete: number[][]
  tableDOF: number[]
}

export interface IOrderDOF {
  name: string
  isRestricted: boolean
  dof_internal: number
  dof_user: number
}

interface IDataArray {
  force: string | number
  displacement: string | number
  name: string
  dofInternal: number
  dofUser: number
  isRestricted: boolean
  k: number
}

export class Armor3D {
  vertices: Map<string, IVertex>
  verticesUtils: IVerticesUtils
  verticesSettings: IVerticesSettings
  edges: Map<string, IEdge>

  settings: {
    dofRestricted: number
    dofUnrestricted: number
    dofTotal: number
    dofForVertex: number
    lengthTableDOF: number
    isRestrictedAbove: boolean
  }

  utils: {
    orderOfDOF: IOrderDOF[]
    dofPointerInDataArray: Map<number, number>
  } = {
    orderOfDOF: [],
    dofPointerInDataArray: new Map(),
  }

  dataArray: Map<number, IDataArray> = new Map()

  localArrays: Map<string, ILocalArrays> = new Map()

  f: {
    global: (number | string)[][]
    restricted: string[][]
    unrestricted: number[][]
  }

  k: {
    global: number[][]
    krr: number[][]
    kru: number[][]
    kur: number[][]
    kuu: number[][]
  }

  u: {
    global: (number | string)[][]
    restricted: number[][]
    unrestricted: string[][]
  }

  solved: {
    u: {
      unrestricted: number[][]
      global: number[][]
    }
    f: {
      restricted: number[][]
      global: number[][]
    }
  } = {
    f: {
      restricted: [],
      global: [],
    },
    u: {
      unrestricted: [],
      global: [],
    },
  }

  constructor(edgesData: IEdgesGetData) {
    this.vertices = edgesData.vertices
    this.verticesUtils = edgesData.verticesUtils
    this.verticesSettings = edgesData.verticesSettings
    this.edges = edgesData.edges

    const dofForVertex = this.verticesUtils.axis.length

    const u = this.verticesUtils.unrestrictedDOF
    const r = this.verticesUtils.restrictedDOF
    const t = this.verticesUtils.totalDOF

    this.settings = {
      dofRestricted: r,
      dofUnrestricted: u,
      dofTotal: t,
      dofForVertex: dofForVertex,
      lengthTableDOF: 2 * dofForVertex,
      isRestrictedAbove: true,
    }

    this.f = {
      global: zeros(t, 1).valueOf() as (number | string)[][],
      restricted: twoDimensionalArray(r, 1, ''),
      unrestricted: twoDimensionalArray(u, 1, 0),
    }

    this.k = {
      global: zeros(t, t).valueOf() as number[][],
      krr: zeros(r, r).valueOf() as number[][],
      kru: zeros(r, u).valueOf() as number[][],
      kur: zeros(u, r).valueOf() as number[][],
      kuu: zeros(u, u).valueOf() as number[][],
    }

    this.u = {
      global: zeros(t, 1).valueOf() as (number | string)[][],
      restricted: twoDimensionalArray(r, 1, 0),
      unrestricted: twoDimensionalArray(u, 1, ''),
    }
  }

  generateLocals() {
    for (const [key, value] of this.edges) {
      const base = [
        [1, -1],
        [-1, 1],
      ]

      const cx = value['cx']
      const cy = value['cy']
      const cz = value['cz']

      const transform = [
        [cx, 0],
        [cy, 0],
        [cz, 0],
        [0, cx],
        [0, cy],
        [0, cz],
      ]

      const transformTransposed = transpose(transform).valueOf() as number[][]

      const localCoordinates_withoutEA = multiply(
        1 / value['lengthEdge'],
        base
      ).valueOf() as number[][]

      const localCoordinates_complete = multiply(
        value.ea_l,
        base
      ).valueOf() as number[][]

      const globalCoordinates_withoutEA = multiply(
        multiply(transform, localCoordinates_withoutEA),
        transformTransposed
      ).valueOf() as number[][]

      const globalCoordinates_complete = multiply(
        multiply(transform, localCoordinates_complete),
        transformTransposed
      ).valueOf() as number[][]

      const tableDOF = value.DOF.table.map((dof) => dof.internal)

      this.localArrays.set(key, {
        transform: transform,
        transformTransposed: transformTransposed,
        localCoordinates_withoutEa: localCoordinates_withoutEA,
        localCoordinates_complete: localCoordinates_complete,
        globalCoordinates_withoutEa: globalCoordinates_withoutEA,
        globalCoordinates_complete: globalCoordinates_complete,
        tableDOF: tableDOF,
      })

      // console.table(globalCoordinates_complete)
    }
    return this.localArrays
  }

  generateDataArray() {
    for (const [key, value] of this.vertices) {
      this.verticesUtils.axis.map((a) => {
        const dataPartial: Partial<IDataArray> = {}
        dataPartial.name = `Node-${key}-${a}`
        dataPartial.dofInternal = value.DOF[a]['internal']
        dataPartial.dofUser = value.DOF[a]['user']
        dataPartial.isRestricted = value.isRestrained[a]
        dataPartial.k = value.springs[a]

        if (value.isRestrained[a]) {
          dataPartial.force = `F-${key}-${a}`
          dataPartial.displacement = value.displacements[a]
        } else {
          dataPartial.force = value.forces[a]
          dataPartial.displacement = `U-${key}-${a}`
        }

        const data = dataPartial as IDataArray
        // console.log(value.DOF[a]['internal'])
        this.dataArray.set(value.DOF[a]['internal'], data)
      })
    }
    return this.dataArray
  }

  generateOrderOfDOF({ isRestrictedAbove }: { isRestrictedAbove: boolean }) {
    const dofDataRestricted: {
      dof_user: number
      dof_internal: number
      isRestricted: boolean
      name: string
    }[] = []
    const dofDataUnrestricted: {
      dof_user: number
      dof_internal: number
      isRestricted: boolean
      name: string
    }[] = []

    this.settings.isRestrictedAbove = isRestrictedAbove

    for (const [key, value] of this.dataArray) {
      if (value.isRestricted) {
        dofDataRestricted.push({
          dof_user: value.dofUser,
          dof_internal: value.dofInternal,
          isRestricted: value.isRestricted,
          name: value.name,
        })
      } else {
        dofDataUnrestricted.push({
          dof_user: value.dofUser,
          dof_internal: value.dofInternal,
          isRestricted: value.isRestricted,
          name: value.name,
        })
      }
    }

    // reordenando para tratar de darle la forma que quiere el usuario

    dofDataRestricted.sort((a, b) => a.dof_user - b.dof_user)
    dofDataUnrestricted.sort((a, b) => a.dof_user - b.dof_user)

    if (isRestrictedAbove) {
      this.utils.orderOfDOF = [...dofDataRestricted, ...dofDataUnrestricted]
    } else {
      this.utils.orderOfDOF = [...dofDataUnrestricted, ...dofDataRestricted]
    }
    return this.utils.orderOfDOF
  }

  generateDOFPointerInDataArray() {
    this.utils.orderOfDOF.map((dof, index) => {
      this.utils.dofPointerInDataArray.set(dof.dof_internal, index)
    })
    return this.utils.dofPointerInDataArray
  }

  assembler(e: ILocalArrays, global: number[][]) {
    const copyGlobal = structuredClone(global)
    const lengthTableDOF = this.verticesUtils.axis.length * 2
    for (let i = 0; i < lengthTableDOF; i++) {
      const row = this.utils.dofPointerInDataArray.get(e.tableDOF[i])
      for (let j = 0; j < lengthTableDOF; j++) {
        const column = this.utils.dofPointerInDataArray.get(e.tableDOF[j])
        copyGlobal[row!][column!] += e.globalCoordinates_complete[i][j]
      }
    }

    // console.log(
    //   `Matriz de rigidez local provisional al ensamblar: ${e.tableDOF}`
    // )
    // tablePrinter(copyGlobal, 2)
    return copyGlobal
  }

  buildGlobal() {
    let currentGlobal = structuredClone(this.k.global)
    const record = [{ label: '0', value: currentGlobal }]
    for (const [key, value] of this.localArrays) {
      currentGlobal = this.assembler(value, currentGlobal)
      record.push({ label: `${key}`, value: structuredClone(currentGlobal) })
    }
    this.k.global = currentGlobal
    // console.log('Matriz de rigidez global:')
    // tablePrinter(this.k.global, 2)
    return {
      kGlobal: this.k.global,
      record,
    }
  }

  buildForces() {
    if (this.settings.isRestrictedAbove) {
      for (const [key, value] of this.dataArray) {
        if (value['isRestricted']) {
          this.f.restricted[
            this.utils.dofPointerInDataArray.get(value.dofInternal)!
          ][0] = value.force.toString() //`F-${key}`
          this.f.global[
            this.utils.dofPointerInDataArray.get(value.dofInternal)!
          ][0] = value.force.toString() //`F-${key}`
        } else {
          this.f.unrestricted[
            this.utils.dofPointerInDataArray.get(value.dofInternal)! -
              this.verticesUtils.restrictedDOF
          ][0] = value.force as number
          this.f.global[
            this.utils.dofPointerInDataArray.get(value.dofInternal)!
          ][0] = value.force as number
        }
      }
    } else {
      for (const [key, value] of this.dataArray) {
        if (value['isRestricted']) {
          this.f.restricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])! -
              this.verticesUtils.restrictedDOF
          ][0] = value.force.toString() //`F-${key}`
          this.f.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.force.toString() //`F-${key}`
        } else {
          this.f.unrestricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.force as number
          this.f.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.force as number
        }
      }
    }

    // console.log('Vector de fuerzas global:')
    // console.table(this.f.global)
    // console.log('Vector de fuerzas restringidas:')
    // console.table(this.f.restricted)
    // console.log('Vector de fuerzas irrestringidas:')
    // console.table(this.f.unrestricted)

    return {
      restricted: this.f.restricted,
      unrestricted: this.f.unrestricted,
      global: this.f.global,
    }
  }

  buildDisplacements() {
    if (this.settings.isRestrictedAbove) {
      for (const [key, value] of this.dataArray) {
        if (value['isRestricted']) {
          this.u.restricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement as number

          this.u.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement
        } else {
          this.u.unrestricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])! -
              this.settings.dofRestricted
          ][0] = value.displacement.toString() //`U-${key}`

          this.u.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement.toString() //`U-${key}`
        }
      }
    } else {
      for (const [key, value] of this.dataArray) {
        if (value['isRestricted']) {
          this.u.restricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])! -
              this.settings.dofUnrestricted
          ][0] = value.displacement as number

          this.u.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement
        } else {
          this.u.unrestricted[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement.toString() //`U-${key}`

          this.u.global[
            this.utils.dofPointerInDataArray.get(value['dofInternal'])!
          ][0] = value.displacement.toString() //`U-${key}`
        }
      }
    }
    // console.log('Vector de desplazamientos global:')
    // console.table(this.u.global)
    // console.log('Vector de desplazamientos restringidos:')
    // console.table(this.u.restricted)
    // console.log('Vector de desplazamientos irrestringidos:')
    // console.table(this.u.unrestricted)

    return {
      restricted: this.u.restricted,
      unrestricted: this.u.unrestricted,
      global: this.u.global,
    }
  }

  splitGlobal() {
    const u = this.verticesUtils.unrestrictedDOF
    const r = this.verticesUtils.restrictedDOF
    if (this.settings.isRestrictedAbove) {
      // |krr kru|
      // |kur kuu|
      // krr
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
          this.k.krr[i][j] = this.k.global[i][j]
        }
      }
      //kru
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kru[i][j] = this.k.global[i][j + r]
        }
      }
      //kur
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < r; j++) {
          this.k.kur[i][j] = this.k.global[i + r][j]
        }
      }
      //kuu
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kuu[i][j] = this.k.global[i + r][j + r]
        }
      }
    } else {
      // |kuu kur|
      // |kru krr|
      //krr
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
          this.k.krr[i][j] = this.k.global[i + u][j + u]
        }
      }
      //kru
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kru[i][j] = this.k.global[i + u][j]
        }
      }
      //kur
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < r; j++) {
          this.k.kur[i][j] = this.k.global[i][j + u]
        }
      }
      //kuu
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kuu[i][j] = this.k.global[i][j]
        }
      }
    }
    // console.log('krr')
    // tablePrinter(this.k.krr, 2)
    // console.log('kur')
    // tablePrinter(this.k.kur, 2)
    // console.log('kru')
    // tablePrinter(this.k.kru, 2)
    // console.log('kuu')
    // tablePrinter(this.k.kuu, 2)

    return {
      kuu: this.k.kuu,
      kru: this.k.kru,
      kur: this.k.kur,
      krr: this.k.krr,
    }
  }

  solveDisplacements() {
    try {
      inv(this.k.kuu)
    } catch {
      return {
        ok: false,
        message: 'La matriz kuu no tiene inversa, verifica los datos.',
        uuSolved: [],
      }
    }

    this.solved.u.unrestricted = multiply(
      inv(this.k.kuu),
      subtract(this.f.unrestricted, multiply(this.k.kur, this.u.restricted))
    )

    // console.log('uSolved')
    // tablePrinter(this.solved.u.unrestricted, 4)
    return { uuSolved: this.solved.u.unrestricted, ok: true, message: '' }
  }

  solveForces() {
    this.solved.f.restricted = add(
      multiply(this.k.krr, this.u.restricted),
      multiply(this.k.kru, this.solved.u.unrestricted)
    )
    // console.log('fSolved')
    // tablePrinter(this.solved.f.restricted, 6)
    return this.solved.f.restricted
  }
}
