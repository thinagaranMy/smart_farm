package com.thina.smartfarm.web.rest;

import com.thina.smartfarm.SmartfarmApp;
import com.thina.smartfarm.domain.Plantation;
import com.thina.smartfarm.repository.PlantationRepository;
import com.thina.smartfarm.service.PlantationService;
import com.thina.smartfarm.web.rest.errors.ExceptionTranslator;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.thina.smartfarm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlantationResource} REST controller.
 */
@SpringBootTest(classes = SmartfarmApp.class)
public class PlantationResourceIT {

    private static final Instant DEFAULT_PLANT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PLANT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PlantationRepository plantationRepository;

    @Autowired
    private PlantationService plantationService;

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

    private MockMvc restPlantationMockMvc;

    private Plantation plantation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlantationResource plantationResource = new PlantationResource(plantationService);
        this.restPlantationMockMvc = MockMvcBuilders.standaloneSetup(plantationResource)
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
    public static Plantation createEntity(EntityManager em) {
        Plantation plantation = new Plantation()
            .plantDate(DEFAULT_PLANT_DATE)
            .endDate(DEFAULT_END_DATE);
        return plantation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plantation createUpdatedEntity(EntityManager em) {
        Plantation plantation = new Plantation()
            .plantDate(UPDATED_PLANT_DATE)
            .endDate(UPDATED_END_DATE);
        return plantation;
    }

    @BeforeEach
    public void initTest() {
        plantation = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlantation() throws Exception {
        int databaseSizeBeforeCreate = plantationRepository.findAll().size();

        // Create the Plantation
        restPlantationMockMvc.perform(post("/api/plantations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantation)))
            .andExpect(status().isCreated());

        // Validate the Plantation in the database
        List<Plantation> plantationList = plantationRepository.findAll();
        assertThat(plantationList).hasSize(databaseSizeBeforeCreate + 1);
        Plantation testPlantation = plantationList.get(plantationList.size() - 1);
        assertThat(testPlantation.getPlantDate()).isEqualTo(DEFAULT_PLANT_DATE);
        assertThat(testPlantation.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createPlantationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantationRepository.findAll().size();

        // Create the Plantation with an existing ID
        plantation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantationMockMvc.perform(post("/api/plantations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantation)))
            .andExpect(status().isBadRequest());

        // Validate the Plantation in the database
        List<Plantation> plantationList = plantationRepository.findAll();
        assertThat(plantationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlantations() throws Exception {
        // Initialize the database
        plantationRepository.saveAndFlush(plantation);

        // Get all the plantationList
        restPlantationMockMvc.perform(get("/api/plantations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantation.getId().intValue())))
            .andExpect(jsonPath("$.[*].plantDate").value(hasItem(DEFAULT_PLANT_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlantation() throws Exception {
        // Initialize the database
        plantationRepository.saveAndFlush(plantation);

        // Get the plantation
        restPlantationMockMvc.perform(get("/api/plantations/{id}", plantation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plantation.getId().intValue()))
            .andExpect(jsonPath("$.plantDate").value(DEFAULT_PLANT_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlantation() throws Exception {
        // Get the plantation
        restPlantationMockMvc.perform(get("/api/plantations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlantation() throws Exception {
        // Initialize the database
        plantationService.save(plantation);

        int databaseSizeBeforeUpdate = plantationRepository.findAll().size();

        // Update the plantation
        Plantation updatedPlantation = plantationRepository.findById(plantation.getId()).get();
        // Disconnect from session so that the updates on updatedPlantation are not directly saved in db
        em.detach(updatedPlantation);
        updatedPlantation
            .plantDate(UPDATED_PLANT_DATE)
            .endDate(UPDATED_END_DATE);

        restPlantationMockMvc.perform(put("/api/plantations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlantation)))
            .andExpect(status().isOk());

        // Validate the Plantation in the database
        List<Plantation> plantationList = plantationRepository.findAll();
        assertThat(plantationList).hasSize(databaseSizeBeforeUpdate);
        Plantation testPlantation = plantationList.get(plantationList.size() - 1);
        assertThat(testPlantation.getPlantDate()).isEqualTo(UPDATED_PLANT_DATE);
        assertThat(testPlantation.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlantation() throws Exception {
        int databaseSizeBeforeUpdate = plantationRepository.findAll().size();

        // Create the Plantation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantationMockMvc.perform(put("/api/plantations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plantation)))
            .andExpect(status().isBadRequest());

        // Validate the Plantation in the database
        List<Plantation> plantationList = plantationRepository.findAll();
        assertThat(plantationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlantation() throws Exception {
        // Initialize the database
        plantationService.save(plantation);

        int databaseSizeBeforeDelete = plantationRepository.findAll().size();

        // Delete the plantation
        restPlantationMockMvc.perform(delete("/api/plantations/{id}", plantation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plantation> plantationList = plantationRepository.findAll();
        assertThat(plantationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plantation.class);
        Plantation plantation1 = new Plantation();
        plantation1.setId(1L);
        Plantation plantation2 = new Plantation();
        plantation2.setId(plantation1.getId());
        assertThat(plantation1).isEqualTo(plantation2);
        plantation2.setId(2L);
        assertThat(plantation1).isNotEqualTo(plantation2);
        plantation1.setId(null);
        assertThat(plantation1).isNotEqualTo(plantation2);
    }
}
