import React from 'react';
import UrlCreationForm from './UrlCreationForm.jsx';

export default class UrlLinksListSlice {
    prepareAndPublish() {
        PubSub.publish('uiEvent.links.linksListSlice.available', <UrlCreationForm />)
    }
}