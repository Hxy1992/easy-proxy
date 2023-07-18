// 输入校验
import { pathExists, readJson } from 'fs-extra/esm'
import { printInfo, printWarning, printError } from "./log.js"

export async function validate(path) {
  try {
    if (!path.endsWith('.json')) {
      printError('文件格式只支持json：' + path)
      return Promise.resolve(false)
    }
    const ex = await pathExists(path)
    if (!ex) {
      printError('文件不存在：' + path)
      return Promise.resolve(false)
    }
    const options = readJson(path)
    printInfo(`${path} 文件读取成功`)
    return Promise.resolve(options)
  } catch (err) {
    printError(JSON.stringify(err))
    return Promise.resolve(false)
  }
}
