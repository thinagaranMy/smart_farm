package com.smart.farm.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CropType.
 */
@Entity
@Table(name = "crop_type")
public class CropType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crop_name")
    private String cropName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCropName() {
        return cropName;
    }

    public CropType cropName(String cropName) {
        this.cropName = cropName;
        return this;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CropType)) {
            return false;
        }
        return id != null && id.equals(((CropType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CropType{" +
            "id=" + getId() +
            ", cropName='" + getCropName() + "'" +
            "}";
    }
}
