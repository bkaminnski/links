import React from 'react';

export default class LinkListItem extends React.Component {
    render() {
        return (
            <div className="list-group">
                <div className="list-group-item">
                    {this.props.link.itemSlices.map(itemSlice => itemSlice.component)}
                </div>
            </div>
        )
    }
}