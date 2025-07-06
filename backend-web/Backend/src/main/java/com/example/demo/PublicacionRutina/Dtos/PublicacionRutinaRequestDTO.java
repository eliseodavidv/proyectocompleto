package com.example.demo.PublicacionRutina.Dtos;

import lombok.Data;

@Data
public class PublicacionRutinaRequestDTO {
    private String titulo;
    private String contenido;
    private String nombreRutina;
    private int duracion;
    private String frecuencia;
    private String dificultad;
    private Integer userId;
}
