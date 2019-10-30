package com.smart.farm.service;

import com.smart.farm.domain.Plantation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Plantation}.
 */
public interface PlantationService {

    /**
     * Save a plantation.
     *
     * @param plantation the entity to save.
     * @return the persisted entity.
     */
    Plantation save(Plantation plantation);

    /**
     * Get all the plantations.
     *
     * @return the list of entities.
     */
    List<Plantation> findAll();


    /**
     * Get the "id" plantation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Plantation> findOne(Long id);

    /**
     * Delete the "id" plantation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
