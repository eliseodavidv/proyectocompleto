package com.example.demo.PublicacionCompartidaEnGrupo.domain;


import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.infrastructure.GrupoRepository;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.Publicacion.infrastructure.PublicacionRepository;
import com.example.demo.PublicacionCompartidaEnGrupo.infrastructure.PublicacionCompartidaEnGrupoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicacionCompartidaEnGrupoService {
    private final PublicacionRepository publicacionRepository;
    private final GrupoRepository grupoRepository;
    private final PublicacionCompartidaEnGrupoRepository compartidaRepository;

    @Transactional
    public void compartirPublicacionConGrupo(Integer publicacionId, int grupoId) {
        Publicacion publicacion = publicacionRepository.findById(publicacionId)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        PublicacionCompartidaEnGrupo compartida = new PublicacionCompartidaEnGrupo();
        compartida.setGrupo(grupo);
        compartida.setPublicacionOriginal(publicacion);
        compartida.setFechaCompartida(LocalDateTime.now());

        compartidaRepository.save(compartida);
    }

    public List<PublicacionCompartidaDTO> obtenerPorGrupoDTO(int grupoId) {
        return compartidaRepository.findByGrupoId(grupoId)
                .stream()
                .map(PublicacionCompartidaDTO::new)
                .toList();
    }

}
