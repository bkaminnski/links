import React from 'react';

export default class DescriptionItem extends React.Component {

    render() {
        return <div><b>Description:</b> {this.props.description}</div>;
    }
}