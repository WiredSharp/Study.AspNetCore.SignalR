import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import SimpleChat from './SimpleChat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SimpleChat/>, document.getElementById('root'));
registerServiceWorker();