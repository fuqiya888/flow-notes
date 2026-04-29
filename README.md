# Flow Notes

极简本地笔记，支持坚果云同步。

## 本地使用

直接用浏览器打开 `index.html` 即可。

## 坚果云同步（跨设备）

### 第一步：生成应用密码

1. 登录 [jianguoyun.com](https://www.jianguoyun.com)
2. 右上角头像 → 账户信息 → 安全选项
3. 第三方应用管理 → 添加应用（名称填 `flow-notes`）
4. 复制生成的应用密码

### 第二步：启动本地代理

需要 Node.js（[nodejs.org](https://nodejs.org) 下载安装）。

```bash
cd C:/Users/tianq/flow-notes
node proxy.js
```

看到 `proxy running at http://localhost:9527` 即成功，**保持此窗口运行**。

### 第三步：同步数据

1. 浏览器打开 `index.html`
2. 点右上角 ☁ 按钮
3. 填入坚果云账号（邮箱）和刚才的应用密码
4. 点「↑ 上传到云端」推送数据

### 另一台电脑同步

1. 把 `flow-notes` 文件夹复制过去（或从坚果云同步文件夹获取）
2. 运行 `node proxy.js`
3. 打开 `index.html` → ☁ → 填账号密码 → 「↓ 从云端下载」

> 应用密码不会保存在代码里，每次打开需重新输入密码（账号会记住）。
