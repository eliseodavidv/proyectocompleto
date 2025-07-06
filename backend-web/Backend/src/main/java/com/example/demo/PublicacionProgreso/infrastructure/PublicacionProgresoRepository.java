package com.example.demo.PublicacionProgreso.infrastructure;

import com.example.demo.PublicacionProgreso.domain.PublicacionProgreso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicacionProgresoRepository extends JpaRepository<PublicacionProgreso, Long> {

}
