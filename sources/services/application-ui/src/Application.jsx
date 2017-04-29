import React from 'react';
import ReactDOM from 'react-dom';

export default class Application extends React.Component {
    render() {
        return (
            <div>
                Application
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('application'));