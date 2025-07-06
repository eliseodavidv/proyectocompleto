package com.example.demo.Progreso.infrastructure;


import com.example.demo.Progreso.domain.Progreso;
import com.example.demo.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProgresoRepository extends JpaRepository<Progreso, Long> {

    List<Progreso> findAllByUser(User user);

    List<Progreso> findByUserAndFechaBetween(User user, Date fechaAfter, Date fechaBefore);
}
