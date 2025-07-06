package com.example.demo.PublicacionProgreso.Dtos;

import com.example.demo.Progreso.Dtos.ProgresoDTO;
import com.example.demo.PublicacionProgreso.domain.PublicacionProgreso;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PublicacionProgresoDTO {
    private Long id;
    private Date fechaInicio;
    private Date fechaFin;
    private Double promedioPeso;
    private List<ProgresoDTO> progresos;

    public PublicacionProgresoDTO(PublicacionProgreso pub) {
        this.fechaInicio = pub.getFechaInicio();
        this.fechaFin = pub.getFechaFin();
        this.promedioPeso = pub.getPromedioPeso();
        this.progresos = pub.getProgresos().stream().map(ProgresoDTO::new).collect(Collectors.toList());
    }
}
