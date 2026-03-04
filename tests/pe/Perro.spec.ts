import { describe, it, expect } from "vitest";
import {Perro} from '../../src/pe/Perro'

describe("Clase Perro", () => {
    const perro1 = new Perro(1, "nombreperro1", 5, 10, "Sano", "doberman", "corto", "medio")

    it("Getters de Perro", () => {
        expect(perro1.microChip).toBe(1)
        expect(perro1.nombre).toBe("nombreperro1")
        expect(perro1.edad).toBe(5)
        expect(perro1.peso).toBe(10)
        expect(perro1.salud).toBe("Sano")
        expect(perro1.raza).toBe("doberman")
        expect(perro1.pelaje).toBe("corto")
        expect(perro1.nivActividad).toBe("medio")
    })

        

    it("Ficha de Perro", () => {
        expect(perro1.obtenerFicha()).toBe(`ID Animal: 1\br, 
        Nombre: nombreperro1\br, 
        Edad: 5\br, 
        Peso: 10\br, 
        Raza: doberman\br,
        Tipo Pelaje: corto\br,
        Nivel de Actividad: medio\br,
        Estado de Salud: Sano`)
    })

    it("Setters de Perro", () => {
            perro1.microChip = 2
            perro1.nombre = "nombreperro2"
            perro1.edad = 6
            perro1.peso = 15
            perro1.salud = "Enfermo"
            perro1.raza = "salchicha"
            perro1.pelaje = "largo"
            perro1.nivActividad = "alto"

            
            expect(perro1.microChip).toBe(2)
            expect(perro1.nombre).toBe("nombreperro2")
            expect(perro1.edad).toBe(6)
            expect(perro1.peso).toBe(15)
            expect(perro1.salud).toBe("Enfermo")
            expect(perro1.raza).toBe("salchicha")
            expect(perro1.pelaje).toBe("largo")
            expect(perro1.nivActividad).toBe("alto")
    })

})