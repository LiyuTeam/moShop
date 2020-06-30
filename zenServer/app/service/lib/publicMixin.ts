import { DeepPartial, getConnection, getMongoRepository, getRepository, Repository } from 'typeorm';
import lodash from 'lodash';
import { Context } from 'egg';

/**
 * 初始化entity为Repo
 * @param ctx
 * @param entityName
 * @param connectName
 */
export const initRepo = async (ctx: Context, entityName: string, connectName = 'default') => {
  const
    entity = await ctx.app.typeOrm.entities.get(entityName).then(res => res.default),
    conn = await getConnection(connectName),
    repo = connectName === 'mongodb' ?
      await getMongoRepository(entity, conn.name) :
      await getRepository(entity, conn.name);

  return { entity, repo };
};

/**
 * 非更新文档
 * 去掉id和_id
 * @param doc
 */
export const notUpdateDoc = doc => Object.assign({}, doc, { _id: null, id: null });

/**
 * 检查重复项
 * @param repo
 * @param checkDoc
 * @param checkFields
 */
export const checkDuplicater = async (
  repo: Repository<any>,
  checkDoc: {},
  checkFields: string[],
) => {
  const
    checkWhere = lodash.pick(
      checkDoc,
      checkFields),
    checkDuplicate = await repo.findOne(checkWhere as DeepPartial<any>);

  return {
    isDup: Boolean(checkDuplicate),
    checkDuplicate,
    checkWhere,
  };
};
