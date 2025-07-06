package com.example.demo.Meta.infrastructure;

import com.example.demo.Meta.domain.Meta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetaRepository extends JpaRepository<Meta, Long> {
    List<Meta> findByUserId(int userId);
}
