package com.hclc.links.descriptions.descriptions.entity;

public class CreateDescriptionCommand {
    private String linkSharedId, description;

    public void setLinkSharedId(String linkSharedId) {
        this.linkSharedId = linkSharedId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Description toDescription() {
        return new Description(linkSharedId, description);
    }
}
