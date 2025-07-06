package com.example.demo.Grupo.domain;

import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private TipoGrupo tipo; // PUBLICO o PRIVADO

    @ManyToMany
    @JoinTable(
            name = "grupo_usuarios",
            joinColumns = @JoinColumn(name = "grupo_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<User> miembros = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "administrador_id")
    private User administrador;

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PublicacionGrupo> publicaciones;

    private LocalDateTime fechaCreacion = LocalDateTime.now();

}
