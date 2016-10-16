package com.hclc;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

public class Link {

    private final String url, keywords, description;

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
