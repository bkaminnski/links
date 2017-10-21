import React from 'react';
import DescriptionItem from './DescriptionItem.jsx';

export default class DescriptionItemsStore {
    loadTransformAndPublish() {
        HttpClient
            .sendGet('/descriptions/resources/descriptions')
            .then(descriptions => { return descriptions.jsonObject; })
            .then(this.transformIntoSlice)
            .then(this.publish);
    }

    transformIntoSlice(descriptions) {
        return {
            name: 'description',
            priority: 200,
            fragments: descriptions.map(description => ({
                linkSharedId: description.linkSharedId,
                component: <DescriptionItem key={'description-' + description.linkSharedId} description={description.description} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksListSlice.available', slice)
    }
}