import React from 'react';

export default class TopicMessageRow extends React.Component {
    render() {
        return <tr>
            <td>{this.props.topicMessage.messageId}</td>
            <td>{this.props.topicMessage.eventName}</td>
            <td>{this.props.topicMessage.trackingId}</td>
            <td>{this.props.topicMessage.creatingServiceName}</td>
            <td>{this.props.topicMessage.creationTimestamp}</td>
            <td>{this.props.topicMessage.receptionTimestamp}</td>
            <td>{this.props.topicMessage.payload}</td>
        </tr>;
    }
}
