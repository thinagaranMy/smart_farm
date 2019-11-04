package com.thina.smartfarm.web.rest;

import com.thina.smartfarm.domain.CropType;
import com.thina.smartfarm.service.CropTypeService;
import com.thina.smartfarm.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.thina.smartfarm.domain.CropType}.
 */
@RestController
@RequestMapping("/api")
public class CropTypeResource {

    private final Logger log = LoggerFactory.getLogger(CropTypeResource.class);

    private static final String ENTITY_NAME = "cropType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CropTypeService cropTypeService;

    public CropTypeResource(CropTypeService cropTypeService) {
        this.cropTypeService = cropTypeService;
    }

    /**
     * {@code POST  /crop-types} : Create a new cropType.
     *
     * @param cropType the cropType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cropType, or with status {@code 400 (Bad Request)} if the cropType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crop-types")
    public ResponseEntity<CropType> createCropType(@RequestBody CropType cropType) throws URISyntaxException {
        log.debug("REST request to save CropType : {}", cropType);
        if (cropType.getId() != null) {
            throw new BadRequestAlertException("A new cropType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CropType result = cropTypeService.save(cropType);
        return ResponseEntity.created(new URI("/api/crop-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crop-types} : Updates an existing cropType.
     *
     * @param cropType the cropType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cropType,
     * or with status {@code 400 (Bad Request)} if the cropType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cropType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crop-types")
    public ResponseEntity<CropType> updateCropType(@RequestBody CropType cropType) throws URISyntaxException {
        log.debug("REST request to update CropType : {}", cropType);
        if (cropType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CropType result = cropTypeService.save(cropType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cropType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /crop-types} : get all the cropTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cropTypes in body.
     */
    @GetMapping("/crop-types")
    public List<CropType> getAllCropTypes() {
        log.debug("REST request to get all CropTypes");
        return cropTypeService.findAll();
    }

    /**
     * {@code GET  /crop-types/:id} : get the "id" cropType.
     *
     * @param id the id of the cropType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cropType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crop-types/{id}")
    public ResponseEntity<CropType> getCropType(@PathVariable Long id) {
        log.debug("REST request to get CropType : {}", id);
        Optional<CropType> cropType = cropTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cropType);
    }

    /**
     * {@code DELETE  /crop-types/:id} : delete the "id" cropType.
     *
     * @param id the id of the cropType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crop-types/{id}")
    public ResponseEntity<Void> deleteCropType(@PathVariable Long id) {
        log.debug("REST request to delete CropType : {}", id);
        cropTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
