package com.mycompany.tennis.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.mycompany.tennis.domain.enumeration.Terrain;

/**
 * A Court.
 */
@Entity
@Table(name = "court")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Court implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "numero")
    private Terrain numero;

    @ManyToOne
    @JsonIgnoreProperties("courts")
    private Court reservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Terrain getNumero() {
        return numero;
    }

    public Court numero(Terrain numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Terrain numero) {
        this.numero = numero;
    }

    public Court getReservation() {
        return reservation;
    }

    public Court reservation(Court court) {
        this.reservation = court;
        return this;
    }

    public void setReservation(Court court) {
        this.reservation = court;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Court)) {
            return false;
        }
        return id != null && id.equals(((Court) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Court{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            "}";
    }
}
