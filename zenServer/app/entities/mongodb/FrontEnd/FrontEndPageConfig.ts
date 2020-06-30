import { Column, Entity } from 'typeorm';
import { MongodbEntity } from '../../../types/unitType';

@Entity('FrontEndPageConfig')
export class FrontEndPageConfig extends MongodbEntity {
  @Column({ nullable: false, comment: '页码key' })
  key: string

  @Column({ nullable: false, comment: '页面名字' })
  name: string

  @Column({ comment: '页面标题' })
  title?: string

  @Column({ comment: '页面类型', default: 'single' })
  pageType: string

}

export default FrontEndPageConfig;

