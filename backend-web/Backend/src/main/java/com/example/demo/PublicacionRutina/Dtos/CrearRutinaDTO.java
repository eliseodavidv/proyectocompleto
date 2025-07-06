package com.example.demo.PublicacionRutina.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class CrearRutinaDTO {
    private String titulo;
    private String descripcion;
    private String nombreRutina;
    private int duracion;
    private String frecuencia;
    private String dificultad;
    private String objetivo;
    private List<Long> ejercicioIds;
}
