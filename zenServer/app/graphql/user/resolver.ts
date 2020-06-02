module.exports = {
  Query: {
    user(root: any, { account }, ctx) {
      return ctx.connector.user.getUser(account);
    },
  },
};
