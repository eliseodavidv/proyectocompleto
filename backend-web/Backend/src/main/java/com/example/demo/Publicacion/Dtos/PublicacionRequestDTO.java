package com.example.demo.Publicacion.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicacionRequestDTO {
    private String titulo;
    private String contenido;
}
