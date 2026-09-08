# Minimal Startpage

极简浏览器起始页

## 功能

- **时钟与日期**：大字号时间（时分秒）与日期星期，每秒更新
- **多引擎搜索**：输入关键词回车搜索，可在 Bing / Google / DuckDuckGo 之间切换
- **一言**：每次打开随机展示一条句子（[hitokoto.cn](https://hitokoto.cn/)）
- **深色模式**：自动跟随系统明暗主题
- **键盘操作**：按 `/` 聚焦搜索框，按 `Esc` 关闭搜索引擎菜单

## 安装

1. 打开 Chrome，访问 `chrome://extensions`
2. 开启右上角的「开发者模式」
3. 点击「加载已解压的扩展程序」，选择本项目文件夹
4. 按 `Ctrl+T` 打开新标签页即可看到起始页

## 项目结构

```
minimal-startpage/
├── manifest.json   # 扩展清单
├── main.html       # 页面结构与样式
└── script.js       # 页面逻辑
```
