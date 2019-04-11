import React, { useState } from 'react';
// apollo
import { Mutation } from 'react-apollo';
import { TOPICS_QUERY, NEWTOPIC_MUTATION } from '../../graphql_tags';

export default (props) => {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const exceeded = content.length > 255
  const invalid = content.length === 0 || exceeded
  const getRandomNum = () => Math.floor(Math.random() * Math.floor(987654321))

  const updateCache = (proxy, { data: newTopic }) => {
    const { topics } = proxy.readQuery({ query: TOPICS_QUERY })
    topics.push(newTopic.newTopic)
    proxy.writeQuery({ query: TOPICS_QUERY, data: { topics } })
  }

  const handleSubmit = (newTopic) => (e) => {
    e.preventDefault()
    newTopic({
      optimisticResponse: {
        newTopic: {
          id: String(getRandomNum()),
          content,
          votes: 0,
          __typename: "Topic"
        }
      },
      update: updateCache
    }).then(() => {
      setShow(!show)
      setContent("")
      window.scroll({ top: document.querySelector('body').getBoundingClientRect().bottom, behavior: "smooth" })
    })
  }

  // Mutation component is being used to create a topic
  return (
    <Mutation mutation={NEWTOPIC_MUTATION} variables={{ content }}>
      {(newTopic, { loading }) => (
        <header className="header">
          <h5 className="header-title">Moovaz - Topics</h5>
          <div onClick={() => { setShow(!show) }} className="create">
            Create new topic
          </div>
          <div className={show ? "overlay show-overlay" : "overlay"}></div>
          <div className={show ? "modal show-modal" : "modal"}>
            <form onSubmit={handleSubmit(newTopic)}>
              <div className="label">
                <label>create new topic</label>
              </div>
              <textarea
                onChange={(e) => setContent(e.target.value.trim())}
                value={content}
                placeholder="Content..." />
              <div className="number-of-characters" style={{ color: exceeded ? "red" : "" }}>
                {255 - content.length}/255 {exceeded && "Exceeded"}
              </div>
              <button
                type="submit"
                disabled={invalid || loading}
                className="create-btn"
                style={{ paddingLeft: loading && "30px" }}>
                {loading && <i className="loader"></i>}
                Create
              </button>
              <button onClick={(e) => {
                e.preventDefault()
                setShow(!show)
              }} className="cancel-btn">Cancel</button>
            </form>
          </div>
        </header>
      )}
    </Mutation>
  )
}