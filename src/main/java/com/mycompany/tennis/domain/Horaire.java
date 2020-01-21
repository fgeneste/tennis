package com.mycompany.tennis.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Horaire.
 */
@Entity
@Table(name = "horaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Horaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jour")
    private Instant jour;

    @OneToOne
    @JoinColumn(unique = true)
    private Reservation reservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getJour() {
        return jour;
    }

    public Horaire jour(Instant jour) {
        this.jour = jour;
        return this;
    }

    public void setJour(Instant jour) {
        this.jour = jour;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public Horaire reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horaire)) {
            return false;
        }
        return id != null && id.equals(((Horaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Horaire{" +
            "id=" + getId() +
            ", jour='" + getJour() + "'" +
            "}";
    }
}
