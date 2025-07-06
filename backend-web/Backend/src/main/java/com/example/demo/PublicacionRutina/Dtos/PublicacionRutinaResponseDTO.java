package com.example.demo.PublicacionRutina.Dtos;
import com.example.demo.Ejercicio.Dtos.EjercicioDTO;
import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class PublicacionRutinaResponseDTO {
    private Long id_publicacion;
    private String titulo;
    private String descripcion;
    private String nombreRutina;
    private int duracion;
    private String frecuencia;
    private String nivel;
    private String objetivo;
    private Integer userId;  // Solo se incluye el ID del usuario
    private Set<EjercicioDTO> ejercicios;

    public PublicacionRutinaResponseDTO(PublicacionRutina rutina) {
        this.id_publicacion = rutina.getId_publicacion();
        this.titulo = rutina.getTitulo();
        this.descripcion = rutina.getDescripcion();
        this.nombreRutina = rutina.getNombreRutina();
        this.duracion = rutina.getDuracion();
        this.frecuencia = rutina.getFrecuencia();
        this.nivel = rutina.getDificultad();
        this.objetivo = rutina.getObjetivo();
        this.userId = rutina.getUser().getId();

        this.ejercicios = rutina.getEjercicios().stream()
                .map(ejercicio -> new EjercicioDTO(ejercicio))
                .collect(Collectors.toSet());
    }
}
