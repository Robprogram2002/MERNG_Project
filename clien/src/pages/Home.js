import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import PostCard from "../layouts/PostCard";
import PostForm from "../layouts/PostForm";

const Home = React.memo(() => {
  const auth_comtext = useContext(AuthContext);

  const { loading, data } = useQuery(Fetch_POST_QUERY);
  if (loading) {
    return <h1>Cargando los datos ....</h1>;
  } else {
    const posts = data.getPosts;
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {auth_comtext.user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}

          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    );
  }
});

const Fetch_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
