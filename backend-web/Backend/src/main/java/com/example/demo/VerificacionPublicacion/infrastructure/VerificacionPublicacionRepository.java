package com.example.demo.VerificacionPublicacion.infrastructure;

import com.example.demo.VerificacionPublicacion.domain.VerificacionPublicacion;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VerificacionPublicacionRepository extends JpaRepository<VerificacionPublicacion, Long> {
}
