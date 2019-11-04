package com.thina.smartfarm.repository;
import com.thina.smartfarm.domain.PhReading;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PhReading entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhReadingRepository extends JpaRepository<PhReading, Long> {

}
