import * as path from 'path';
import * as fs from 'fs';
import { Context, Application } from 'egg';
import walkPath from './walkPath';
// import { BaseEntity, ConnectionOptions, getRepository } from 'typeorm';
import { ConnectionOptions, Connection, getConnectionManager } from 'typeorm';

/**
 * 自动扫描clients中的entities路径文件,加入到ctx.autoEntities中
 * @param ctx
 */
export async function autoEntities(ctx: Context): Promise<Map<string, any>> {
  const SYMBOL_AUTO_ENTITIES = Symbol('Context#autoEntities');
  const app: Application = ctx.app;

  //  整理clients / client配置
  const clients = new Map();

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

      const connMan = getConnectionManager();
      const classes = new Map();
      for (const name of clients.keys()) {
        const client: ConnectionOptions = clients.get(name);
        const entitiesPaths = client.entities?.map(p =>
          walkPath.walkFiles(path.join(app.baseDir, path.dirname(p.toString())), 'ts')
          ).reduce((o, v) => o.concat(v), []) as string[];

        Object.assign(client, { entitiesPaths });
        clients.set(name, client);

        ctx.logger.debug('clients entities paths', client);

        for (const entity of entitiesPaths) {
          const entityPath = path.join(entity);

          if (fs.existsSync(entityPath)) {
            // const Entity = () => import(entityPath);
            const EntityName = path.basename(entity).split('.')[0].toLowerCase();
            const ConnName = [
              name.toLowerCase(),
              EntityName,
            ].join('#');

            classes.set(ConnName,
              async () => {
                let conn: Connection;
                try {
                  conn = connMan.get(ConnName);
                } catch (e) {
                  const repoClientConfig = Object.assign(
                    {}, client,
                    {
                      name: ConnName,
                      entities: [ entityPath.replace(app.baseDir, '') ],
                    },
                  );
                  await connMan.create(repoClientConfig).connect()
                    .then(connection => {
                      ctx.logger.info('create database conn ok, name ', connection.name, connection.options);
                      return connection;
                    });
                  conn = connMan.get(ConnName);
                }

                return conn.getRepository(EntityName);
              });
          }
        }
      }
      ctx[SYMBOL_AUTO_ENTITIES.toString()] = classes;
      ctx.logger.info('entities', ctx[SYMBOL_AUTO_ENTITIES.toString()]);
    } else {
      ctx.logger.error('typeorm need configuration client or clients');
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
  }

  return ctx[SYMBOL_AUTO_ENTITIES.toString()];
}
