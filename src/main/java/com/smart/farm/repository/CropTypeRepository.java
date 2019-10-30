package com.smart.farm.repository;
import com.smart.farm.domain.CropType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CropType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CropTypeRepository extends JpaRepository<CropType, Long> {

}
