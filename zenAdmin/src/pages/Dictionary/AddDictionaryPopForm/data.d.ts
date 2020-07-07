//  dictionary
export interface dictionaryFieldsType {
  title: string,
  mainCode: string,
  subCode: string,
  id?: string,
  status: number<dictionaryFieldStatusType>,
}

export type dictionaryFieldStatusType = {
  1: 'usable', 2: 'forbidden', 3: 'deleted', 4: 'draft'
}
