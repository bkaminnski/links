package com.hclc.links.descriptions.descriptions.entity;

import java.io.Serializable;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Description implements Serializable {

    @Id
    @SequenceGenerator(name = "desc_id_seq",
            sequenceName = "desc_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "desc_id_seq")
    @Column(name = "desc_id", updatable = false)
    private Long id;

    @Column(name = "desc_link_shared_id", length = 36)
    private String linkSharedId;

    @Column(name = "desc_description", length = 2000)
    private String description;

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("linkSharedId", linkSharedId)
                .add("description", description);
    }
}
