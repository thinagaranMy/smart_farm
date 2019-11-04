package com.thina.smartfarm.service;

import com.thina.smartfarm.domain.CropType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CropType}.
 */
public interface CropTypeService {

    /**
     * Save a cropType.
     *
     * @param cropType the entity to save.
     * @return the persisted entity.
     */
    CropType save(CropType cropType);

    /**
     * Get all the cropTypes.
     *
     * @return the list of entities.
     */
    List<CropType> findAll();


    /**
     * Get the "id" cropType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CropType> findOne(Long id);

    /**
     * Delete the "id" cropType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
