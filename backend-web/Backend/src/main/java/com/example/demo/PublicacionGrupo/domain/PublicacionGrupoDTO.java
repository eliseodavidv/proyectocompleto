package com.example.demo.PublicacionGrupo.domain;import lombok.Data;


@Data
public class PublicacionGrupoDTO {
    private Long id;
    private String titulo;
    private String contenido;


    public PublicacionGrupoDTO(PublicacionGrupo pub) {
        this.id = pub.getId_publicacion();
        this.titulo = pub.getTitulo();
        this.contenido = pub.getContenido();
    }
}
