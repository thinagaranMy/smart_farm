package com.thina.smartfarm.service.impl;

import com.thina.smartfarm.service.WaterConsumptionService;
import com.thina.smartfarm.domain.WaterConsumption;
import com.thina.smartfarm.repository.WaterConsumptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link WaterConsumption}.
 */
@Service
@Transactional
public class WaterConsumptionServiceImpl implements WaterConsumptionService {

    private final Logger log = LoggerFactory.getLogger(WaterConsumptionServiceImpl.class);

    private final WaterConsumptionRepository waterConsumptionRepository;

    public WaterConsumptionServiceImpl(WaterConsumptionRepository waterConsumptionRepository) {
        this.waterConsumptionRepository = waterConsumptionRepository;
    }

    /**
     * Save a waterConsumption.
     *
     * @param waterConsumption the entity to save.
     * @return the persisted entity.
     */
    @Override
    public WaterConsumption save(WaterConsumption waterConsumption) {
        log.debug("Request to save WaterConsumption : {}", waterConsumption);
        return waterConsumptionRepository.save(waterConsumption);
    }

    /**
     * Get all the waterConsumptions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<WaterConsumption> findAll() {
        log.debug("Request to get all WaterConsumptions");
        return waterConsumptionRepository.findAll();
    }


    /**
     * Get one waterConsumption by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<WaterConsumption> findOne(Long id) {
        log.debug("Request to get WaterConsumption : {}", id);
        return waterConsumptionRepository.findById(id);
    }

    /**
     * Delete the waterConsumption by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WaterConsumption : {}", id);
        waterConsumptionRepository.deleteById(id);
    }
}
