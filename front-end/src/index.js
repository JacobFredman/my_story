import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer1 from './store/reducer1';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import Firebase, { FirebaseContext } from './components/Firebase';




export const store = createStore(reducer1);

// ReactDOM.render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>,
//   document.getElementById('root'));


ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}><App /></Provider>
</FirebaseContext.Provider>,
    document.getElementById('root'));
// registerServiceWorker();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
