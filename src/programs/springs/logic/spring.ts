import { tablePrinter } from "../utils/printer";
import { twoDimensionalArray } from "../utils/twoDimensionalArray";
import { IEdge, IEdgesGetData } from "./edges";
import { IVertex, IVerticesGetData, IVerticesUtils } from "./vertices";
import { add, inv, multiply, subtract, transpose, zeros } from "mathjs";

export interface ILocalArrays {
  local: number[][];
  tableDOF: number[];
}

interface IDataArray {
  force: string | number;
  displacement: string | number;
  isRestricted: boolean;
  id: string;
  userDOF: number;
  internalDOF: number;
}

export interface IOrderDOF {
  id: string;
  isRestricted: boolean;
  dof_user: number;
  dof_internal: number;
}

export class Spring {
  verticesUtils: IVerticesUtils;
  dataVertices: Map<string, IVertex>;
  dataEdges: Map<string, IEdge>;

  settings: {
    dofRestricted: number;
    dofUnrestricted: number;
    dofTotal: number;

    dofForVertex: number;
    lengthTableDOF: number;
    isRestrictedAbove: boolean;
  };

  utils: {
    orderOfDOF: {
      dof_internal: number;
      isRestricted: boolean;
      id: string;
      dof_user: number;
    }[];
    dofPointerInDataArray: Map<number, number>;
  } = { orderOfDOF: [], dofPointerInDataArray: new Map() };

  dataArray: Map<number, IDataArray> = new Map();

  localArrays: Map<string, ILocalArrays> = new Map();

  f: {
    global: (number | string)[][];
    restricted: string[][];
    unrestricted: number[][];
  };

  k: {
    global: number[][];
    krr: number[][];
    kru: number[][];
    kur: number[][];
    kuu: number[][];
  };

  u: {
    global: (number | string)[][];
    restricted: number[][];
    unrestricted: string[][];
  };

  solved: {
    u: {
      unrestricted: number[][];
      global: number[][];
    };
    f: {
      restricted: number[][];
      global: number[][];
    };
  } = {
      f: {
        restricted: [],
        global: [],
      },
      u: {
        unrestricted: [],
        global: [],
      },
    };

  constructor(edgesData: IEdgesGetData) {
    this.dataVertices = structuredClone(edgesData.verticesGetData.data);
    this.verticesUtils = structuredClone(edgesData.verticesGetData.utils);
    this.dataEdges = structuredClone(edgesData.edges);
    const dofForVertex = 1;
    const u = this.verticesUtils.unrestrictedDOF;
    const r = this.verticesUtils.restrictedDOF;
    const t = this.verticesUtils.totalDOF;

    this.settings = {
      dofForVertex: dofForVertex,
      lengthTableDOF: 2 * dofForVertex,
      dofRestricted: this.verticesUtils.restrictedDOF,
      dofUnrestricted: this.verticesUtils.unrestrictedDOF,
      dofTotal: this.verticesUtils.totalDOF,
      isRestrictedAbove: true,
    };

    this.f = {
      global: zeros(t, 1).valueOf() as (number | string)[][],
      restricted: twoDimensionalArray(r, 1, ""),
      unrestricted: twoDimensionalArray(u, 1, 0),
    };

    this.k = {
      global: zeros(t, t).valueOf() as number[][],
      krr: zeros(r, r).valueOf() as number[][],
      kru: zeros(r, u).valueOf() as number[][],
      kur: zeros(u, r).valueOf() as number[][],
      kuu: zeros(u, u).valueOf() as number[][],
    };

    this.u = {
      global: zeros(t, 1).valueOf() as (number | string)[][],
      restricted: twoDimensionalArray(r, 1, 0),
      unrestricted: twoDimensionalArray(u, 1, ""),
    };
  }

  generateOrderDOF({ isRestrictedAbove }: { isRestrictedAbove: boolean }): IOrderDOF[] {
    this.settings.isRestrictedAbove = isRestrictedAbove;

    const dofDataRestricted: IOrderDOF[] = [];

    const dofDataUnrestricted: IOrderDOF[] = [];

    for (const [key, value] of this.dataVertices) {
      if (value.isRestricted) {
        dofDataRestricted.push({
          id: value.id,
          isRestricted: true,
          dof_user: value.DOF.x.user,
          dof_internal: value.DOF.x.internal,
        });
      } else {
        dofDataUnrestricted.push({
          id: value.id,
          isRestricted: false,
          dof_user: value.DOF.x.user,
          dof_internal: value.DOF.x.internal,
        });
      }
    }

    // reordenando para tratar de darle la forma que quiere el usuario
    dofDataRestricted.sort((a, b) => a.dof_user - b.dof_user);
    dofDataUnrestricted.sort((a, b) => a.dof_user - b.dof_user);
    if (isRestrictedAbove) {
      this.utils.orderOfDOF = [...dofDataRestricted, ...dofDataUnrestricted];
    } else {
      this.utils.orderOfDOF = [...dofDataUnrestricted, ...dofDataRestricted];
    }
    return this.utils.orderOfDOF;
  }

