import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client.js';
import Link from './Link.jsx';

class Links extends React.Component {

  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = { links: [] };
    this.client.links().then(l => this.setState({ links: l }));
  }
  render() {
    return (
      <div>
        {
          this.state.links.map(l =>
            <Link key={l.url} url={l.url} keywords={l.keywords} description={l.description} />
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<Links />, document.getElementById('links'));