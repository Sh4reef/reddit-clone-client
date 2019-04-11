import React, { Component, useState } from 'react';
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

const Topic = withApollo(({ client, topic }) => {
  const [loading, setLoading] = useState(false)
  return (
    <div className="topic" key={topic.key}>
      <div className="votes">
        <span onClick={(e) => {
          setLoading(true)
          !loading && client.mutate({
            mutation: UPVOTE_MUTATION,
            variables: { id: topic.id },
            optimisticResponse: {
              upVote: {
                __typename: "Topic",
                id: topic.id,
                content: topic.content,
                votes: ++topic.votes
              }
            },
            update: (proxy, { data }) => {
              const { topics } = proxy.readQuery({ query: TOPICS_QUERY })
              const sortedTopics = topics.sort((a, b) => b.votes - a.votes)
              proxy.writeQuery({ query: TOPICS_QUERY, data: { topics: sortedTopics } })
            }
          }).then(() => setLoading(false))
        }}
          className="upvote" style={{ cursor: loading && "progress", color: loading && "silver" }}>▲</span>
        <span className="number">{topic.votes}</span>
        <span onClick={(e) => {
          setLoading(true)
          !loading && client.mutate({
            mutation: DOWNVOTE_MUTATION,
            variables: { id: topic.id },
            optimisticResponse: {
              downVote: {
                __typename: "Topic",
                id: topic.id,
                content: topic.content,
                votes: --topic.votes
              }
            },
            update: (proxy, { data }) => {
              const { topics } = proxy.readQuery({ query: TOPICS_QUERY })
              const sortedTopics = topics.sort((a, b) => b.votes - a.votes)
              proxy.writeQuery({ query: TOPICS_QUERY, data: { topics: sortedTopics } })
            }
          }).then(() => setLoading(false))
        }} className="downvote" style={{ cursor: loading && "progress", color: loading && "silver" }}>▼</span>
      </div>
      <p className="content">
        {topic.content}
      </p>
    </div>
  )
})

const Header = (props) => {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const invalid = content.length === 0 || content.length > 255
  const exceeded = content.length > 255
  return (
    <header className="header">
      <div onClick={() => {
        setShow(!show)
      }} className="create">
        Create new topic
      </div>
      <div className={show ? "overlay show-overlay" : "overlay"}></div>
      <div className={show ? "modal show-modal" : "modal"}>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log(content.length)
        }}>
          <div className="label">
            <label>create new topic</label>
          </div>
          <textarea onChange={(e) => setContent(e.target.value.trim())} placeholder="Content..." />
          <div className="number-of-characters" style={{ color: exceeded ? "red" : "" }}>
            {255 - content.length}/255 {exceeded && "Exceeded"}
          </div>
          <button type="submit" disabled={invalid} value={content} className="create-btn">Create</button>
          <button onClick={(e) => {
            e.preventDefault()
            setShow(!show)
          }} className="cancel-btn">Cancel</button>
        </form>
      </div>
    </header>
  )
}

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
