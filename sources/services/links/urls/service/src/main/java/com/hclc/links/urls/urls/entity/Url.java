package com.hclc.links.urls.urls.entity;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class Url implements Serializable {

    @Id
    @SequenceGenerator(name = "url_id_seq",
            sequenceName = "url_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "url_id_seq")
    @Column(name = "url_id", updatable = false)
    private Long id;

    @Column(name = "url_link_shared_id", length = 36)
    @NotNull
    private String linkSharedId;

    @Column(name = "url_url", length = 2000)
    @NotNull
    private String url;

    public Url() {
    }

    public Url(String linkSharedId, String url) {
        this.linkSharedId = linkSharedId;
        this.url = url;
    }

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("linkSharedId", linkSharedId)
                .add("url", url);
    }
}
