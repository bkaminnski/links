import React from 'react';
import ReactDOM from 'react-dom';

export default class Link extends React.Component {
    render() {
        return (
                <div>
                    <div><b>Url:</b> <a href={this.props.link.url}>{this.props.link.url}</a></div>
                    <div><b>Keywords:</b> {this.props.link.keywords}</div>
                    {this.props.link.components}
                    <hr />
                </div>
                )
    }
}
