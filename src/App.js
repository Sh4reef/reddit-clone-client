import React, { Component } from 'react';
import './App.css';
// apollo
import { Query } from 'react-apollo';
import { TOPICS_QUERY } from './graphql_tags';
// components
import Header from './components/Header';
import Topic from './components/Topic';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Query query={TOPICS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error!</div>
            return data.topics.map((topic) => (
              <Topic key={topic.id} topic={topic} />
            ))
          }}
        </Query>
      </div>
    );
  }
}

export default App;
