import gql from 'graphql-tag';

// The TOPIC_QUERY could be send to the server
// And the topics field in this query is called the root field of the query.
// Everything that follows the root field, is called the payload of the query.
// The fields that’s specified in this query's payload is id, name and votes

const TOPICS_QUERY = gql`
  query getTopics {
    topics(orderBy: votes_DESC) {
      id
      content
      votes
    }
  }
`

// Mutations follow the same syntactical structure as queries,
// but they always need to start with the mutation keyword.
const NEWTOPIC_MUTATION = gql`
  mutation NewTopic($content: String!) {
    newTopic(content: $content) {
      id content votes
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

export {
  TOPICS_QUERY,
  NEWTOPIC_MUTATION,
  UPVOTE_MUTATION,
  DOWNVOTE_MUTATION
}