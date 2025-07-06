package com.example.demo.PublicacionCompartidaEnGrupo.infrastructure;

import com.example.demo.PublicacionCompartidaEnGrupo.domain.PublicacionCompartidaEnGrupo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublicacionCompartidaEnGrupoRepository extends JpaRepository<PublicacionCompartidaEnGrupo, Long> {
    List<PublicacionCompartidaEnGrupo> findByGrupoId(int grupoId);
}