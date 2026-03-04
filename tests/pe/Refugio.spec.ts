import { describe, it, expect } from "vitest";
import {Perro} from '../../src/pe/Perro'
import {Gato} from '../../src/pe/Gato'
import {Refugio} from '../../src/pe/Refugio'

describe("Clase Refugio", () => {
    const refugio = new Refugio(1, 2)
    const perro1 = new Perro(1, "nombreperro1", 5, 10, "Sano", "doberman", "corto", "medio")
    const perro2 = new Perro(2, "nombreperro2", 3, 16, "Sano", "salchicha", "largo", "alto")
    const perro3 = new Perro(3, "nombreperro3", 4, 11, "Sano", "golden", "largo", "alto")

    it("Añadir perro, solo deberia dejar 2 perros", () => {
        refugio.addPerro(perro1)
        expect(refugio.refugioPerros.length).toBe(1)
        refugio.addPerro(perro2)
        expect(refugio.refugioPerros.length).toBe(2)
        refugio.addPerro(perro3)
        expect(refugio.refugioPerros.length).toBe(2)

    })
})
