require('./style.scss');
import ReactDOM from 'react-dom';
import ApplicationPage from './page/ApplicationPage.jsx';

ReactDOM.render(<ApplicationPage />, document.getElementById('applicationPage'));

PubSub.subscribe('uiEvent', (msg, param1) => {
    console.log(msg);
    console.log(param1);
});