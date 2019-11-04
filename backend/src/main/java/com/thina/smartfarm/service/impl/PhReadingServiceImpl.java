package com.thina.smartfarm.service.impl;

import com.thina.smartfarm.service.PhReadingService;
import com.thina.smartfarm.domain.PhReading;
import com.thina.smartfarm.repository.PhReadingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PhReading}.
 */
@Service
@Transactional
public class PhReadingServiceImpl implements PhReadingService {

    private final Logger log = LoggerFactory.getLogger(PhReadingServiceImpl.class);

    private final PhReadingRepository phReadingRepository;

    public PhReadingServiceImpl(PhReadingRepository phReadingRepository) {
        this.phReadingRepository = phReadingRepository;
    }

    /**
     * Save a phReading.
     *
     * @param phReading the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PhReading save(PhReading phReading) {
        log.debug("Request to save PhReading : {}", phReading);
        return phReadingRepository.save(phReading);
    }

    /**
     * Get all the phReadings.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PhReading> findAll() {
        log.debug("Request to get all PhReadings");
        return phReadingRepository.findAll();
    }


    /**
     * Get one phReading by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PhReading> findOne(Long id) {
        log.debug("Request to get PhReading : {}", id);
        return phReadingRepository.findById(id);
    }

    /**
     * Delete the phReading by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PhReading : {}", id);
        phReadingRepository.deleteById(id);
    }
}
