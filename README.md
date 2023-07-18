# easy-proxy


简易代理服务，通过json配置启动服务，支持代理。

## 安装

```shell
npm install proxy-here -g
```

## 本地调试

```shell
npm link
proxy-here init
proxy-here
```


## 使用

使用说明如下：

```shell

# 在项目目录初始化，并生成配置文件
proxy-here init

# 启动代理服务（指定配置文件）
proxy-here ./config.json

# 启动代理服务（默认配置文件proxy.config.json）
proxy-here

```
