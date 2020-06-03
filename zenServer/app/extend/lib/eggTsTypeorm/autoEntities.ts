import * as path from 'path';
import * as fs from 'fs';
import { Context, Application } from 'egg';
import walkPath from './walkPath';

const SYMBOL_AUTO_ENTITIES = Symbol('Context#autoEntities');

export function autoEntities(ctx: Context) {
  const app: Application = ctx.app;
  const entitiesPaths: string[] | undefined = app.config.typeorm.clients ?
    app.config.typeorm.clients.reduce((o: string[], v: any) => o.concat(v.entities), []) : [];

  const types = entitiesPaths?.map(p =>
    walkPath.walkFiles(path.join(app.baseDir, p), 'ts')
  ).reduce((o, v) => o.concat(v), []);

  ctx.logger.info('types array', types);

  Object.defineProperty(ctx, 'autoEntities', {
    get() {
      if (!this[SYMBOL_AUTO_ENTITIES]) {
        const classes = new Map();

        types.forEach(type => {
          const typePath = path.join(type);
          console.log(typePath);
          if (fs.existsSync(typePath)) {
            const Entity = () => import(typePath);
            classes.set(path.basename(type), Entity);
          }
        });

        this[SYMBOL_AUTO_ENTITIES] = classes;
      }
      ctx.logger.info('entities', this[SYMBOL_AUTO_ENTITIES]);

      return this[SYMBOL_AUTO_ENTITIES];
    },
  });
}
