package com.mycompany.tennis.web.rest;

import com.mycompany.tennis.TennisApp;
import com.mycompany.tennis.domain.Court;
import com.mycompany.tennis.repository.CourtRepository;
import com.mycompany.tennis.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.tennis.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.tennis.domain.enumeration.Terrain;
/**
 * Integration tests for the {@link CourtResource} REST controller.
 */
@SpringBootTest(classes = TennisApp.class)
public class CourtResourceIT {

    private static final Terrain DEFAULT_NUMERO = Terrain.TROIS;
    private static final Terrain UPDATED_NUMERO = Terrain.QUATRE;

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCourtMockMvc;

    private Court court;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourtResource courtResource = new CourtResource(courtRepository);
        this.restCourtMockMvc = MockMvcBuilders.standaloneSetup(courtResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Court createEntity(EntityManager em) {
        Court court = new Court()
            .numero(DEFAULT_NUMERO);
        return court;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Court createUpdatedEntity(EntityManager em) {
        Court court = new Court()
            .numero(UPDATED_NUMERO);
        return court;
    }

    @BeforeEach
    public void initTest() {
        court = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourt() throws Exception {
        int databaseSizeBeforeCreate = courtRepository.findAll().size();

        // Create the Court
        restCourtMockMvc.perform(post("/api/courts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(court)))
            .andExpect(status().isCreated());

        // Validate the Court in the database
        List<Court> courtList = courtRepository.findAll();
        assertThat(courtList).hasSize(databaseSizeBeforeCreate + 1);
        Court testCourt = courtList.get(courtList.size() - 1);
        assertThat(testCourt.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    public void createCourtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courtRepository.findAll().size();

        // Create the Court with an existing ID
        court.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourtMockMvc.perform(post("/api/courts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(court)))
            .andExpect(status().isBadRequest());

        // Validate the Court in the database
        List<Court> courtList = courtRepository.findAll();
        assertThat(courtList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCourts() throws Exception {
        // Initialize the database
        courtRepository.saveAndFlush(court);

        // Get all the courtList
        restCourtMockMvc.perform(get("/api/courts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(court.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())));
    }
    
    @Test
    @Transactional
    public void getCourt() throws Exception {
        // Initialize the database
        courtRepository.saveAndFlush(court);

        // Get the court
        restCourtMockMvc.perform(get("/api/courts/{id}", court.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(court.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourt() throws Exception {
        // Get the court
        restCourtMockMvc.perform(get("/api/courts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourt() throws Exception {
        // Initialize the database
        courtRepository.saveAndFlush(court);

        int databaseSizeBeforeUpdate = courtRepository.findAll().size();

        // Update the court
        Court updatedCourt = courtRepository.findById(court.getId()).get();
        // Disconnect from session so that the updates on updatedCourt are not directly saved in db
        em.detach(updatedCourt);
        updatedCourt
            .numero(UPDATED_NUMERO);

        restCourtMockMvc.perform(put("/api/courts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourt)))
            .andExpect(status().isOk());

        // Validate the Court in the database
        List<Court> courtList = courtRepository.findAll();
        assertThat(courtList).hasSize(databaseSizeBeforeUpdate);
        Court testCourt = courtList.get(courtList.size() - 1);
        assertThat(testCourt.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void updateNonExistingCourt() throws Exception {
        int databaseSizeBeforeUpdate = courtRepository.findAll().size();

        // Create the Court

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourtMockMvc.perform(put("/api/courts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(court)))
            .andExpect(status().isBadRequest());

        // Validate the Court in the database
        List<Court> courtList = courtRepository.findAll();
        assertThat(courtList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourt() throws Exception {
        // Initialize the database
        courtRepository.saveAndFlush(court);

        int databaseSizeBeforeDelete = courtRepository.findAll().size();

        // Delete the court
        restCourtMockMvc.perform(delete("/api/courts/{id}", court.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Court> courtList = courtRepository.findAll();
        assertThat(courtList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
