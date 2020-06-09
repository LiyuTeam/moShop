module.exports = {
  Query: {
    async user(root: any, { account }, ctx) {
      // console.log(root, ctx.connector);
      root = root;
      return await ctx.connector.user.getUser(account);
    },
  },
  Mutation: {
    async createItem(root: any, { account, password }, ctx) {
      root = root;
      return await ctx.connector.user.insUser(account, password);
    },
  },
};
