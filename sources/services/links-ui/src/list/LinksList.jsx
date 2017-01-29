import React from 'react';
import LinksListStateBuilder from './LinksListStateBuilder.js';
import LinkItem from './LinkItem.jsx';

export default class LinksList extends React.Component {

    constructor() {
        super();
        this.linksListStateBuilder = new LinksListStateBuilder(this);
        this.state = { links: [] };
    }

    componentDidMount() {
        this.linksListStateBuilder.subscribeToEvents();
        this.linksListStateBuilder.loadLinks();
    }

    componentWillUnmount() {
        this.linksListStateBuilder.unsubscribeFromEvents();
    }

    render() {
        return <div>
            {
                this.state.links.map(link => <LinkItem key={link.sharedId} link={link} />)
            }
        </div>;
    }
}
