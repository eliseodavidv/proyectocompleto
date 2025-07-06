package com.example.demo.Grupo.infrastructure;

import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.domain.TipoGrupo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrupoRepository extends JpaRepository<Grupo, Integer> {

    List<Grupo> findByTipo(TipoGrupo tipo); // sin Grupo.
    boolean existsByNombre(String nombre);
    List<Grupo> findByMiembros_Id(Integer userId);

}
