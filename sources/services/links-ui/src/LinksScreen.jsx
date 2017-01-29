import React from 'react';
import ReactDOM from 'react-dom';
import LinkCreation from './creation/LinkCreation.jsx';
import LinksList from './list/LinksList.jsx';

export default class LinksScreen extends React.Component {
    render() {
        return (
            <div>
                <LinkCreation />
                <LinksList />
            </div>
        )
    }
}

ReactDOM.render(<LinksScreen />, document.getElementById('linksScreen'));