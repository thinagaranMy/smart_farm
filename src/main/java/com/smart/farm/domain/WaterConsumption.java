package com.smart.farm.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A WaterConsumption.
 */
@Entity
@Table(name = "water_consumption")
public class WaterConsumption implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "millimiters")
    private Double millimiters;

    @ManyToOne
    @JsonIgnoreProperties("waterConsumptions")
    private Area area;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public WaterConsumption date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getMillimiters() {
        return millimiters;
    }

    public WaterConsumption millimiters(Double millimiters) {
        this.millimiters = millimiters;
        return this;
    }

    public void setMillimiters(Double millimiters) {
        this.millimiters = millimiters;
    }

    public Area getArea() {
        return area;
    }

    public WaterConsumption area(Area area) {
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
        if (!(o instanceof WaterConsumption)) {
            return false;
        }
        return id != null && id.equals(((WaterConsumption) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WaterConsumption{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", millimiters=" + getMillimiters() +
            "}";
    }
}
