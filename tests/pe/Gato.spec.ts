import { describe, it, expect } from "vitest";
import { Gato } from '../../src/pe/Gato'

describe("Clase Gato", () => {
    const gato1 = new Gato(2, "nombregato1", 3, 8, "Sano", "corto", "interior")

    it("Getters de Gato", () => {
        expect(gato1.microChip).toBe(2)
        expect(gato1.nombre).toBe("nombregato1")
        expect(gato1.edad).toBe(3)
        expect(gato1.peso).toBe(8)
        expect(gato1.salud).toBe("Sano")
        expect(gato1.pelaje).toBe("corto")
        expect(gato1.ubicacion).toBe("interior")
    })



    it("Ficha de Gato", () => {
        expect(gato1.obtenerFicha()).toBe(`ID Animal: 2\br, 
        Nombre: nombregato1\br, 
        Edad: 3\br, 
        Peso: 8\br, 
        Tipo Pelaje: corto\br,
        Tipo de Ubicacion: interior\br,
        Estado de Salud: Sano`)
    })

    it("Setters de Gato", () => {
        gato1.microChip = 2
        gato1.nombre = "nombregato2"
        gato1.edad = 6
        gato1.peso = 15
        gato1.salud = "Enfermo"
        gato1.pelaje = "largo"
        gato1.ubicacion = "exterior"


        expect(gato1.microChip).toBe(2)
        expect(gato1.nombre).toBe("nombregato2")
        expect(gato1.edad).toBe(6)
        expect(gato1.peso).toBe(15)
        expect(gato1.salud).toBe("Enfermo")
        expect(gato1.pelaje).toBe("largo")
        expect(gato1.ubicacion).toBe("exterior")
    })

})