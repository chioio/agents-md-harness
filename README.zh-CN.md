# AGENTS.md-harness

> 🪄 让 `AGENTS.md` 变成 agent 可用的 harness。

[English](./README.md) | [简体中文](./README.zh-CN.md)

`agents-md-harness` 想解决的是：把 `AGENTS.md` 从一份静态说明文件，变成适合大模型驱动工作流使用的操作层。

它不依赖一份越来越大的总 prompt，而是使用：

- `AGENTS.md` 作为入口
- `_harness/` 作为模块化说明系统
- setup、memory、GC 作为内建生命周期能力

## 为什么做这个

`AGENTS.md` 正在变成 AI coding agent 的常见发现入口。
但在真实项目里，一份巨大的单文档通常很难维护、很难演进，也不利于模型高质量使用。

这个项目探索一种更实用的结构：

- 用一个薄入口开始
- 先路由，再加载上下文
- 把 memory 和任务说明分开
- 把 harness setup 变成显式流程，而不是隐式约定
- 让这套系统随着项目一起演进

## `setup` 会先给你什么

执行：

```bash
npx agents-md-harness setup my-project
```

它会先复制这样的起始结构：

```text
AGENTS.md
_harness/
  .setup/
  gc/
  memory/
  skills/
```

然后你再对模型说：

> Help me setup the harness

模型会基于 `_harness/.setup/` 发起一轮简短对话，并生成项目化文件，例如：

```text
_harness/
  readme.md
  routing.md
  catalog.md
  rules.md
  workflow.md
  memory/project.md
```

## 核心理念

### Prompt-first setup

一套好用的 harness，必须依赖具体项目上下文。
所以模板先通过引导式对话收集信息，再据此生成核心文件。

### 模块化上下文加载

agent 不应该默认把所有内容全读一遍。
它应该只加载当前任务真正需要的最小说明集。

### 把 memory 当作基础设施

项目长期记忆和 agent 本地工作记忆，都应该是 harness 的组成部分，而不是事后补丁。

### 把 GC 当作维护机制

harness 需要随着时间保持可用。
GC 的存在，就是为了让 memory 和说明层能持续裁剪、压缩、保持高信号。

## Sample 样例项目

仓库里还包含 `samples/fe-todo-app` 和 `samples/be-todo-app`，它们是生成后再定制的样例，用来测试：

- 重复执行 `setup`
- multi-agent 行为
- memory / GC 流程
- 生成出的 harness Markdown 质量

## CLI

主命令：

```bash
npx agents-md-harness setup
```

示例：

```bash
npx agents-md-harness setup
npx agents-md-harness setup my-project
npx agents-md-harness setup my-project --force
npx file:. setup my-project
```

`init` 仍作为兼容旧别名存在，但推荐使用 `setup`。

## 仓库结构

这个仓库有两层：

### 仓库自用

根目录的 `AGENTS.md` 和根目录 `_harness/`，用于维护这个仓库本身。

### 模板输出

`template/` 下的内容，才是 CLI 会复制到用户项目里的内容。

### 样例夹具

`samples/` 下的内容用于测试和演示生成后的 harness 在真实前后端应用中的表现。

## 当前状态

当前重点在：

- 改进 setup 流程
- 改进生成后的 harness 质量
- 测试 memory / GC 模式
- 验证 multi-agent 使用体验

## License

MIT
