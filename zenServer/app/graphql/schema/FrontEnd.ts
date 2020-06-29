import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from 'vm';

interface FrontEndIMPL {
  pages: [];
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


@ObjectType('前端页面模块')
export class PageConfig implements PageConfigIMPL {
  @Field() key: string;
  @Field() name: string;
  @Field() pageType: 'single' | 'mulit';
  @Field() title: string;
}

@ObjectType('表单文本字段')
export class FormFieldTextConfig implements FormFieldConfigIMPL {
  @Field() key: string;
  @Field() title: string;
  @Field() type: 'input';
  @Field() value: string ;
}

@ObjectType('前端wxapp表单区块')
export class WxAppSettingFormConfig implements FormConfigIMPL {
  @Field() key: string;
  @Field() name: string;
  @Field(() => ([ FormFieldTextConfig ])) cloumns: FormFieldTextConfig[];
}

@ObjectType('前端配置接口')
export class FrontEndConfig implements FrontEndIMPL {
  @Field() pages: [];
}


@Resolver()
export class PageConfigResovler {
  @Query(() => [ PageConfig ])
  async getPage(
    @Ctx() ctx: Context,
      @Arg('pageName', { nullable: true }) pageName?: string,
  ): Promise<any> {
    console.log(ctx);
    return [
      {
        key: 'wxapp',
        name: pageName,
        pageType: 'single',
        title: '微信小程序',
      } as PageConfig,
    ];
  }
}
