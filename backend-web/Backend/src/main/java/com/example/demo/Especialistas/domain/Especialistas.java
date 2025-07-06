package com.example.demo.Especialistas.domain;

import com.example.demo.user.domain.User;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Especialistas extends User {
    private String especialidad;
    private String certificadoUrl;
    private String descripcion;
}
