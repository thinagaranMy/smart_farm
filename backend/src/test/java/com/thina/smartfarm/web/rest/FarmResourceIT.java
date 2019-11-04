package com.thina.smartfarm.web.rest;

import com.thina.smartfarm.SmartfarmApp;
import com.thina.smartfarm.domain.Farm;
import com.thina.smartfarm.repository.FarmRepository;
import com.thina.smartfarm.service.FarmService;
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
 * Integration tests for the {@link FarmResource} REST controller.
 */
@SpringBootTest(classes = SmartfarmApp.class)
public class FarmResourceIT {

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private FarmService farmService;

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

    private MockMvc restFarmMockMvc;

    private Farm farm;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FarmResource farmResource = new FarmResource(farmService);
        this.restFarmMockMvc = MockMvcBuilders.standaloneSetup(farmResource)
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
    public static Farm createEntity(EntityManager em) {
        Farm farm = new Farm()
            .creationDate(DEFAULT_CREATION_DATE);
        return farm;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farm createUpdatedEntity(EntityManager em) {
        Farm farm = new Farm()
            .creationDate(UPDATED_CREATION_DATE);
        return farm;
    }

    @BeforeEach
    public void initTest() {
        farm = createEntity(em);
    }

    @Test
    @Transactional
    public void createFarm() throws Exception {
        int databaseSizeBeforeCreate = farmRepository.findAll().size();

        // Create the Farm
        restFarmMockMvc.perform(post("/api/farms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isCreated());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate + 1);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createFarmWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = farmRepository.findAll().size();

        // Create the Farm with an existing ID
        farm.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFarmMockMvc.perform(post("/api/farms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFarms() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get all the farmList
        restFarmMockMvc.perform(get("/api/farms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farm.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getFarm() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get the farm
        restFarmMockMvc.perform(get("/api/farms/{id}", farm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(farm.getId().intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFarm() throws Exception {
        // Get the farm
        restFarmMockMvc.perform(get("/api/farms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFarm() throws Exception {
        // Initialize the database
        farmService.save(farm);

        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Update the farm
        Farm updatedFarm = farmRepository.findById(farm.getId()).get();
        // Disconnect from session so that the updates on updatedFarm are not directly saved in db
        em.detach(updatedFarm);
        updatedFarm
            .creationDate(UPDATED_CREATION_DATE);

        restFarmMockMvc.perform(put("/api/farms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFarm)))
            .andExpect(status().isOk());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Create the Farm

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmMockMvc.perform(put("/api/farms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFarm() throws Exception {
        // Initialize the database
        farmService.save(farm);

        int databaseSizeBeforeDelete = farmRepository.findAll().size();

        // Delete the farm
        restFarmMockMvc.perform(delete("/api/farms/{id}", farm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Farm.class);
        Farm farm1 = new Farm();
        farm1.setId(1L);
        Farm farm2 = new Farm();
        farm2.setId(farm1.getId());
        assertThat(farm1).isEqualTo(farm2);
        farm2.setId(2L);
        assertThat(farm1).isNotEqualTo(farm2);
        farm1.setId(null);
        assertThat(farm1).isNotEqualTo(farm2);
    }
}
