# easy-proxy


简易代理服务，通过json配置启动服务，支持代理.

## 安装

```shell
npm install easy-proxy -g
```

## 本地调试

```shell
npm link
easy-proxy init
easy-proxy
```


## 使用

使用说明如下：

```shell

# 在项目目录初始化，并生成配置文件
easy-proxy init

# 启动代理服务（指定配置文件）
easy-proxy ./config.json

# 启动代理服务（默认配置文件proxy.config.json）
easy-proxy

```
