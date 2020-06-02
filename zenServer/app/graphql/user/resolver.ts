module.exports = {
  Query: {
    user(root, { account }, ctx) {
      console.log(ctx.constructor);
      return ctx.connector.user.getUser({ account });
    },
  },
};
