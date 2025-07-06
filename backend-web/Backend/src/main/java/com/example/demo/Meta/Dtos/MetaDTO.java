package com.example.demo.Meta.Dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MetaDTO {
    private Long id;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private boolean cumplida;
    private int userId;

    public MetaDTO(Long id, String descripcion, LocalDate fechaInicio, LocalDate fechaFin, boolean cumplida, int userId) {
        this.id = id;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cumplida = cumplida;
        this.userId = userId;
    }
    public MetaDTO() {}
}
