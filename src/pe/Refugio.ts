import { Gato } from "./Gato"
import { Mascota } from "./Mascota"
import { Perro } from "./Perro"

export type ingreso = [Mascota, horaEntrada: string, horaSalida: string | undefined]

export class Refugio {
    private _refugioGatos: Gato[] = []
    private _refugioPerros: Perro[] = []
    private _fechasIngreso: ingreso[] = []
    private _numGatos: number = 0
    private _numPerros: number = 0

    /**
     * 
     * @param _maxGatos - numero maximo de gatos en el refugio
     * @param _maxPerros - numero maximo de perros en el refugio
     */
    constructor(private _maxGatos: number, private _maxPerros: number) {}

    /**
     * getter de los gatos en el refugio
     * @returns array de gatos
     */
    get refugioGatos(): Gato[] {
        return this._refugioGatos
    }
    
    /**
     * getter de la maxima capacidad de gatos del refugio
     * @returns numero maximo de gatos
     */
    get maxGatos(): number {
        return this._maxGatos
    }

    /**
     * getter de los perros en el refugio
     * @returns array de perros
     */
    get refugioPerros(): Perro[] {
        return this._refugioPerros
    }

    /**
     * getter de la maxima capacidad de gatos del refugio
     * @returns numero maximo de gatos
     */
    get maxPerros(): number {
        return this._maxPerros
    }

    /**
     * metodo para añadir un gato al refugio y guardar su fecha de entrada
     * @param gato - gato a añadir añ refugio solo si hay espacio
     */
    addGato(gato: Gato): void {
        if(this._numGatos == this._maxGatos) {
            console.warn("No caben mas gatos en el refugio")
        } else {
            this._refugioGatos.push(gato)
            this._numGatos++
            const fechaActual = new Date()
            const año = fechaActual.getFullYear.toString()
            const hora =  fechaActual.getHours()
            const min = fechaActual.getMinutes()
            const sec = fechaActual.getSeconds()
            const horaEntera: string = año + hora + ":" + min + ":" + sec
            this._fechasIngreso.push([gato, horaEntera, undefined])
            this._numGatos++
        }
    }


    /**
     * metodo para añadir un perro al refugio y guardar su fecha de entrada
     * @param perro - perro a añadir al refugio solo si hay espacio
     */
    addPerro(perro: Perro): void {
        if(this._numPerros < this.maxPerros) {
            this._refugioPerros.push(perro)
            const fechaActual = new Date()
            const año = fechaActual.getFullYear.toString()
            const hora =  fechaActual.getHours()
            const min = fechaActual.getMinutes()
            const sec = fechaActual.getSeconds()
            const horaEntera: string = año + hora + ":" + min + ":" + sec
            this._fechasIngreso.push([perro, horaEntera, undefined])
            this._numPerros++
        } else {            
            console.warn("No caben mas perros en el refugio")

        }
    }

    adoptGato(gatoID: number): void {

        if(this.refugioGatos.some((ingresado) => ingresado.microChip === gatoID)) {
            this._numGatos--
            this._fechasIngreso
        }
    }

}