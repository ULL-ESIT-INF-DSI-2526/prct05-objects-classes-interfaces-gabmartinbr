import { Mascota, estadoSalud } from "./Mascota";

export type tipoUbicacion = "interior" | "exterior"
export type tiposPelaje = "largo" | "corto"

export class Gato extends Mascota {
    constructor(
        _microChip: number,
        _nombre: string,
        _edad: number,
        _peso: number,
        _salud: estadoSalud,
        private _pelaje: tiposPelaje,
        private _ubicacion: tipoUbicacion
    ) {
        super(_microChip, _nombre, _edad, _peso, _salud)
    }


    /**
     * getter del tipo de pelaje del perro
     * @returns tipo de pelaje corto o largo
     */
    get pelaje(): tiposPelaje {
        return this._pelaje
    }

    /**
     * setter del tipo de pelaje
     * @param pelaje - tipo de pelaje
     */
    set pelaje(pelaje: tiposPelaje) {
        this._pelaje = pelaje
    }

    get ubicacion(): tipoUbicacion {
        return this._ubicacion
    }

    set ubicacion(ubicacion: tipoUbicacion) {
        this._ubicacion = ubicacion
    }

    /**
     * metodo que devuelve la ficha del perro con su informacion
     * @returns string con los atributos del perro
     */
    obtenerFicha(): string {
        return `ID Animal: ${this.microChip}\br, 
        Nombre: ${this.nombre}\br, 
        Edad: ${this.edad}\br, 
        Peso: ${this.peso}\br, 
        Tipo Pelaje: ${this.pelaje}\br,
        Tipo de Ubicacion: ${this.ubicacion}\br,
        Estado de Salud: ${this.salud}`
    }
}