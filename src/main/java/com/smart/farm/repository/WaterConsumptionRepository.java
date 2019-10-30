package com.smart.farm.repository;
import com.smart.farm.domain.WaterConsumption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WaterConsumption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WaterConsumptionRepository extends JpaRepository<WaterConsumption, Long> {

}
