import { Column, CreateDateColumn, Generated, ObjectID, ObjectIdColumn,
  UpdateDateColumn } from 'typeorm';


interface EntityIMPL {
  _id?: any;
  id?: any;
  uid: string;
  created_at: Date;
  updated_at: Date;
  status: number;
}

export class MongodbEntity implements EntityIMPL {

  @ObjectIdColumn() _id: ObjectID;
  @Column() status: number;
  @Generated('uuid') @Column() uid: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;

}
