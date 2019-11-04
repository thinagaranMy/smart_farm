package com.thina.smartfarm.repository;
import com.thina.smartfarm.domain.WaterConsumption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import com.thina.smartfarm.domain.Area;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the WaterConsumption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WaterConsumptionRepository extends JpaRepository<WaterConsumption, Long> {

    Optional<List<WaterConsumption>> findWaterConsumptionByArea_id(Long areaId);

}
