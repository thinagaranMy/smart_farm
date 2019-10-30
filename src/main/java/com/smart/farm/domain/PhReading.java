package com.smart.farm.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A PhReading.
 */
@Entity
@Table(name = "ph_reading")
public class PhReading implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ph_reading")
    private Double phReading;

    @Column(name = "date")
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("phReadings")
    private Area area;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPhReading() {
        return phReading;
    }

    public PhReading phReading(Double phReading) {
        this.phReading = phReading;
        return this;
    }

    public void setPhReading(Double phReading) {
        this.phReading = phReading;
    }

    public Instant getDate() {
        return date;
    }

    public PhReading date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Area getArea() {
        return area;
    }

    public PhReading area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PhReading)) {
            return false;
        }
        return id != null && id.equals(((PhReading) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PhReading{" +
            "id=" + getId() +
            ", phReading=" + getPhReading() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
