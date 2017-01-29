package com.hclc.links.links.links.entity;

public class CreateLinkCommand {
    private String sharedId, url;

    public void setSharedId(String sharedId) {
        this.sharedId = sharedId;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Link toLink() {
        return new Link(sharedId, url);
    }
}
