package com.mycompany.tennis.web.rest;

import com.mycompany.tennis.domain.Court;
import com.mycompany.tennis.repository.CourtRepository;
import com.mycompany.tennis.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.tennis.domain.Court}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CourtResource {

    private final Logger log = LoggerFactory.getLogger(CourtResource.class);

    private static final String ENTITY_NAME = "court";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourtRepository courtRepository;

    public CourtResource(CourtRepository courtRepository) {
        this.courtRepository = courtRepository;
    }

    /**
     * {@code POST  /courts} : Create a new court.
     *
     * @param court the court to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new court, or with status {@code 400 (Bad Request)} if the court has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/courts")
    public ResponseEntity<Court> createCourt(@RequestBody Court court) throws URISyntaxException {
        log.debug("REST request to save Court : {}", court);
        if (court.getId() != null) {
            throw new BadRequestAlertException("A new court cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Court result = courtRepository.save(court);
        return ResponseEntity.created(new URI("/api/courts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /courts} : Updates an existing court.
     *
     * @param court the court to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated court,
     * or with status {@code 400 (Bad Request)} if the court is not valid,
     * or with status {@code 500 (Internal Server Error)} if the court couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/courts")
    public ResponseEntity<Court> updateCourt(@RequestBody Court court) throws URISyntaxException {
        log.debug("REST request to update Court : {}", court);
        if (court.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Court result = courtRepository.save(court);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, court.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /courts} : get all the courts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courts in body.
     */
    @GetMapping("/courts")
    public List<Court> getAllCourts() {
        log.debug("REST request to get all Courts");
        return courtRepository.findAll();
    }

    /**
     * {@code GET  /courts/:id} : get the "id" court.
     *
     * @param id the id of the court to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the court, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/courts/{id}")
    public ResponseEntity<Court> getCourt(@PathVariable Long id) {
        log.debug("REST request to get Court : {}", id);
        Optional<Court> court = courtRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(court);
    }

    /**
     * {@code DELETE  /courts/:id} : delete the "id" court.
     *
     * @param id the id of the court to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/courts/{id}")
    public ResponseEntity<Void> deleteCourt(@PathVariable Long id) {
        log.debug("REST request to delete Court : {}", id);
        courtRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
