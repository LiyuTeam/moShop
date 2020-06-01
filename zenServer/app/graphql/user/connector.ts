class ArticleConnector {
  ctx: any

  constructor(ctx) {
    this.ctx = ctx;
  }
  async getArticleInfoByService(iArticleID) {
    return await this.ctx.service.user.getUser(iArticleID);
  }
}
module.exports = ArticleConnector;
