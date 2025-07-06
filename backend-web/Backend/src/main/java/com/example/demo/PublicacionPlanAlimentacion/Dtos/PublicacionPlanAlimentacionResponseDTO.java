package com.example.demo.PublicacionPlanAlimentacion.Dtos;

import com.example.demo.PublicacionPlanAlimentacion.domain.PublicacionPlanAlimentacion;
import lombok.Data;

@Data
public class PublicacionPlanAlimentacionResponseDTO {
    private Long id_publicacion;
    private String titulo;
    private String contenido;
    private String tipoDieta;
    private int calorias;
    private String objetivos;
    private String restricciones;

    public PublicacionPlanAlimentacionResponseDTO(PublicacionPlanAlimentacion plan) {
        this.id_publicacion = plan.getId_publicacion();
        this.titulo = plan.getTitulo();
        this.contenido = plan.getContenido();
        this.tipoDieta = plan.getTipoDieta();
        this.calorias = plan.getCalorias();
        this.objetivos = plan.getObjetivos();
        this.restricciones = plan.getRestricciones();
    }
}
