import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from 'vm';

interface FrontEndIMPL {
  pages: PageConfigIMPL[];
}

interface PageConfigIMPL {
  key: string;
  name: string;
  title: string;
  pageType: 'single' | 'mulit';
}

interface FormConfigIMPL {
  key: string;
  name: string;
  cloumns: FormFieldConfigIMPL[];
}

interface FormFieldConfigIMPL {
  key: string;
  title: string;
  value: any;
  type: 'input' | 'textArea' | 'date' | 'checkbox';
}


@ObjectType({ description: '表单文本字段' })
export class FormFieldTextConfig implements FormFieldConfigIMPL {
  @Field() key: string;
  @Field() title: string;
  @Field() type: 'input';
  @Field() value: string;
}

@ObjectType({ description: '前端wxapp表单区块' })
export class FormConfig implements FormConfigIMPL {
  @Field() key: string;
  @Field() name: string;
  @Field(() => [ FormFieldTextConfig ]) cloumns: FormFieldTextConfig[] | [];
}

@ObjectType({ description: '前端页面模块' })
export class PageConfig implements PageConfigIMPL {
  @Field() key: string;
  @Field() name: string;
  @Field() pageType: 'single' | 'mulit';
  @Field() title: string;
  @Field(() => [ FormConfig ]) forms: FormConfig[] | [];
}

@ObjectType({ description: '前端配置接口' })
export class FrontEndConfig implements FrontEndIMPL {
  @Field(() => [ PageConfig ]) pages: PageConfig[];
}


@Resolver()
export class PageConfigResovler {
  @Query(() => [ PageConfig ])
  async getPage(
  @Ctx() ctx: Context,
    @Arg('pageKey', { nullable: true }) pageKey?: string,
  ) {
    ctx.logger.debug('getPage query has been called');
    return [
      {
        key: pageKey,
        name: 'wxapp',
        pageType: 'single',
        title: '微信小程序',
        forms: await this.getFormByPage(ctx, pageKey),
      } as PageConfig,
    ];
  }

  @Query(() => [ FormConfig ])
  async getFormByPage(
  @Ctx() ctx: Context,
    @Arg('formKey', { nullable: true }) formKey?: string,
  ) {
    ctx.logger.debug('getFormByPage query has been called');
    return [
      {
        key: formKey,
        name: 'wxappForm',
        cloumns: [
          new FormFieldTextConfig(),
          new FormFieldTextConfig(),
        ],
      } as FormConfig,
    ];
  }
}
