package com.smart.farm.repository;
import com.smart.farm.domain.Plantation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plantation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantationRepository extends JpaRepository<Plantation, Long> {

}
