package com.example.demo.PublicacionGrupo.infrastructure;


import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface PublicacionGrupoRepository extends JpaRepository<PublicacionGrupo, Long> {
    List<PublicacionGrupo> findByGrupoId(Integer grupoId);
}
