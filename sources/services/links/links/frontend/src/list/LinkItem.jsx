import React from 'react';

export default class LinkItem extends React.Component {
    render() {
        return (
            <div className="list-group">
                <div className="list-group-item" target="_blank">
                    {this.props.link.itemSlices.map(itemSlice => itemSlice.component)}
                </div>
            </div>
        )
    }
}