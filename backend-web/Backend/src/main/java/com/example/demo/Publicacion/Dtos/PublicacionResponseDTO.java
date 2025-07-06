package com.example.demo.Publicacion.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicacionResponseDTO {
    private Long id;
    private String titulo;
    private String contenido;
    private LocalDateTime fechaCreacion;
    private String autor;
    private boolean verificada;
}
