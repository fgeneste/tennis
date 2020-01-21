package com.mycompany.tennis.repository;

import com.mycompany.tennis.domain.Court;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Court entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourtRepository extends JpaRepository<Court, Long> {

}
