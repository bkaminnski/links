import React from 'react';
import Keywords from './Keywords.jsx';
import KeywordsClient from './KeywordsClient.js';

export default class KeywordsSlice {

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
                component: <Keywords key={'keywords-' + keywords.linkSharedId} keywords={keywords.keywords} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksList.sliceWasLoaded', slice)
    }
}

let keywordsSlice = new KeywordsSlice();
keywordsSlice.loadTransformAndPublish();