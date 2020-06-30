// import * as path from 'path';
// import * as fs from 'fs';
// import { Context, Application } from 'egg';
// import walkPath from './walkPath';
// import { ConnectionOptions } from 'typeorm';
//
//
// /**
//  * 自动扫描clients中的entities路径文件,加入到ctx.autoEntities中
//  * @param ctx
//  */
//
// // todo 增加全局hook事件,把扫描动作放到egg生命周期中
// export function autoEntities(ctx: Context): Map<any, any> {
//   const SYMBOL_AUTO_ENTITIES = Symbol('Context#autoEntities');
//   const app: Application = ctx.app;
//   const ormConfig = app.config.typeorm;
//   //  整理clients / client配置
//   const clients = new Map();
//   const classes = new Map();
//
//   if (!ormConfig) {
//     ctx.logger.warn('autoEntities need config.typeorm in your application config.{env}.ts');
//     return new Map();
//   }
//
//   if (!ctx[String(SYMBOL_AUTO_ENTITIES.valueOf())]) {
//
//     if (ormConfig.client) {
//       clients.set(ormConfig.client.name, ormConfig.client);
//     }
//
//     if (ormConfig.clients) {
//       ormConfig.clients.forEach(client => {
//         clients.set(client.name, client);
//       });
//     }
//
//     if (clients.size > 0) {
//
//       for (const name of clients.keys()) {
//         const client: ConnectionOptions = clients.get(name);
//
//
//         // 迭代client配置,遍历entity文件
//         client.entities?.forEach(p => {
//           const entitiesFiles = walkPath.walkFiles(path.join(app.baseDir, path.dirname(p.toString())).replace(/[\\]\*.*/, ''), 'ts');
//           entitiesFiles?.forEach(entity => {
//             const entityPath = path.join(entity);
//
//             if (fs.existsSync(entityPath)) {
//               const Entity = import(entityPath);
//               //  entity以[client名字#entity名字]的KV形式挂载到ctx的autoEntities<Map>中
//               const EntityName = path.basename(entity).split('.')[0].toLowerCase();
//               const ConnName = [ name.toLowerCase(), EntityName ].join('#');
//               ctx.logger.info('cur client is ', name, ConnName);
//               classes.set(ConnName, Entity);
//               ctx.logger.debug('autoEntities get %s entity key is %s , from %s', EntityName, ConnName, entityPath);
//             }
//           });
//         });
//
//         clients.set(name, client);
//       }
//     } else {
//       ctx.logger.error('typeorm need configuration client or clients');
//     }
//     ctx[String(SYMBOL_AUTO_ENTITIES.toString())] = classes;
//   }
//
//   return ctx[SYMBOL_AUTO_ENTITIES.toString()];
// }
