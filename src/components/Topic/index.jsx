import React, { useState } from 'react';
// apollo
import { withApollo } from 'react-apollo';
import { TOPICS_QUERY, UPVOTE_MUTATION, DOWNVOTE_MUTATION } from '../../graphql_tags';

export default withApollo(({ client, topic }) => {
  // useState hook is being used to manage loading state
  const [loading, setLoading] = useState(false)

  // A function to update the cache with the new data returned from the server
  const updateCache = (proxy, { data }) => {
    const { topics } = proxy.readQuery({ query: TOPICS_QUERY })
    const sortedTopics = topics.sort((a, b) => b.votes - a.votes)
    proxy.writeQuery({ query: TOPICS_QUERY, data: { topics: sortedTopics } })
  }

  // An optimistic response for the voted topic
  // this response will be used to update the
  // cache and makes the UI respond much faster
  // before the actual response arrives from
  // the server then update the cache again with
  // the actual response
  // https://www.apollographql.com/docs/react/features/optimistic-ui
  const response = (voteType) => ({
    __typename: "Topic",
    id: topic.id,
    content: topic.content,
    votes: voteType === "upVote" ? ++topic.votes : --topic.votes
  })

  // Render Upvote
  const upVote = (
    <span onClick={(e) => {
      setLoading(true)
      !loading && client.mutate({
        mutation: UPVOTE_MUTATION,
        variables: { id: topic.id },
        optimisticResponse: {
          upVote: response('upVote')
        },
        update: updateCache
      }).then(() => setLoading(false))
    }} className="upvote" style={{ cursor: loading && "progress", color: loading && "silver" }}>▲</span>
  )

  // Render Downvote
  const downVote = (
    <span onClick={(e) => {
      setLoading(true)
      !loading && client.mutate({
        mutation: DOWNVOTE_MUTATION,
        variables: { id: topic.id },
        optimisticResponse: {
          downVote: response('downVote')
        },
        update: updateCache
      }).then(() => setLoading(false))
    }} className="downvote" style={{ cursor: loading && "progress", color: loading && "silver" }}>▼</span>
  )

  return (
    <div className="topic" key={topic.key}>
      <div className="votes">
        {upVote}
        <span className="number">{topic.votes}</span>
        {downVote}
      </div>
      <p className="content">
        {topic.content}
      </p>
    </div>
  )
})