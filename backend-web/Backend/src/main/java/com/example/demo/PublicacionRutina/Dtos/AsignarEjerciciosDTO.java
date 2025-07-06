package com.example.demo.PublicacionRutina.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class AsignarEjerciciosDTO {
    private Long rutinaId;
    private List<Long> ejerciciosIds;
}
