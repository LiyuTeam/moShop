interface ClassNameBuilderParams {
  props: Array<Array<string>>
  deepSign?: string
}

/**
 * 动态className生成器
 * @param props [[]] 第一层用于拼装多个className,第二层用于拼装单个className
 * @param deepSign 第二层拼接符
 */
export function classNameBuilder({props, deepSign = '-'}: ClassNameBuilderParams) {
  return props.map(n => n.join(deepSign)).join(' ')
}

export default {}
