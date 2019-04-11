import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// apollo
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

const TOPICS_QUERY = gql`
  query getTopics {
    topics(orderBy: votes_DESC) {
      id
      content
      votes
    }
  }
`

const UPVOTE_MUTATION = gql`
  mutation UpVote($id: ID!) {
    upVote(id: $id) {
      id content votes
    }
  }
`

const DOWNVOTE_MUTATION = gql`
  mutation DownVote($id: ID!) {
    downVote(id: $id) {
      id content votes
    }
  }
`

const Topic = withApollo(({topic}) => (
  <div className="topic" key={topic.key}>
    <div className="votes">
      <span className="upvote">▲</span>
      <span className="number">{topic.votes}</span>
      <span className="downvote">▼</span>
    </div>
    <p>
      {topic.content}
    </p>
  </div>
))

class App extends Component {
  render() {
    return (
      <div className="App">
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
