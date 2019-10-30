package com.smart.farm.web.rest;

import com.smart.farm.SmartFarmSolutionApp;
import com.smart.farm.domain.WaterConsumption;
import com.smart.farm.repository.WaterConsumptionRepository;
import com.smart.farm.service.WaterConsumptionService;
import com.smart.farm.web.rest.errors.ExceptionTranslator;

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

import static com.smart.farm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link WaterConsumptionResource} REST controller.
 */
@SpringBootTest(classes = SmartFarmSolutionApp.class)
public class WaterConsumptionResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_MILLIMITERS = 1D;
    private static final Double UPDATED_MILLIMITERS = 2D;

    @Autowired
    private WaterConsumptionRepository waterConsumptionRepository;

    @Autowired
    private WaterConsumptionService waterConsumptionService;

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

    private MockMvc restWaterConsumptionMockMvc;

    private WaterConsumption waterConsumption;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WaterConsumptionResource waterConsumptionResource = new WaterConsumptionResource(waterConsumptionService);
        this.restWaterConsumptionMockMvc = MockMvcBuilders.standaloneSetup(waterConsumptionResource)
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
    public static WaterConsumption createEntity(EntityManager em) {
        WaterConsumption waterConsumption = new WaterConsumption()
            .date(DEFAULT_DATE)
            .millimiters(DEFAULT_MILLIMITERS);
        return waterConsumption;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WaterConsumption createUpdatedEntity(EntityManager em) {
        WaterConsumption waterConsumption = new WaterConsumption()
            .date(UPDATED_DATE)
            .millimiters(UPDATED_MILLIMITERS);
        return waterConsumption;
    }

    @BeforeEach
    public void initTest() {
        waterConsumption = createEntity(em);
    }

    @Test
    @Transactional
    public void createWaterConsumption() throws Exception {
        int databaseSizeBeforeCreate = waterConsumptionRepository.findAll().size();

        // Create the WaterConsumption
        restWaterConsumptionMockMvc.perform(post("/api/water-consumptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterConsumption)))
            .andExpect(status().isCreated());

        // Validate the WaterConsumption in the database
        List<WaterConsumption> waterConsumptionList = waterConsumptionRepository.findAll();
        assertThat(waterConsumptionList).hasSize(databaseSizeBeforeCreate + 1);
        WaterConsumption testWaterConsumption = waterConsumptionList.get(waterConsumptionList.size() - 1);
        assertThat(testWaterConsumption.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testWaterConsumption.getMillimiters()).isEqualTo(DEFAULT_MILLIMITERS);
    }

    @Test
    @Transactional
    public void createWaterConsumptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = waterConsumptionRepository.findAll().size();

        // Create the WaterConsumption with an existing ID
        waterConsumption.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWaterConsumptionMockMvc.perform(post("/api/water-consumptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterConsumption)))
            .andExpect(status().isBadRequest());

        // Validate the WaterConsumption in the database
        List<WaterConsumption> waterConsumptionList = waterConsumptionRepository.findAll();
        assertThat(waterConsumptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWaterConsumptions() throws Exception {
        // Initialize the database
        waterConsumptionRepository.saveAndFlush(waterConsumption);

        // Get all the waterConsumptionList
        restWaterConsumptionMockMvc.perform(get("/api/water-consumptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waterConsumption.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].millimiters").value(hasItem(DEFAULT_MILLIMITERS.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getWaterConsumption() throws Exception {
        // Initialize the database
        waterConsumptionRepository.saveAndFlush(waterConsumption);

        // Get the waterConsumption
        restWaterConsumptionMockMvc.perform(get("/api/water-consumptions/{id}", waterConsumption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(waterConsumption.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.millimiters").value(DEFAULT_MILLIMITERS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWaterConsumption() throws Exception {
        // Get the waterConsumption
        restWaterConsumptionMockMvc.perform(get("/api/water-consumptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWaterConsumption() throws Exception {
        // Initialize the database
        waterConsumptionService.save(waterConsumption);

        int databaseSizeBeforeUpdate = waterConsumptionRepository.findAll().size();

        // Update the waterConsumption
        WaterConsumption updatedWaterConsumption = waterConsumptionRepository.findById(waterConsumption.getId()).get();
        // Disconnect from session so that the updates on updatedWaterConsumption are not directly saved in db
        em.detach(updatedWaterConsumption);
        updatedWaterConsumption
            .date(UPDATED_DATE)
            .millimiters(UPDATED_MILLIMITERS);

        restWaterConsumptionMockMvc.perform(put("/api/water-consumptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWaterConsumption)))
            .andExpect(status().isOk());

        // Validate the WaterConsumption in the database
        List<WaterConsumption> waterConsumptionList = waterConsumptionRepository.findAll();
        assertThat(waterConsumptionList).hasSize(databaseSizeBeforeUpdate);
        WaterConsumption testWaterConsumption = waterConsumptionList.get(waterConsumptionList.size() - 1);
        assertThat(testWaterConsumption.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testWaterConsumption.getMillimiters()).isEqualTo(UPDATED_MILLIMITERS);
    }

    @Test
    @Transactional
    public void updateNonExistingWaterConsumption() throws Exception {
        int databaseSizeBeforeUpdate = waterConsumptionRepository.findAll().size();

        // Create the WaterConsumption

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWaterConsumptionMockMvc.perform(put("/api/water-consumptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterConsumption)))
            .andExpect(status().isBadRequest());

        // Validate the WaterConsumption in the database
        List<WaterConsumption> waterConsumptionList = waterConsumptionRepository.findAll();
        assertThat(waterConsumptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWaterConsumption() throws Exception {
        // Initialize the database
        waterConsumptionService.save(waterConsumption);

        int databaseSizeBeforeDelete = waterConsumptionRepository.findAll().size();

        // Delete the waterConsumption
        restWaterConsumptionMockMvc.perform(delete("/api/water-consumptions/{id}", waterConsumption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WaterConsumption> waterConsumptionList = waterConsumptionRepository.findAll();
        assertThat(waterConsumptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WaterConsumption.class);
        WaterConsumption waterConsumption1 = new WaterConsumption();
        waterConsumption1.setId(1L);
        WaterConsumption waterConsumption2 = new WaterConsumption();
        waterConsumption2.setId(waterConsumption1.getId());
        assertThat(waterConsumption1).isEqualTo(waterConsumption2);
        waterConsumption2.setId(2L);
        assertThat(waterConsumption1).isNotEqualTo(waterConsumption2);
        waterConsumption1.setId(null);
        assertThat(waterConsumption1).isNotEqualTo(waterConsumption2);
    }
}
