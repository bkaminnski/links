import React from 'react';
import TopicMessagesListStore from './TopicMessagesListStore.js';
import TopicMessageRow from './TopicMessageRow.jsx';

export default class TopicMessagesList extends React.Component {

    constructor() {
        super();
        this.topicMessagesListStore = new TopicMessagesListStore(this);
    }

    componentDidMount() {
        this.topicMessagesListStore.subscribeToEvents();
    }

    componentWillUnmount() {
        this.topicMessagesListStore.unsubscribeFromEvents();
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">Backend topic messages - live preview</div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Message ID</th>
                        <th>Event name</th>
                        <th>Tracking ID</th>
                        <th>Creating service name</th>
                        <th>Creation timestamp</th>
                        <th>Reception timestamp</th>
                        <th>Payload</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.topicMessages.map(topicMessage => <TopicMessageRow
                            key={topicMessage.messageId}
                            topicMessage={topicMessage}
                        />)
                    }
                </tbody>
            </table>
        </div>
    }
}
