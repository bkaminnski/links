import React from 'react';
import KeywordsItem from './KeywordsItem.jsx';
import KeywordsClient from '../KeywordsClient.js';

export default class KeywordsList {

    constructor() {
        this.keywordsClient = new KeywordsClient();
    }

    loadTransformAndPublish() {
        this.keywordsClient
            .loadKeywords()
            .then(this.transformIntoSlice)
            .then(this.publish);
    }

    transformIntoSlice(keywords) {
        return {
            name: 'keywords',
            priority: 100,
            fragments: keywords.map(keywords => ({
                linkSharedId: keywords.linkSharedId,
                component: <KeywordsItem key={'keywords-' + keywords.linkSharedId} keywords={keywords.keywords} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksListSlice.available', slice)
    }
}