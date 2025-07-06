package com.example.demo.PublicacionPlanAlimentacion.infrastructure;

import com.example.demo.PublicacionPlanAlimentacion.domain.PublicacionPlanAlimentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicacionPlanAlimentacionRepository extends JpaRepository<PublicacionPlanAlimentacion, Long> {
}
