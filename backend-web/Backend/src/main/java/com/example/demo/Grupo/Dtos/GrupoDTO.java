package com.example.demo.Grupo.Dtos;

import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.domain.TipoGrupo;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import com.example.demo.user.Dtos.UserDTO;
import com.example.demo.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrupoDTO {
    private int id;
    private String nombre;
    private String descripcion;
    private TipoGrupo tipo;
    private List<UserDTO> miembros;
    private UserDTO administrador;
    private List<PublicacionGrupo> publicaciones;
    private LocalDateTime fechaCreacion;

    public GrupoDTO(Grupo grupo) {
        this.id = grupo.getId();
        this.nombre = grupo.getNombre();
        this.descripcion = grupo.getDescripcion();
        this.tipo = grupo.getTipo();
        this.fechaCreacion = grupo.getFechaCreacion();

        // Convertir miembros a DTO
        if (grupo.getMiembros() != null) {
            this.miembros = grupo.getMiembros().stream()
                    .map(UserDTO::new)
                    .collect(Collectors.toList());
        }

        // Convertir administrador a DTO
        if (grupo.getAdministrador() != null) {
            this.administrador = new UserDTO(grupo.getAdministrador());
        }

    }

}
