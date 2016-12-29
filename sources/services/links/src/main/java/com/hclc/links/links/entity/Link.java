package com.hclc.links.links.entity;

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
public class Link implements Serializable {

    @Id
    @SequenceGenerator(name = "link_id_seq",
            sequenceName = "link_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "link_id_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(length = 2000)
    private String url, keywords, description;

    public Link() {
    }

    public Link(String url, String keywords, String description) {
        this.url = url;
        this.keywords = keywords;
        this.description = description;
    }

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("url", url)
                .add("keywords", keywords)
                .add("description", description);
    }
}
