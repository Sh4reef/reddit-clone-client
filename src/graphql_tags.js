import gql from 'graphql-tag';

const TOPICS_QUERY = gql`
  query getTopics {
    topics(orderBy: votes_DESC) {
      id
      content
      votes
    }
  }
`

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