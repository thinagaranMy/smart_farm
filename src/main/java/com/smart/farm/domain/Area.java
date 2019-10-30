package com.smart.farm.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;

/**
 * The are entity
 */
@ApiModel(description = "The are entity")
@Entity
@Table(name = "area")
public class Area implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "size")
    private Integer size;

    @ManyToOne
    @JsonIgnoreProperties("areas")
    private Farm farm;

    @ManyToOne
    @JsonIgnoreProperties("areas")
    private Plantation plantation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSize() {
        return size;
    }

    public Area size(Integer size) {
        this.size = size;
        return this;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Farm getFarm() {
        return farm;
    }

    public Area farm(Farm farm) {
        this.farm = farm;
        return this;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    public Plantation getPlantation() {
        return plantation;
    }

    public Area plantation(Plantation plantation) {
        this.plantation = plantation;
        return this;
    }

    public void setPlantation(Plantation plantation) {
        this.plantation = plantation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Area)) {
            return false;
        }
        return id != null && id.equals(((Area) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", size=" + getSize() +
            "}";
    }
}
