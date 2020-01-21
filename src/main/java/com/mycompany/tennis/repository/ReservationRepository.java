package com.mycompany.tennis.repository;

import com.mycompany.tennis.domain.Reservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
