import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/rootReducer';
//THUNK allows you to return a function instead of an action in projectActions
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig'

//applyMiddleware etc are called 'store enhancers'
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig,{attachAuthIsReady: true,useFirestoreForProfile: true,userProfile:'users'})
    )
);
//waits until firebase auth is ready then renders to the DOM
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
  })


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
