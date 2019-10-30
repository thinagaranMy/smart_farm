package com.smart.farm.service;

import com.smart.farm.domain.PhReading;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PhReading}.
 */
public interface PhReadingService {

    /**
     * Save a phReading.
     *
     * @param phReading the entity to save.
     * @return the persisted entity.
     */
    PhReading save(PhReading phReading);

    /**
     * Get all the phReadings.
     *
     * @return the list of entities.
     */
    List<PhReading> findAll();


    /**
     * Get the "id" phReading.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PhReading> findOne(Long id);

    /**
     * Delete the "id" phReading.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
