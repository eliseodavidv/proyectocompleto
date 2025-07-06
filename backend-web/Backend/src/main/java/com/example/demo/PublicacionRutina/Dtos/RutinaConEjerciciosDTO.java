package com.example.demo.PublicacionRutina.Dtos;

import com.example.demo.Ejercicio.Dtos.EjercicioDTO;
import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class RutinaConEjerciciosDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private List<EjercicioDTO> ejercicios;

    public RutinaConEjerciciosDTO(PublicacionRutina rutina) {
        this.id = rutina.getId_publicacion();
        this.titulo = rutina.getTitulo();
        this.descripcion = rutina.getDescripcion();

        this.ejercicios = rutina.getEjercicios()
                .stream()
                .map(EjercicioDTO::new)
                .collect(Collectors.toList());
    }
}