  createDictionary() {
    this.utils.orderOfDOF.map((value, index) => {
      this.utils.dofPointerInDataArray.set(value.dof_internal, index);
    });
    // console.log('Tabla de punteros:')
    // console.table(this.utils.dofPointerInDataArray)
    return this.utils.dofPointerInDataArray;
  }

  generateLocals() {
    for (const [key, value] of this.dataEdges) {
      const k = value.k;
      const tableDOF = value.DOF.table.map((e) => e.internal);

      const obj = {
        local: [
          [k, -k],
          [-k, k],
        ],
        tableDOF,
      };

      this.localArrays.set(key, obj);
      // console.log('Matriz de rigidez local de la barra ' + key + ':')
      // tablePrinter(obj.local, 2)
    }
    return this.localArrays;
  }

  generateData() {
    for (const [key, value] of this.dataVertices) {
      const force = value.force;
      const displacement = value.displacement;
      const isRestricted = value.isRestricted;
      const internalDOF = value.DOF.x.internal;
      const userDOF = value.DOF.x.user;
      const id = value.id;

      this.dataArray.set(internalDOF, {
        force,
        displacement,
        isRestricted,
        id,
        userDOF,
        internalDOF,
      });
    }
    return this.dataArray;
  }

  assembler(e: ILocalArrays) {
    const lengthTableDOF = this.verticesUtils.axisDOF.length * 2;

    for (let i = 0; i < lengthTableDOF; i++) {
      const row = this.utils.dofPointerInDataArray.get(e.tableDOF[i])!;
      for (let j = 0; j < lengthTableDOF; j++) {
        const column = this.utils.dofPointerInDataArray.get(e.tableDOF[j])!;

        this.k.global[row][column] += e.local[i][j];
      }
    }
  }

  assemblerBySteps(e: ILocalArrays, global: number[][]): number[][] {
    const copyGlobal = structuredClone(global)
    const lengthTableDOF = this.verticesUtils.axisDOF.length * 2;
    for (let i = 0; i < lengthTableDOF; i++) {
      const row = this.utils.dofPointerInDataArray.get(e.tableDOF[i])!;
      for (let j = 0; j < lengthTableDOF; j++) {
        const column = this.utils.dofPointerInDataArray.get(e.tableDOF[j])!;
        copyGlobal[row][column] += e.local[i][j];
      }
    }
    return copyGlobal;
  }

  buildGlobalBySteps() {
    let currentGlobal = structuredClone(this.k.global)
    const history = [{ label: '0', value: structuredClone(currentGlobal) }]
    for (const [key, value] of this.localArrays) {
      const cache = this.assemblerBySteps(value, currentGlobal)
      history.push({ label: `${key}`, value: this.assemblerBySteps(value, currentGlobal) });
      currentGlobal = cache
    }
    return history;
  }

  buildGlobal() {
    for (const [key, value] of this.localArrays) {
      this.assembler(value);
    }
    // console.log('Matriz de rigidez global:')
    // tablePrinter(this.k.global, 2)
    return this.k.global;
  }

