/**
 * tipo para definir posibles estados de salud de una mascota
 */
export type estadoSalud = "Sano" | "Enfermo"

/**
 * Clase abstracta que define estructura basica de animal mascota
 */
export abstract class Mascota {
    /**
     * 
     * @param _microChip - numero que representa id unico de un animal mascota
     * @param _nombre - string que representa el nombre del animal 
     * @param _edad - numero que representa la edad del animal
     * @param _peso - numero que representa el peso del animal
     * @param _salud - estado de salud del animal definido como un tipo siendo sano o enfermo
     */
    constructor(
        private _microChip: number,
        private _nombre: string,
        private _edad: number,
        private _peso: number,
        private _salud: estadoSalud
    ) {}

    /**
     * getter del numero de microchip
     * @returns numero de id
     */
    get microChip(): number {
        return this._microChip
    }
    
    /**
     * setter del micro chip
     * @param id - numero de id unico 
     */
    set microChip(id: number) {
        this._microChip = id
    }

    /**
     * getter del nombre del animal
     * @returns string del nombre
     */
    get nombre(): string {
        return this._nombre
    }

    /**
     * setter del nombre del animal
     * @param nombre - string del nombre animal
     */
    set nombre(nombre: string){
        this._nombre = nombre
    }

    /**
     * getter de la edad del animal
     * @returns numero de edad
     */
    get edad(): number {
        return this._edad
    }

    /**
     * setter de la edad del animal
     * @param edad - numero de edad 
     */
    set edad(edad: number) {
        this._edad = edad
    }

    /**
     * getter del peso del animal
     * @returns numero del peso
     */
    get peso(): number {
        return this._peso
    }

    /**
     * setter del peso del animal
     * @param peso - numero del peso 
     */
    set peso(peso: number) {
        this._peso = peso
    }

    /**
     * getter de estado de salud del animal
     * @returns estadoSalud siendo sano o enfermo
     */
    get salud(): estadoSalud {
        return this._salud
    }

    /**
     * setter del estado de salud del animal
     * @param estado - estadoSalud del animal sano o enfermo
     */
    set salud(estado: estadoSalud) {
        this._salud = estado
    }

    /**
     * metodo abstracto para obtener la ficha de cada animal
     */
    abstract obtenerFicha(): string
}