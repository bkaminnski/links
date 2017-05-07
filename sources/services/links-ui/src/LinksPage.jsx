import React from 'react';
import LinkCreation from './creation/LinkCreation.jsx';
import LinksList from './list/LinksList.jsx';

export default class LinksPage extends React.Component {
    render() {
        return (
            <div>
                <LinkCreation />
                <LinksList />
            </div>
        )
    }
}