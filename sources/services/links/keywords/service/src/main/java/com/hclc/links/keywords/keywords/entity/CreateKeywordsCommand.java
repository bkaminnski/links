package com.hclc.links.keywords.keywords.entity;

public class CreateKeywordsCommand {
    private String linkSharedId, keywords;

    public void setLinkSharedId(String linkSharedId) {
        this.linkSharedId = linkSharedId;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Keywords toKeywords() {
        return new Keywords(linkSharedId, keywords);
    }
}
