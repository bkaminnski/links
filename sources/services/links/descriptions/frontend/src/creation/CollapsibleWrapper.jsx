import React from 'react';

export default class CollapsibleWrapper extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="collapse" ref={(collapsibleWrapper) => { this.collapsibleWrapper = collapsibleWrapper; }}>
            {this.props.children}
        </div>;
    }

    collapse() {
        $(this.collapsibleWrapper).collapse();
    }
}
