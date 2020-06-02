module.exports = {
  Query: {
    user(root: any, { account }, ctx) {
      console.log(account, root);
      return ctx.connector.user.getUser(account);
    },
  },
};
