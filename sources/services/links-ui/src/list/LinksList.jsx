import React from 'react';
import LinksListStore from './LinksListStore.js';
import LinkItem from './LinkItem.jsx';

export default class LinksList extends React.Component {

    constructor() {
        super();
        this.linksListStore = new LinksListStore(this);
        this.state = { links: [] };
    }

    componentDidMount() {
        this.linksListStore.subscribeToEvents();
        this.linksListStore.loadLinks();
    }

    componentWillUnmount() {
        this.linksListStore.unsubscribeFromEvents();
    }

    render() {
        return <div>
            {
                this.state.links.map(link => <LinkItem key={link.sharedId} link={link} />)
            }
        </div>;
    }
}
