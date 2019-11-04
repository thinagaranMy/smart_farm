package com.thina.smartfarm.repository;
import com.thina.smartfarm.domain.WaterConsumption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WaterConsumption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WaterConsumptionRepository extends JpaRepository<WaterConsumption, Long> {

}
