import {
  Column, CreateDateColumn, Generated, ObjectID, ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';


interface EntityIMPL {
  uid: string;
  created_at: Date;
  updated_at: Date;
  status: number;
}

export class MongodbEntity implements EntityIMPL {

  @ObjectIdColumn({ comment: '_id' }) _id: ObjectID | string;
  @Column({ comment: '状态(1可用2禁用3删除)', default: 1 }) status: number;
  @Generated('uuid') @Column({ comment: '唯一ID(自动)' }) uid: string;
  @CreateDateColumn({ comment: '创建日期' }) created_at: Date;
  @UpdateDateColumn({ comment: '更新日期' }) updated_at: Date;
  @Column({ comment: '备注', nullable: true }) comment: string;
}
