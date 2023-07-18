// 消息打印
import chalk from 'chalk';

const log = console.log;

/**
 * 普通消息
 * @param {*} msg 消息内容
 */
export function printInfo(msg) {
  log(msg);
}
/**
 * 警告消息
 * @param {*} msg 消息内容
 */
export function printWarning(msg) {
  log('warning', chalk.yellow(msg));
}
/**
 * 错误消息
 * @param {*} msg 消息内容
 */
export function printError(msg) {
  log(chalk.bgRed('error'), chalk.red(msg));
}
/**
 * 成功
 * @param {*} msg 消息内容
 */
export function printSuccess(msg) {
  log(chalk.green(msg));
}
