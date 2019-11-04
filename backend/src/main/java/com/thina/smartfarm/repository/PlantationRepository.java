package com.thina.smartfarm.repository;
import com.thina.smartfarm.domain.Plantation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plantation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantationRepository extends JpaRepository<Plantation, Long> {

}
