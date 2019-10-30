package com.smart.farm.web.rest;

import com.smart.farm.domain.WaterConsumption;
import com.smart.farm.service.WaterConsumptionService;
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
 * REST controller for managing {@link com.smart.farm.domain.WaterConsumption}.
 */
@RestController
@RequestMapping("/api")
public class WaterConsumptionResource {

    private final Logger log = LoggerFactory.getLogger(WaterConsumptionResource.class);

    private static final String ENTITY_NAME = "waterConsumption";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WaterConsumptionService waterConsumptionService;

    public WaterConsumptionResource(WaterConsumptionService waterConsumptionService) {
        this.waterConsumptionService = waterConsumptionService;
    }

    /**
     * {@code POST  /water-consumptions} : Create a new waterConsumption.
     *
     * @param waterConsumption the waterConsumption to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new waterConsumption, or with status {@code 400 (Bad Request)} if the waterConsumption has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/water-consumptions")
    public ResponseEntity<WaterConsumption> createWaterConsumption(@RequestBody WaterConsumption waterConsumption) throws URISyntaxException {
        log.debug("REST request to save WaterConsumption : {}", waterConsumption);
        if (waterConsumption.getId() != null) {
            throw new BadRequestAlertException("A new waterConsumption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WaterConsumption result = waterConsumptionService.save(waterConsumption);
        return ResponseEntity.created(new URI("/api/water-consumptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /water-consumptions} : Updates an existing waterConsumption.
     *
     * @param waterConsumption the waterConsumption to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated waterConsumption,
     * or with status {@code 400 (Bad Request)} if the waterConsumption is not valid,
     * or with status {@code 500 (Internal Server Error)} if the waterConsumption couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/water-consumptions")
    public ResponseEntity<WaterConsumption> updateWaterConsumption(@RequestBody WaterConsumption waterConsumption) throws URISyntaxException {
        log.debug("REST request to update WaterConsumption : {}", waterConsumption);
        if (waterConsumption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WaterConsumption result = waterConsumptionService.save(waterConsumption);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, waterConsumption.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /water-consumptions} : get all the waterConsumptions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of waterConsumptions in body.
     */
    @GetMapping("/water-consumptions")
    public List<WaterConsumption> getAllWaterConsumptions() {
        log.debug("REST request to get all WaterConsumptions");
        return waterConsumptionService.findAll();
    }

    /**
     * {@code GET  /water-consumptions/:id} : get the "id" waterConsumption.
     *
     * @param id the id of the waterConsumption to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the waterConsumption, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/water-consumptions/{id}")
    public ResponseEntity<WaterConsumption> getWaterConsumption(@PathVariable Long id) {
        log.debug("REST request to get WaterConsumption : {}", id);
        Optional<WaterConsumption> waterConsumption = waterConsumptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(waterConsumption);
    }

    /**
     * {@code DELETE  /water-consumptions/:id} : delete the "id" waterConsumption.
     *
     * @param id the id of the waterConsumption to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/water-consumptions/{id}")
    public ResponseEntity<Void> deleteWaterConsumption(@PathVariable Long id) {
        log.debug("REST request to delete WaterConsumption : {}", id);
        waterConsumptionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
