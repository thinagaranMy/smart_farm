package com.thina.smartfarm.repository;
import com.thina.smartfarm.domain.CropType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CropType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CropTypeRepository extends JpaRepository<CropType, Long> {

}
