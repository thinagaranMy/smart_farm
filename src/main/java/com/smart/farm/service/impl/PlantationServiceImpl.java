package com.smart.farm.service.impl;

import com.smart.farm.service.PlantationService;
import com.smart.farm.domain.Plantation;
import com.smart.farm.repository.PlantationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Plantation}.
 */
@Service
@Transactional
public class PlantationServiceImpl implements PlantationService {

    private final Logger log = LoggerFactory.getLogger(PlantationServiceImpl.class);

    private final PlantationRepository plantationRepository;

    public PlantationServiceImpl(PlantationRepository plantationRepository) {
        this.plantationRepository = plantationRepository;
    }

    /**
     * Save a plantation.
     *
     * @param plantation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Plantation save(Plantation plantation) {
        log.debug("Request to save Plantation : {}", plantation);
        return plantationRepository.save(plantation);
    }

    /**
     * Get all the plantations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Plantation> findAll() {
        log.debug("Request to get all Plantations");
        return plantationRepository.findAll();
    }


    /**
     * Get one plantation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Plantation> findOne(Long id) {
        log.debug("Request to get Plantation : {}", id);
        return plantationRepository.findById(id);
    }

    /**
     * Delete the plantation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Plantation : {}", id);
        plantationRepository.deleteById(id);
    }
}
