package com.hclc.links.links.links.entity;

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
    @Column(name = "link_id", updatable = false)
    private Long id;

    @Column(name = "link_shared_id", length = 36)
    private String sharedId;

    @Column(name = "link_url", length = 2000)
    private String url;

    @Column(name = "link_keywords", length = 2000)
    private String keywords;

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("sharedId", sharedId)
                .add("url", url)
                .add("keywords", keywords);
    }
}
