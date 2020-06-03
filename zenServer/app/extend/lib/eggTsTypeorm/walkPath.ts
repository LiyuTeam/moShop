import * as fs from 'fs';
import * as path from 'path';

declare type fileExt = 'ts' | 'js' | null;
declare type walkReturn = { subChildren: string[]; fileMatches: string[] };

export default {
  walk(dir: string): string[] {
    const { subChildren } = this._walk(dir, dir, null) as walkReturn;
    return subChildren;
  },
  walkFiles(dir: string, ext: fileExt): string[] {
    const { fileMatches } = this._walk(dir, dir, ext) as walkReturn;
    return fileMatches;
  },
  /**
   * 遍历文件夹路径数组
   * @param basePath
   * @param dir
   * @param fileExt
   * @private
   * @return walkReturn
   */

  _walk(basePath: string, dir: string, fileExt: fileExt): walkReturn {
    let children: string[] = [];
    let fileMatch: string[] = [];

    fs.readdirSync(dir).forEach(dirname => {
      const deepPath = path.join(dir, dirname);
      const stat = fs.statSync(deepPath);
      if (stat && stat.isDirectory()) {
        children.push(deepPath.replace(basePath + path.sep, ''));
        const { subChildren, fileMatches } = this._walk(basePath, deepPath, fileExt);
        children = children.concat(subChildren);
        fileMatch = fileMatch.concat(fileMatches);
      } else if (fileExt && stat.isFile()) {
        fileMatch.push(deepPath.replace(basePath + path.sep, ''));
      }
    });
    return { subChildren: children, fileMatches: fileMatch };
  },


};
