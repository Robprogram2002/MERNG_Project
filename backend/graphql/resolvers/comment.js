const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const isAuth = require("../../Utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = isAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be enpty",
          },
        });
      }

      try {
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });

          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not exist");
        }
      } catch (err) {}
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = isAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (element) => element.id === commentId
          );

          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed for this user");
          }
        } else {
          throw new UserInputError("Post not exist");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  Query: {},
};
