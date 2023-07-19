#!/usr/bin/env node

import meow from 'meow';
import { resolve } from "path";
import { __dirname, __root } from "./root.js"
import { validate } from "./validate.js"
import { printSuccess } from "./log.js"
import { copy } from 'fs-extra/esm'
import { createServer } from './server.js'

const FileName = 'proxy.config.json';

const cli = meow(`
	使用
    $ proxy-here init
	  $ proxy-here <input>
	  $ proxy-here

	示例
	  $ proxy-here ./input/config.json
`, {
	importMeta: import.meta,
	flags: {}
});

if (cli.input.at(0) === "init") {
  // 初始化生成json配置
  const from = resolve(__root, FileName)
  const to = resolve(__dirname, FileName)
  copy(from, to)
  printSuccess(`配置生成成功：${to}`)
} else {
  const configFile = cli.input.at(0) || FileName;
  const filePath = resolve(__dirname, configFile)
  validate(filePath).then(res => {
    if (res) {
      createServer(res)
    }
  })
}
