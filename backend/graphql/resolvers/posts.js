const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const User = require("../../models/User");
const isAuth = require("../../Utils/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found ");
        } else {
          return post;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      // dentro del context se encuentre la informacion del request object, like the headers
      const user = isAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("The post body must bot be empty");
      }

      try {
        const newPost = new Post({
          body: body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();
        return post;
      } catch (err) {
        console.log(err);
      }
    },
    deletePost: async (_, { postId }, context) => {
      const user = isAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfuly";
        } else {
          throw new AuthenticationError("Action not allowed for this user");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = isAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const currentLike = post.likes.find(
            (like) => like.username === username
          );

          if (currentLike) {
            // already liked
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            // yet not liked
            post.likes.push({
              username,
              createdAt: new Date().toISOString,
            });
          }

          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {}
    },
  },
};
