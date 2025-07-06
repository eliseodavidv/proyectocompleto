package com.example.demo.Progreso.Dtos;


import com.example.demo.Progreso.domain.Progreso;
import lombok.Data;

import java.util.Date;

@Data
public class ProgresoDTO {

    private Long id;
    private Double peso;
    private Date fecha;

    public ProgresoDTO(Progreso progreso) {
        this.id = progreso.getId();
        this.peso = progreso.getPeso();
        this.fecha = progreso.getFecha();
    }
}
