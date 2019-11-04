package com.thina.smartfarm.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Plantation.
 */
@Entity
@Table(name = "plantation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plantation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plant_date")
    private Instant plantDate;

    @Column(name = "end_date")
    private Instant endDate;

    @OneToMany(mappedBy = "plantation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Area> areas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("plantations")
    private CropType cropType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPlantDate() {
        return plantDate;
    }

    public Plantation plantDate(Instant plantDate) {
        this.plantDate = plantDate;
        return this;
    }

    public void setPlantDate(Instant plantDate) {
        this.plantDate = plantDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Plantation endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Set<Area> getAreas() {
        return areas;
    }

    public Plantation areas(Set<Area> areas) {
        this.areas = areas;
        return this;
    }

    public Plantation addAreas(Area area) {
        this.areas.add(area);
        area.setPlantation(this);
        return this;
    }

    public Plantation removeAreas(Area area) {
        this.areas.remove(area);
        area.setPlantation(null);
        return this;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }

    public CropType getCropType() {
        return cropType;
    }

    public Plantation cropType(CropType cropType) {
        this.cropType = cropType;
        return this;
    }

    public void setCropType(CropType cropType) {
        this.cropType = cropType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plantation)) {
            return false;
        }
        return id != null && id.equals(((Plantation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Plantation{" +
            "id=" + getId() +
            ", plantDate='" + getPlantDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
