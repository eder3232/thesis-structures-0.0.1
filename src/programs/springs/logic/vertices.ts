
export interface IVertex {
    force: number
    displacement: number
    isRestricted: boolean
    id: string
    DOF: {
        x: { internal: number, user: number }
    }
}

interface IInputVertex {
    force: number
    displacement: number
    isRestricted: boolean
    id: string
    userDOF: { x: number }
}

export interface IVerticesUtils {
    axisCoordinates: ReadonlyArray<'x'>
    axisDOF: ReadonlyArray<'x'>
    restrictedDOF: number
    unrestrictedDOF: number
    totalDOF: number
}

export interface IVerticesGetData {
    data: Map<string, IVertex>
    utils: IVerticesUtils
}

export class Vertices {
    data = new Map<string, IVertex>()
    utils: IVerticesUtils = {
        axisCoordinates: ['x'],
        axisDOF: ['x'],
        restrictedDOF: 0,
        unrestrictedDOF: 0,
        totalDOF: 0
    }

    add({ force, displacement, id, isRestricted, userDOF }: IInputVertex): void {

        // Verificar si el nudo existe
        if (this.data.has(id)) {
            throw new Error(`El nudo ${id} ya existe.`)
        }

        for (const a of this.utils.axisDOF) {
            if (isRestricted === true && force !== 0) {
                throw new Error(`El nudo ${id} no puede tener fuerza aplicada porque está restringido.`)
            }
            if (isRestricted === false && displacement !== 0) {
                throw new Error(`El nudo ${id} no puede tener desplazamiento porque no está restringido.`)
            }
        }

        const DOF: { x: { internal: number, user: number } } = {
            x: { internal: 0, user: userDOF.x }
        }

        this.utils.totalDOF++

        const enumerator = this.data.size * 1

        for (const [index, element] of this.utils.axisDOF.entries()) {
            DOF[element]['internal'] = enumerator + index
        }

        if (isRestricted) {
            this.utils.restrictedDOF++
            //Un nudo restringido no puede tener una fuerza aplicada
            if (force !== 0) {
                throw new Error(`El nudo ${id} no puede tener fuerza aplicada.`)
            }
            this.data.set(id, { force: 0, displacement, id, isRestricted: true, DOF })
        } else {
            //Un nudo no restringido no puede tener desplazamiento
            this.utils.unrestrictedDOF++
            if (displacement !== 0) {
                throw new Error(`El nudo ${id} no puede tener desplazamiento.`)
            }
            this.data.set(id, { force, displacement: 0, id, isRestricted: false, DOF })
        }


    }
    getData(): IVerticesGetData {
        return { data: this.data, utils: this.utils }
    }
}
