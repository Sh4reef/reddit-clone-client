# Simple Digg / Reddit Clone

The following technologies have been used:
- [React](https://reactjs.org/): A JavaScript library for building user interfaces
- [Apollo Client](https://www.apollographql.com/docs/react/): is the best way to use GraphQL to build client applications. The client is designed to help you quickly build a UI that fetches data with GraphQL, and can be used with any JavaScript front-end.

## What to expect
Through this app the user can create a new<br/>
topic or upvote and downvote existing topics.

## Live
Expect a delay when opening the link because it's free tier<br/>
[https://moovaz-reddit-client-noulcwrhlq.now.sh](https://moovaz-reddit-client-noulcwrhlq.now.sh)

## Launch the app locally
- Prerequisite
  - [reddit-clone-server](https://github.com/Sh4reef/reddit-clone-server)
- Clone the repository<br/>
```
git clone https://github.com/Sh4reef/reddit-clone-client.git
cd reddit-clone-client
npm install
npm start
```
- Update the URI endpoint
```javascript
const client = new ApolloClient({
  uri: "http://localhost:4000/"
})
```