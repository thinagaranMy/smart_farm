package com.smart.farm.repository;
import com.smart.farm.domain.Farm;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Farm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {

}
