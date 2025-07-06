package com.example.demo.Comentario.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class ComentarioRequestDTO {
    private String contenido;
    private Long publicacionId;
}
