package com.hclc.links.urls.urls.entity;

public class CreateUrlCommand {
    private String linkSharedId, url;

    public void setLinkSharedId(String linkSharedId) {
        this.linkSharedId = linkSharedId;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Url toUrl() {
        return new Url(linkSharedId, url);
    }
}
