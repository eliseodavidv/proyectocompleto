package com.example.demo.Especialistas.infrastructure;


import com.example.demo.Especialistas.domain.Especialistas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EspecialistaRepository extends JpaRepository<Especialistas, Integer> {
}
