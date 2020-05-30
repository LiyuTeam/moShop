interface ClassNameBuilderParams {
  names: Array<Array<string>>
  deepSign?: string
}

/**
 * 动态className生成器
 * @param classNames [[]] 第一层用于拼装多个className,第二层用于拼装单个className
 * @param deepSign 第二层拼接符
 */
export function classNameBuilder({names, deepSign = '-'}: ClassNameBuilderParams) {
  return names.map(n => n.join(deepSign)).join(' ')
}

export default {}
