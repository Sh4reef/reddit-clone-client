import React, { Component } from 'react';
import './App.css';
// apollo
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// components
import Header from './components/Header';
import Topic from './components/Topic';

const TOPICS_QUERY = gql`
  query getTopics {
    topics(orderBy: votes_DESC) {
      id
      content
      votes
    }
  }
`

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