  buildForces() {
    if (this.settings.isRestrictedAbove) {
      for (const [key, value] of this.dataArray) {
        if (value["isRestricted"]) {
          this.f.restricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `F-${value.userDOF}`;

          this.f.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `F-${value.userDOF}`;
        } else {
          this.f.unrestricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])! -
            this.settings.dofRestricted
          ][0] = value.force as number;

          this.f.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.force as number;
        }
      }
    } else {
      for (const [key, value] of this.dataArray) {
        if (value["isRestricted"]) {
          this.f.restricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])! -
            this.settings.dofUnrestricted
          ][0] = `F-${value.userDOF}`;

          this.f.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `F-${value.userDOF}`;
        } else {
          this.f.unrestricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.force as number;

          this.f.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.force as number;
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
    };
  }

  buildDisplacement() {
    if (this.settings.isRestrictedAbove) {
      for (const [key, value] of this.dataArray) {
        if (value["isRestricted"]) {
          this.u.restricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.displacement as number;

          this.u.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.displacement;
        } else {
          this.u.unrestricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])! -
            this.settings.dofRestricted
          ][0] = `U-${value.userDOF}`;

          this.u.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `U-${value.userDOF}`;
        }
      }
    } else {
      for (const [key, value] of this.dataArray) {
        if (value["isRestricted"]) {
          this.u.restricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])! -
            this.settings.dofUnrestricted
          ][0] = value.displacement as number;

          this.u.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = value.displacement;
        } else {
          this.u.unrestricted[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `U-${value.userDOF}`;

          this.u.global[
            this.utils.dofPointerInDataArray.get(value["internalDOF"])!
          ][0] = `U-${value.userDOF}`;
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
    };
  }

  splitGlobal() {
    const u = this.verticesUtils.unrestrictedDOF;
    const r = this.verticesUtils.restrictedDOF;
    if (this.settings.isRestrictedAbove) {
      // |krr kru|
      // |kur kuu|
      // krr
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
          this.k.krr[i][j] = this.k.global[i][j];
        }
      }
      //kru
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kru[i][j] = this.k.global[i][j + r];
        }
      }
      //kur
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < r; j++) {
          this.k.kur[i][j] = this.k.global[i + r][j];
        }
      }
      //kuu
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kuu[i][j] = this.k.global[i + r][j + r];
        }
      }
    } else {
      // |kuu kur|
      // |kru krr|
      //krr
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
          this.k.krr[i][j] = this.k.global[i + u][j + u];
        }
      }
      //kru
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kru[i][j] = this.k.global[i + u][j];
        }
      }
      //kur
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < r; j++) {
          this.k.kur[i][j] = this.k.global[i][j + u];
        }
      }
      //kuu
      for (let i = 0; i < u; i++) {
        for (let j = 0; j < u; j++) {
          this.k.kuu[i][j] = this.k.global[i][j];
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
    };
  }

  solveDisplacements() {
    try {
      inv(this.k.kuu);
    } catch {
      return {
        ok: false,
        message: "La matriz kuu no tiene inversa, verifica los datos.",
        uuSolved: [],
      };
    }

    this.solved.u.unrestricted = multiply(
      inv(this.k.kuu),
      subtract(this.f.unrestricted, multiply(this.k.kur, this.u.restricted)),
    );

    // console.log('uSolved')
    // tablePrinter(this.solved.u.unrestricted, 4)
    return { uuSolved: this.solved.u.unrestricted, ok: true, message: "" };
  }

  solveForces() {
    this.solved.f.restricted = add(
      multiply(this.k.krr, this.u.restricted),
      multiply(this.k.kru, this.solved.u.unrestricted),
    );
    // console.log('fSolved')
    // tablePrinter(this.solved.f.restricted, 6)
    return this.solved.f.restricted;
  }

  buildNumericFandU() {
    if (this.settings.isRestrictedAbove) {
      this.solved.f.global = [
        ...this.solved.f.restricted,
        ...this.f.unrestricted,
      ];

      this.solved.u.global = [
        ...this.u.restricted,
        ...this.solved.u.unrestricted,
      ];
    } else {
      this.solved.f.global = [
        ...this.f.unrestricted,
        ...this.solved.f.restricted,
      ];

      this.solved.u.global = [
        ...this.solved.u.unrestricted,
        ...this.u.restricted,
      ];
    }

    // console.log('fSolvedGlobal')
    // tablePrinter(this.solved.f.global, 2)
    // console.log('uSolvedGlobal')
    // tablePrinter(this.solved.u.global, 4)
    return {
      f: this.solved.f.global,
      u: this.solved.u.global,
    };
  }

  solveInternalForces() {
    const newMap = new Map<
      string,
      { u_i: number; u_j: number; k: number; internalForce: number }
    >();
    for (const [key, value] of this.dataEdges) {
      const u_i = this.solved.u.global[
        this.utils.dofPointerInDataArray.get(value.DOF.table[0].internal)!
      ][0];
      const u_j = this.solved.u.global[
        this.utils.dofPointerInDataArray.get(value.DOF.table[1].internal)!
      ][0];

      const k = value.k;

      const f_i = k * (u_j - u_i);
      const newObj = { u_i, u_j, k, internalForce: f_i };
      newMap.set(key, newObj);
      // console.log(`Barra:${key}`)
      // console.log(newObj)
    }
    return newMap;
  }
}
