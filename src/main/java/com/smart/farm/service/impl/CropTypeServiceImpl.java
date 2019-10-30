package com.smart.farm.service.impl;

import com.smart.farm.service.CropTypeService;
import com.smart.farm.domain.CropType;
import com.smart.farm.repository.CropTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CropType}.
 */
@Service
@Transactional
public class CropTypeServiceImpl implements CropTypeService {

    private final Logger log = LoggerFactory.getLogger(CropTypeServiceImpl.class);

    private final CropTypeRepository cropTypeRepository;

    public CropTypeServiceImpl(CropTypeRepository cropTypeRepository) {
        this.cropTypeRepository = cropTypeRepository;
    }

    /**
     * Save a cropType.
     *
     * @param cropType the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CropType save(CropType cropType) {
        log.debug("Request to save CropType : {}", cropType);
        return cropTypeRepository.save(cropType);
    }

    /**
     * Get all the cropTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CropType> findAll() {
        log.debug("Request to get all CropTypes");
        return cropTypeRepository.findAll();
    }


    /**
     * Get one cropType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CropType> findOne(Long id) {
        log.debug("Request to get CropType : {}", id);
        return cropTypeRepository.findById(id);
    }

    /**
     * Delete the cropType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CropType : {}", id);
        cropTypeRepository.deleteById(id);
    }
}
