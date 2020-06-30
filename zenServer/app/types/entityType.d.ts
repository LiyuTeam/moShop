/**
 * 用户账户
 */
interface UserAccountEntityType {
  account: string;
  password: string;
  userName: string;
  isAdmin: number;
  secretToken: string;
  phone: number;

}

/**
 * 数据字典 - 字典项
 */
interface DictionaryEntityType {
  mainCode: string;
  subCode: string;
  title?: string|null;
  name: string;

  dictType: number;
}

/**
 * 数据字典 - 字典值项
 */
interface DictionaryValueEntityType {
  fkDict: any;

  title: string|null;
  name: string;

  valueType: number;
  value: any|null;

}

interface DictionaryCategoryEntityType {
  name: string;
  title: string|null;

}
