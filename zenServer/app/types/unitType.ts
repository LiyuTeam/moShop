import { Field, ID } from 'type-graphql';

export interface MongodbEntityType {
  _id: string;
}

export class MongodbEntity implements MongodbEntityType {
  @Field(type => ID, { nullable: true, description: 'Mongodb主键_id' })
  public _id: string;

}

export interface SQLEntityType {
  id: number;
}

export class SQLEntity implements SQLEntityType {
  @Field(type => ID, { nullable: true, description: 'SQL关系型数据库主键id' })
  public id: number;

}
