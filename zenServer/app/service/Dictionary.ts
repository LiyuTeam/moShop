import { Service } from 'egg';
import { checkDuplicater, initRepo, notUpdateDoc } from './lib/publicMixin';

/**
 * Dictionary Service
 */
export default class Dictionary extends Service {

  private _dbName = 'mongodb#dictionary'

  /**
   * 新增数据字典
   * @param props
   */
  public async add(props: DictionaryEntityType) {
    const
      { ctx } = this,
      DictionaryDoc = notUpdateDoc(props),
      { repo } = await initRepo(ctx, this._dbName, 'mongodb'),
      { isDup, checkDuplicate, checkWhere } = await checkDuplicater(
        repo,
        props,
        [ 'mainCode', 'subCode' ],
      );

    if (isDup) {
      ctx.logger.warn(`${this.constructor.name} add a Duplicate item by`, checkWhere);
      return checkDuplicate;
    }

    let result;

    try {
      result = await repo.save(DictionaryDoc);
    } catch (e) {
      ctx.logger.error(`${this.constructor.name} add has error`, e);
    }

    return result;
  }

  /**
   * 查询数据字典
   * @param props
   */
  public async list(props: DictionaryEntityType) {
    const
      { ctx } = this,
      DictionaryDoc = notUpdateDoc(props),
      { repo } = await initRepo(ctx, this._dbName, 'mongodb');
    ctx.logger.debug(DictionaryDoc);
    let result;
    try {
      result = await repo.find();
    } catch (e) {
      ctx.logger.error(`${this.constructor.name} list has error`, e);
    }

    return result ?? [];
  }
}
