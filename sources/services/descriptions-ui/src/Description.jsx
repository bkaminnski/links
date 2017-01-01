import React from 'react';

export default class Description extends React.Component {

    render() {
        return <div><b>Description:</b> {this.props.description}</div>;
    }
}