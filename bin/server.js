// 创建服务
// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const open = require("open");
// const compression = require("compression");
// const EventEmitter = require("events").EventEmitter;
// const os = require("os");

import express from 'express'
import {createProxyMiddleware} from 'http-proxy-middleware'
import open from 'open'
import compression from 'compression'
import {EventEmitter} from 'events'
import os from 'os'

// 设置限制监听器的数量
EventEmitter.setMaxListeners(20);

/**
 * 创建服务
 * @param {*} option 配置
 */
export function createServer(option = {}) {
  const { host = "0.0.0.0", base = "./", port = 8080, proxy = [] } = option;
  
	const app = express();
	if (option.compression) app.use(compression());
	// 静态资源托管
	app.use(express.static(base));
	// 注册路由
	app.get("/", function (req, res) {});

	// 代理
  proxy.forEach(item => {
    let p = [item.path];
    if (item.path && Array.isArray(item.path)) {
      p = item.path;
    }
    app.use(p, createProxyMiddleware({
      target: item.target,
      changeOrigin: item.changeOrigin,
      ws: item.ws,
      pathRewrite: item.pathRewrite
    }));
  });

	// 启动服务
	const server = app.listen(port, host, () => {
		const realIp = getIpAddress() || host;
		const realPort = server.address().port;
		console.log("服务启动: http://%s:%s", host, realPort);
		console.log("服务启动: http://%s:%s", realIp, realPort);
		if (option.open) open(`http://${realIp}:${realPort}`);
	});
}

/**
 * 获取ip地址
 * @returns ip地址
 */
function getIpAddress() {
	let netDict = os.networkInterfaces();
	for (const devName in netDict) {
		let netList = netDict[devName];
		for (var i = 0; i < netList.length; i++) {
			let { address, family, internal, mac } = netList[i];
			const isvm = isVmNetwork(mac);
			if (family === "IPv4" && address !== "127.0.0.1" && !internal && !isvm) {
				return address;
			}
		}
	}
}
// 判断VM虚拟机
function isVmNetwork(mac) {
	// 常见的虚拟网卡MAC地址和厂商
	let vmNetwork = [
		"00:05:69", //vmware1
		"00:0C:29", //vmware2
		"00:50:56", //vmware3
		"00:1C:42", //parallels1
		"00:03:FF", //microsoft virtual pc
		"00:0F:4B", //virtual iron 4
		"00:16:3E", //red hat xen , oracle vm , xen source, novell xen
		"08:00:27", //virtualbox
		"00:00:00" // VPN
	];
	for (let i = 0; i < vmNetwork.length; i++) {
		let mac_per = vmNetwork[i];
		if (mac.startsWith(mac_per)) {
			return true;
		}
	}
	return false;
}
