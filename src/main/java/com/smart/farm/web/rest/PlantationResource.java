package com.smart.farm.web.rest;

import com.smart.farm.domain.Plantation;
import com.smart.farm.service.PlantationService;
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
 * REST controller for managing {@link com.smart.farm.domain.Plantation}.
 */
@RestController
@RequestMapping("/api")
public class PlantationResource {

    private final Logger log = LoggerFactory.getLogger(PlantationResource.class);

    private static final String ENTITY_NAME = "plantation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlantationService plantationService;

    public PlantationResource(PlantationService plantationService) {
        this.plantationService = plantationService;
    }

    /**
     * {@code POST  /plantations} : Create a new plantation.
     *
     * @param plantation the plantation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plantation, or with status {@code 400 (Bad Request)} if the plantation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plantations")
    public ResponseEntity<Plantation> createPlantation(@RequestBody Plantation plantation) throws URISyntaxException {
        log.debug("REST request to save Plantation : {}", plantation);
        if (plantation.getId() != null) {
            throw new BadRequestAlertException("A new plantation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plantation result = plantationService.save(plantation);
        return ResponseEntity.created(new URI("/api/plantations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plantations} : Updates an existing plantation.
     *
     * @param plantation the plantation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantation,
     * or with status {@code 400 (Bad Request)} if the plantation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plantation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plantations")
    public ResponseEntity<Plantation> updatePlantation(@RequestBody Plantation plantation) throws URISyntaxException {
        log.debug("REST request to update Plantation : {}", plantation);
        if (plantation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plantation result = plantationService.save(plantation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plantation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plantations} : get all the plantations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plantations in body.
     */
    @GetMapping("/plantations")
    public List<Plantation> getAllPlantations() {
        log.debug("REST request to get all Plantations");
        return plantationService.findAll();
    }

    /**
     * {@code GET  /plantations/:id} : get the "id" plantation.
     *
     * @param id the id of the plantation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plantation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plantations/{id}")
    public ResponseEntity<Plantation> getPlantation(@PathVariable Long id) {
        log.debug("REST request to get Plantation : {}", id);
        Optional<Plantation> plantation = plantationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(plantation);
    }

    /**
     * {@code DELETE  /plantations/:id} : delete the "id" plantation.
     *
     * @param id the id of the plantation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plantations/{id}")
    public ResponseEntity<Void> deletePlantation(@PathVariable Long id) {
        log.debug("REST request to delete Plantation : {}", id);
        plantationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
