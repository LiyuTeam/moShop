import * as path from 'path';
import * as fs from 'fs';
import { Context, Application } from 'egg';
import walkPath from './walkPath';
// import { BaseEntity, ConnectionOptions, getRepository } from 'typeorm';
import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

/**
 * 自动扫描clients中的entities路径文件,加入到ctx.autoEntities中
 * @param ctx
 */
export function autoEntities(ctx: Context) {
  const SYMBOL_AUTO_ENTITIES = Symbol('Context#autoEntities');
  const app: Application = ctx.app;

  //  整理clients / client配置
  const clients = new Map();
  const classes = new Map();

  if (!ctx[SYMBOL_AUTO_ENTITIES.toString()]) {

    if (app.config.typeorm.client) {
      clients.set(app.config.typeorm.client.name, app.config.typeorm.client);
    }

    if (app.config.typeorm.clients) {
      app.config.typeorm.clients.forEach(client => {
        clients.set(client.name, client);
      });
    }

    if (clients.size > 0) {
      clients.forEach((client: ConnectionOptions, name: string) => {
        const entitiesPaths = client.entities?.map(p =>
          walkPath.walkFiles(path.join(app.baseDir, p.toString()), 'ts')
        ).reduce((o, v) => o.concat(v), []);
        Object.assign(client, { entitiesPaths });
        clients.set(name, client);

        entitiesPaths?.forEach(entity => {
          const entityPath = path.join(entity);
          ctx.logger.info(entityPath);
          if (fs.existsSync(entityPath)) {
            const Entity = () => import(entityPath);
            classes.set(`${name.toLowerCase()}#${path.basename(entity).split('.')[0].toLowerCase()}`, async () => {
              let conn = getConnection(client.name);
              if (!conn) {
                conn = await createConnection(client);
              }

              return conn.getRepository(Entity);
            });
          }
        });

      });
    } else {
      //   ctx.logger.error('typeorm need configuration client or clients');
    }


    // const entitiesPaths: string[] | undefined = app.config.typeorm.clients ?
    //   app.config.typeorm.clients.reduce((o: string[], v: any) => o.concat(v.entities), []) : [];
    //
    // const types = entitiesPaths?.map(p =>
    //   walkPath.walkFiles(path.join(app.baseDir, p), 'ts')
    // ).reduce((o, v) => o.concat(v), []);

    // ctx.logger.info('types array', clients);
    // const classes = new Map();
    // // types.forEach(type => {
    // clients.forEach(client => {
    //   const typePath = path.join(client);
    //   ctx.logger.info(typePath);
    //   if (fs.existsSync(typePath)) {
    //     const Entity = () => import(typePath);
    //     classes.set(path.basename(client).split('.')[0].toLowerCase(), Entity);
    //   }
    // });

    ctx[SYMBOL_AUTO_ENTITIES.toString()] = classes;
    ctx.logger.info('entities', ctx[SYMBOL_AUTO_ENTITIES.toString()]);
  }

  return ctx[SYMBOL_AUTO_ENTITIES.toString()];
}
