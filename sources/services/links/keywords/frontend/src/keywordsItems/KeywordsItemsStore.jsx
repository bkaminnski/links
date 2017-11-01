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
            priority: 200,
            items: keywords.map(keywords => ({
                linkSharedId: keywords.linkSharedId,
                component: <KeywordsItem key={'keywordsItem-' + keywords.linkSharedId} keywords={keywords.keywords} />
            }))
        };
        return slice;
    }

    publish(slice) {
        PubSub.publish('uiEvent.links.linksListSlice.available', slice)
    }
}