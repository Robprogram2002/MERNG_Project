import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { Fetch_POST_QUERY } from "../util/graphql";
import { useMutation } from "@apollo/client";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREAT_POST_MUTATION, {
    variables: values,
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: Fetch_POST_QUERY,
    //   });
    //   data.getPosts = [result.data.createPost, ...data.getPosts];
    //   proxy.writeQuery({ query: Fetch_POST_QUERY, data });
    //   values.body = "";
    // },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li> {error.graphQLErrors[0]} </li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREAT_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default PostForm;
