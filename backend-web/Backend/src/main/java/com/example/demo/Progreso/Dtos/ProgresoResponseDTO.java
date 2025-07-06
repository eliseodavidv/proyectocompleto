package com.example.demo.Progreso.Dtos;

import com.example.demo.Progreso.domain.Progreso;
import lombok.Data;

import java.util.Date;

@Data
public class ProgresoResponseDTO {
    private Long id;
    private Double peso;
    private Date fecha;

    public ProgresoResponseDTO(Progreso progreso) {
        this.id = progreso.getId();
        this.peso = progreso.getPeso();
        this.fecha = progreso.getFecha();
    }
}
