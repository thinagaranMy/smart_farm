package com.smart.farm.service.impl;

import com.smart.farm.service.FarmService;
import com.smart.farm.domain.Farm;
import com.smart.farm.repository.FarmRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Farm}.
 */
@Service
@Transactional
public class FarmServiceImpl implements FarmService {

    private final Logger log = LoggerFactory.getLogger(FarmServiceImpl.class);

    private final FarmRepository farmRepository;

    public FarmServiceImpl(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    /**
     * Save a farm.
     *
     * @param farm the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Farm save(Farm farm) {
        log.debug("Request to save Farm : {}", farm);
        return farmRepository.save(farm);
    }

    /**
     * Get all the farms.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Farm> findAll() {
        log.debug("Request to get all Farms");
        return farmRepository.findAll();
    }


    /**
     * Get one farm by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Farm> findOne(Long id) {
        log.debug("Request to get Farm : {}", id);
        return farmRepository.findById(id);
    }

    /**
     * Delete the farm by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Farm : {}", id);
        farmRepository.deleteById(id);
    }
}
