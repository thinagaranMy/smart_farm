package com.thina.smartfarm.service;

import com.thina.smartfarm.domain.WaterConsumption;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link WaterConsumption}.
 */
public interface WaterConsumptionService {

    /**
     * Save a waterConsumption.
     *
     * @param waterConsumption the entity to save.
     * @return the persisted entity.
     */
    WaterConsumption save(WaterConsumption waterConsumption);

    /**
     * Get all the waterConsumptions.
     *
     * @return the list of entities.
     */
    List<WaterConsumption> findAll();


    /**
     * Get the "id" waterConsumption.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WaterConsumption> findOne(Long id);

    /**
     * Delete the "id" waterConsumption.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Find waterconsumtion by area
     *
     * @param areaid the id of the area
     */
    Optional<List<WaterConsumption>> findAllByArea(Long id);

}
