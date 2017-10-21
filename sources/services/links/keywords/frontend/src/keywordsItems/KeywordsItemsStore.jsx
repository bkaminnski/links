import React from 'react';
import KeywordsItem from './KeywordsItem.jsx';

export default class KeywordsItemsStore {
    loadTransformAndPublish() {
        HttpClient
            .sendGet('/keywords/resources/keywords')
            .then(keywords => keywords.jsonObject)
            .then(this.transformIntoSlice)
            .then(this.publish);
    }

    transformIntoSlice(keywords) {
        let slice = {
            name: 'keywords',
            priority: 100,
            fragments: keywords.map(keywords => ({
                linkSharedId: keywords.linkSharedId,
                component: <KeywordsItem key={'keywords-' + keywords.linkSharedId} keywords={keywords.keywords} />
            }))
        };
        return slice;
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksListSlice.available', slice)
    }
}