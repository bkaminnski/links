import React from 'react';
import ReactDOM from 'react-dom';

export default class Link extends React.Component {
  render() {
    return (
      <div>
        <div><b>Url:</b> <a href={this.props.url}>{this.props.url}</a></div>
        <div><b>Keywords:</b> {this.props.keywords}</div>
        <div><b>Description:</b> {this.props.description}</div>
        <hr/>
      </div>      
    )
  }
}
