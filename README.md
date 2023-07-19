# easy-proxy


简易代理服务，通过json配置启动服务，支持代理。

## 安装

```shell
npm install proxy-here -g
```

## 使用


```shell

# 在项目目录初始化，并生成配置文件
proxy-here init

# 启动代理服务（指定配置文件）
proxy-here ./config.json

# 启动代理服务（默认配置文件proxy.config.json）
proxy-here

```
## 配置说明

```json
{
  "host": "0.0.0.0", // 服务启动地址
  "base": "./", // 根目录的相对路径
  "port": 8080, // 端口
  "open": true, // 是否自动打开
  "compression": true, // 是否开启压缩
  // 代理配置
  "proxy": [
      {
          "target": "http://192.168.0.1:8001", // 目标
          "changeOrigin": true, // 跨域
          "ws": true, // 支持websocket
          "path": "/api", // 路由
          "pathRewrite": {
              "^/api": "" // 路由重写
          }
      }
  ]
}

```

## 本地调试

```shell
npm link
proxy-here init
proxy-here
```

