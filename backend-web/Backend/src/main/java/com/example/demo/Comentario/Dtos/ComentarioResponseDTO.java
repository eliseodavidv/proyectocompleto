package com.example.demo.Comentario.Dtos;

import com.example.demo.Comentario.domain.Comentario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioResponseDTO {
    private Long id;
    private String contenido;
    private LocalDateTime fechaCreacion;
    private String autorUsername;

}
