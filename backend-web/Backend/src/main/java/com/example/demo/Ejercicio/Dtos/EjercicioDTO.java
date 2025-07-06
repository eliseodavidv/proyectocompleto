package com.example.demo.Ejercicio.Dtos;

import com.example.demo.Ejercicio.domain.Ejercicio;
import lombok.Data;

@Data
public class EjercicioDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private int series;
    private int repeticiones;
    private int descansoSegundos;
    private double pesoKg;
    private String imagenUrl;      // 👈 nuevo campo

    public EjercicioDTO(Ejercicio ejercicio) {
        this.id = ejercicio.getId();
        this.nombre = ejercicio.getNombre();
        this.descripcion = ejercicio.getDescripcion();
        this.series = ejercicio.getSeries();
        this.repeticiones = ejercicio.getRepeticiones();
        this.descansoSegundos = ejercicio.getDescansoSegundos();
        this.pesoKg = ejercicio.getPesoKg();
        this.imagenUrl = ejercicio.getImagenUrl();   // 👈 mapear
    }
}
