package com.example.demo.PublicacionCompartidaEnGrupo.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PublicacionCompartidaDTO {
    private int grupoId;
    private String grupoNombre;

    private int publicacionId;
    private String publicacionTitulo;
    private String publicacionContenido;
    private String autor;

    private LocalDateTime fechaCompartida;

    public PublicacionCompartidaDTO(PublicacionCompartidaEnGrupo entidad) {
        this.grupoId = entidad.getGrupo().getId();
        this.grupoNombre = entidad.getGrupo().getNombre();

        this.publicacionId = Math.toIntExact(entidad.getPublicacionOriginal().getId_publicacion());
        this.publicacionTitulo = entidad.getPublicacionOriginal().getTitulo();
        this.publicacionContenido = entidad.getPublicacionOriginal().getContenido();
        this.autor = entidad.getPublicacionOriginal().getUser().getName();
        this.fechaCompartida = entidad.getFechaCompartida();
    }
}
