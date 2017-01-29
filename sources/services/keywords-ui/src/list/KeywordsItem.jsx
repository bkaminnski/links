import React from 'react';

export default class KeywordsItem extends React.Component {

    render() {
        return <div><b>Keywords:</b> {this.props.keywords}</div>;
    }
}