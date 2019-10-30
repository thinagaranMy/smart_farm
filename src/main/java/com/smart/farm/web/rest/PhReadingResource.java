package com.smart.farm.web.rest;

import com.smart.farm.domain.PhReading;
import com.smart.farm.service.PhReadingService;
import com.smart.farm.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link com.smart.farm.domain.PhReading}.
 */
@RestController
@RequestMapping("/api")
public class PhReadingResource {

    private final Logger log = LoggerFactory.getLogger(PhReadingResource.class);

    private static final String ENTITY_NAME = "phReading";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PhReadingService phReadingService;

    public PhReadingResource(PhReadingService phReadingService) {
        this.phReadingService = phReadingService;
    }

    /**
     * {@code POST  /ph-readings} : Create a new phReading.
     *
     * @param phReading the phReading to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new phReading, or with status {@code 400 (Bad Request)} if the phReading has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ph-readings")
    public ResponseEntity<PhReading> createPhReading(@RequestBody PhReading phReading) throws URISyntaxException {
        log.debug("REST request to save PhReading : {}", phReading);
        if (phReading.getId() != null) {
            throw new BadRequestAlertException("A new phReading cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PhReading result = phReadingService.save(phReading);
        return ResponseEntity.created(new URI("/api/ph-readings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ph-readings} : Updates an existing phReading.
     *
     * @param phReading the phReading to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated phReading,
     * or with status {@code 400 (Bad Request)} if the phReading is not valid,
     * or with status {@code 500 (Internal Server Error)} if the phReading couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ph-readings")
    public ResponseEntity<PhReading> updatePhReading(@RequestBody PhReading phReading) throws URISyntaxException {
        log.debug("REST request to update PhReading : {}", phReading);
        if (phReading.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PhReading result = phReadingService.save(phReading);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, phReading.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ph-readings} : get all the phReadings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of phReadings in body.
     */
    @GetMapping("/ph-readings")
    public List<PhReading> getAllPhReadings() {
        log.debug("REST request to get all PhReadings");
        return phReadingService.findAll();
    }

    /**
     * {@code GET  /ph-readings/:id} : get the "id" phReading.
     *
     * @param id the id of the phReading to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the phReading, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ph-readings/{id}")
    public ResponseEntity<PhReading> getPhReading(@PathVariable Long id) {
        log.debug("REST request to get PhReading : {}", id);
        Optional<PhReading> phReading = phReadingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(phReading);
    }

    /**
     * {@code DELETE  /ph-readings/:id} : delete the "id" phReading.
     *
     * @param id the id of the phReading to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ph-readings/{id}")
    public ResponseEntity<Void> deletePhReading(@PathVariable Long id) {
        log.debug("REST request to delete PhReading : {}", id);
        phReadingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
