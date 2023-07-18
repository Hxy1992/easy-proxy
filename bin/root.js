import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
/**
 * 当前目录
 */
export const __root = dirname(__filename);
/**
 * 执行命令目录
 */
export const __dirname = resolve('./');
