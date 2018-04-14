package com.hclc.links.keywords.keywords.entity;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Keywords implements Serializable {

    @Id
    @SequenceGenerator(name = "keyw_id_seq",
            sequenceName = "keyw_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "keyw_id_seq")
    @Column(name = "keyw_id", updatable = false)
    private Long id;

    @Column(name = "keyw_link_shared_id", length = 36)
    private String linkSharedId;

    @Column(name = "keyw_keywords", length = 2000)
    private String keywords;

    public Keywords() {
    }

    public Keywords(String linkSharedId, String keywords) {
        this.linkSharedId = linkSharedId;
        this.keywords = keywords;
    }

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("linkSharedId", linkSharedId)
                .add("keywords", keywords);
    }
}
