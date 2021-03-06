import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// This is the apollo client instance and it's being passed to
// the ApolloProvider to share it with whole app
// Get started - https://www.apollographql.com/docs/react/essentials/get-started
const client = new ApolloClient({
  uri: "https://mrserver.now.sh/"
})

// React-Apollo includes a component for providing a client instance to a React component tree,
// and a higher-order component for retrieving that client instance.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
