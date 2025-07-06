package com.example.demo.Publicacion.Dtos;

import lombok.Data;

@Data
public class PublicacionDTO {
    private String contenido;
    private int autorId;
    private int grupoId;
    private String titulo;
}
