package com.thina.smartfarm.web.rest;

import com.thina.smartfarm.SmartfarmApp;
import com.thina.smartfarm.domain.CropType;
import com.thina.smartfarm.repository.CropTypeRepository;
import com.thina.smartfarm.service.CropTypeService;
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
import java.util.List;

import static com.thina.smartfarm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CropTypeResource} REST controller.
 */
@SpringBootTest(classes = SmartfarmApp.class)
public class CropTypeResourceIT {

    private static final String DEFAULT_CROP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CROP_NAME = "BBBBBBBBBB";

    @Autowired
    private CropTypeRepository cropTypeRepository;

    @Autowired
    private CropTypeService cropTypeService;

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

    private MockMvc restCropTypeMockMvc;

    private CropType cropType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CropTypeResource cropTypeResource = new CropTypeResource(cropTypeService);
        this.restCropTypeMockMvc = MockMvcBuilders.standaloneSetup(cropTypeResource)
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
    public static CropType createEntity(EntityManager em) {
        CropType cropType = new CropType()
            .cropName(DEFAULT_CROP_NAME);
        return cropType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CropType createUpdatedEntity(EntityManager em) {
        CropType cropType = new CropType()
            .cropName(UPDATED_CROP_NAME);
        return cropType;
    }

    @BeforeEach
    public void initTest() {
        cropType = createEntity(em);
    }

    @Test
    @Transactional
    public void createCropType() throws Exception {
        int databaseSizeBeforeCreate = cropTypeRepository.findAll().size();

        // Create the CropType
        restCropTypeMockMvc.perform(post("/api/crop-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cropType)))
            .andExpect(status().isCreated());

        // Validate the CropType in the database
        List<CropType> cropTypeList = cropTypeRepository.findAll();
        assertThat(cropTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CropType testCropType = cropTypeList.get(cropTypeList.size() - 1);
        assertThat(testCropType.getCropName()).isEqualTo(DEFAULT_CROP_NAME);
    }

    @Test
    @Transactional
    public void createCropTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cropTypeRepository.findAll().size();

        // Create the CropType with an existing ID
        cropType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCropTypeMockMvc.perform(post("/api/crop-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cropType)))
            .andExpect(status().isBadRequest());

        // Validate the CropType in the database
        List<CropType> cropTypeList = cropTypeRepository.findAll();
        assertThat(cropTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCropTypes() throws Exception {
        // Initialize the database
        cropTypeRepository.saveAndFlush(cropType);

        // Get all the cropTypeList
        restCropTypeMockMvc.perform(get("/api/crop-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cropType.getId().intValue())))
            .andExpect(jsonPath("$.[*].cropName").value(hasItem(DEFAULT_CROP_NAME)));
    }
    
    @Test
    @Transactional
    public void getCropType() throws Exception {
        // Initialize the database
        cropTypeRepository.saveAndFlush(cropType);

        // Get the cropType
        restCropTypeMockMvc.perform(get("/api/crop-types/{id}", cropType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cropType.getId().intValue()))
            .andExpect(jsonPath("$.cropName").value(DEFAULT_CROP_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingCropType() throws Exception {
        // Get the cropType
        restCropTypeMockMvc.perform(get("/api/crop-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCropType() throws Exception {
        // Initialize the database
        cropTypeService.save(cropType);

        int databaseSizeBeforeUpdate = cropTypeRepository.findAll().size();

        // Update the cropType
        CropType updatedCropType = cropTypeRepository.findById(cropType.getId()).get();
        // Disconnect from session so that the updates on updatedCropType are not directly saved in db
        em.detach(updatedCropType);
        updatedCropType
            .cropName(UPDATED_CROP_NAME);

        restCropTypeMockMvc.perform(put("/api/crop-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCropType)))
            .andExpect(status().isOk());

        // Validate the CropType in the database
        List<CropType> cropTypeList = cropTypeRepository.findAll();
        assertThat(cropTypeList).hasSize(databaseSizeBeforeUpdate);
        CropType testCropType = cropTypeList.get(cropTypeList.size() - 1);
        assertThat(testCropType.getCropName()).isEqualTo(UPDATED_CROP_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCropType() throws Exception {
        int databaseSizeBeforeUpdate = cropTypeRepository.findAll().size();

        // Create the CropType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCropTypeMockMvc.perform(put("/api/crop-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cropType)))
            .andExpect(status().isBadRequest());

        // Validate the CropType in the database
        List<CropType> cropTypeList = cropTypeRepository.findAll();
        assertThat(cropTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCropType() throws Exception {
        // Initialize the database
        cropTypeService.save(cropType);

        int databaseSizeBeforeDelete = cropTypeRepository.findAll().size();

        // Delete the cropType
        restCropTypeMockMvc.perform(delete("/api/crop-types/{id}", cropType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CropType> cropTypeList = cropTypeRepository.findAll();
        assertThat(cropTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CropType.class);
        CropType cropType1 = new CropType();
        cropType1.setId(1L);
        CropType cropType2 = new CropType();
        cropType2.setId(cropType1.getId());
        assertThat(cropType1).isEqualTo(cropType2);
        cropType2.setId(2L);
        assertThat(cropType1).isNotEqualTo(cropType2);
        cropType1.setId(null);
        assertThat(cropType1).isNotEqualTo(cropType2);
    }
}
