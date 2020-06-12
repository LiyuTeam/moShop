import { Application, Context } from 'egg';

export default (_options: any, app: Application) => {

  return async function(ctx: Context, next) {
    // webpack hot reload
    if (ctx.path !== '/__webpack_hmr') {
      await next;

      // ignore status if not 404
      if (ctx.status !== 404 || ctx.method !== 'GET') {
        return;
      }

      ctx.status = 200;
      const path = ctx.path;
      if (/\.js$/.test(path)) {
        ctx.set('Content-Type', 'application/javascript');
      }
      if (/\.css/.test(path)) {
        ctx.set('Content-Type', 'text/css');
      }
    }

    await app.typeNuxt.render(ctx.req, ctx.res);
  };
};
