package com.example.demo.PublicacionGrupo.domain;


import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.infrastructure.GrupoRepository;
import com.example.demo.PublicacionGrupo.infrastructure.PublicacionGrupoRepository;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicacionGrupoService {

    private final PublicacionGrupoRepository publicacionGrupoRepository;
    private final GrupoRepository grupoRepository;
    private final UserRepository<User> userRepository;

    public void crearPublicacionEnGrupo(String titulo, String contenido, int userId, int grupoId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        PublicacionGrupo publicacionGrupo = new PublicacionGrupo();
        publicacionGrupo.setTitulo(titulo);
        publicacionGrupo.setContenido(contenido);
        publicacionGrupo.setFechaCreacion(LocalDateTime.now());
        publicacionGrupo.setUser(user);
        publicacionGrupo.setGrupo(grupo);

        publicacionGrupoRepository.save(publicacionGrupo);
    }

    public List<PublicacionGrupoDTO> obtenerPublicacionesDTOPorGrupoId(int grupoId) {
        return publicacionGrupoRepository.findByGrupoId(grupoId).stream()
                .map(PublicacionGrupoDTO::new)
                .toList();
    }

}
