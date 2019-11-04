package com.thina.smartfarm.web.rest;

import com.thina.smartfarm.SmartfarmApp;
import com.thina.smartfarm.domain.PhReading;
import com.thina.smartfarm.repository.PhReadingRepository;
import com.thina.smartfarm.service.PhReadingService;
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
 * Integration tests for the {@link PhReadingResource} REST controller.
 */
@SpringBootTest(classes = SmartfarmApp.class)
public class PhReadingResourceIT {

    private static final Double DEFAULT_PH_READING = 1D;
    private static final Double UPDATED_PH_READING = 2D;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PhReadingRepository phReadingRepository;

    @Autowired
    private PhReadingService phReadingService;

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

    private MockMvc restPhReadingMockMvc;

    private PhReading phReading;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PhReadingResource phReadingResource = new PhReadingResource(phReadingService);
        this.restPhReadingMockMvc = MockMvcBuilders.standaloneSetup(phReadingResource)
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
    public static PhReading createEntity(EntityManager em) {
        PhReading phReading = new PhReading()
            .phReading(DEFAULT_PH_READING)
            .date(DEFAULT_DATE);
        return phReading;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PhReading createUpdatedEntity(EntityManager em) {
        PhReading phReading = new PhReading()
            .phReading(UPDATED_PH_READING)
            .date(UPDATED_DATE);
        return phReading;
    }

    @BeforeEach
    public void initTest() {
        phReading = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhReading() throws Exception {
        int databaseSizeBeforeCreate = phReadingRepository.findAll().size();

        // Create the PhReading
        restPhReadingMockMvc.perform(post("/api/ph-readings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phReading)))
            .andExpect(status().isCreated());

        // Validate the PhReading in the database
        List<PhReading> phReadingList = phReadingRepository.findAll();
        assertThat(phReadingList).hasSize(databaseSizeBeforeCreate + 1);
        PhReading testPhReading = phReadingList.get(phReadingList.size() - 1);
        assertThat(testPhReading.getPhReading()).isEqualTo(DEFAULT_PH_READING);
        assertThat(testPhReading.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createPhReadingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = phReadingRepository.findAll().size();

        // Create the PhReading with an existing ID
        phReading.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhReadingMockMvc.perform(post("/api/ph-readings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phReading)))
            .andExpect(status().isBadRequest());

        // Validate the PhReading in the database
        List<PhReading> phReadingList = phReadingRepository.findAll();
        assertThat(phReadingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPhReadings() throws Exception {
        // Initialize the database
        phReadingRepository.saveAndFlush(phReading);

        // Get all the phReadingList
        restPhReadingMockMvc.perform(get("/api/ph-readings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(phReading.getId().intValue())))
            .andExpect(jsonPath("$.[*].phReading").value(hasItem(DEFAULT_PH_READING.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPhReading() throws Exception {
        // Initialize the database
        phReadingRepository.saveAndFlush(phReading);

        // Get the phReading
        restPhReadingMockMvc.perform(get("/api/ph-readings/{id}", phReading.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(phReading.getId().intValue()))
            .andExpect(jsonPath("$.phReading").value(DEFAULT_PH_READING.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPhReading() throws Exception {
        // Get the phReading
        restPhReadingMockMvc.perform(get("/api/ph-readings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhReading() throws Exception {
        // Initialize the database
        phReadingService.save(phReading);

        int databaseSizeBeforeUpdate = phReadingRepository.findAll().size();

        // Update the phReading
        PhReading updatedPhReading = phReadingRepository.findById(phReading.getId()).get();
        // Disconnect from session so that the updates on updatedPhReading are not directly saved in db
        em.detach(updatedPhReading);
        updatedPhReading
            .phReading(UPDATED_PH_READING)
            .date(UPDATED_DATE);

        restPhReadingMockMvc.perform(put("/api/ph-readings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPhReading)))
            .andExpect(status().isOk());

        // Validate the PhReading in the database
        List<PhReading> phReadingList = phReadingRepository.findAll();
        assertThat(phReadingList).hasSize(databaseSizeBeforeUpdate);
        PhReading testPhReading = phReadingList.get(phReadingList.size() - 1);
        assertThat(testPhReading.getPhReading()).isEqualTo(UPDATED_PH_READING);
        assertThat(testPhReading.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPhReading() throws Exception {
        int databaseSizeBeforeUpdate = phReadingRepository.findAll().size();

        // Create the PhReading

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhReadingMockMvc.perform(put("/api/ph-readings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phReading)))
            .andExpect(status().isBadRequest());

        // Validate the PhReading in the database
        List<PhReading> phReadingList = phReadingRepository.findAll();
        assertThat(phReadingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePhReading() throws Exception {
        // Initialize the database
        phReadingService.save(phReading);

        int databaseSizeBeforeDelete = phReadingRepository.findAll().size();

        // Delete the phReading
        restPhReadingMockMvc.perform(delete("/api/ph-readings/{id}", phReading.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PhReading> phReadingList = phReadingRepository.findAll();
        assertThat(phReadingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PhReading.class);
        PhReading phReading1 = new PhReading();
        phReading1.setId(1L);
        PhReading phReading2 = new PhReading();
        phReading2.setId(phReading1.getId());
        assertThat(phReading1).isEqualTo(phReading2);
        phReading2.setId(2L);
        assertThat(phReading1).isNotEqualTo(phReading2);
        phReading1.setId(null);
        assertThat(phReading1).isNotEqualTo(phReading2);
    }
}
