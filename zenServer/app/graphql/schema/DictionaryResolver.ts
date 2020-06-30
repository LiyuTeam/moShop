import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import DictionaryEntity from '../../entities/mongodb/Dictionary/DictionaryEntity';
import { Context } from 'egg';

@ObjectType({ description: '数据字典' })
class Dictionary implements DictionaryEntity {
  @Field() _id: string;
  @Field() comment: string;
  @Field() created_at: Date;
  @Field() dictType: number;
  @Field() mainCode: string;
  @Field() name: string;
  @Field() status: number;
  @Field() subCode: string;
  @Field() title: string;
  @Field() uid: string;
  @Field() updated_at: Date;
}

@InputType({ description: 'Add New Dictionary' })
class AddDictionaryInput implements Partial<DictionaryEntity> {
  @Field({ nullable: true }) dictType: number;
  @Field() mainCode: string;
  @Field() name: string;
  @Field() subCode: string;
  @Field({ nullable: true })
  title: string
}


@Resolver()
export class DictionaryResolver {

  @Query(() => [ Dictionary ])
  async getDictnary(
    @Ctx() ctx: Context,
      @Arg('mainCode', { nullable: true }) mainCode?: string,
      @Arg('subCode', { nullable: true }) subCode?: string,
  ): Promise<[Dictionary]> {
    const result = await ctx.service.dictionary.list({
      mainCode, subCode,
    } as DictionaryEntityType) as [Dictionary];

    return result;
  }

  @Mutation(() => Dictionary, { description: '新增数据字典' })
  async addDictionary(
    @Arg('data') doc: AddDictionaryInput,
      @Ctx() ctx: Context,
  ): Promise<Partial<Dictionary>> {
    const result = await ctx.service.dictionary.add(doc) as Partial<Dictionary>;
    return result;
  }
}
