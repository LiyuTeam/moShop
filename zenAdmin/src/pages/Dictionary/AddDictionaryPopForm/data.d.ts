//  dictionary 字段结构
export interface dictionaryFieldsType {
  title: string,
  mainCode: string,
  subCode: string,
  id?: string,
  status: number,
}

export type dictionaryFieldStatusType = {
  1: 'usable', 2: 'forbidden', 3: 'deleted', 4: 'draft'
}

