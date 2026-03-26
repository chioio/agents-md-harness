# AGENTS.md-harness

> 🪄 让 `AGENTS.md` 从静态说明文件升级成 agent 可自用的 harness。

`AGENTS.md-harness` 在探索一个简单但关键的方向：

不要把 `AGENTS.md` 只当成一整坨静态 prompt 文件，
而是把它变成一个**薄入口（entrypoint）**，再把实际的说明系统拆到可按需读取的 `template/_harness/` 里。

## 核心想法

把：

- 一份很长的 `AGENTS.md`

变成：

- `AGENTS.md` 作为入口
- `_harness/ROUTING.md` 负责路由
- `_harness/CATALOG.md` 负责结构索引
- `_harness/RULES.md` 负责硬规则
- `_harness/WORKFLOW.md` 负责执行流程

## 这个仓库里有两层含义

### 1. 仓库自用（repo self-use）

根目录下这些文件：

- `AGENTS.md`
- `_harness/*`

是给 **本仓库自己** 用的，描述如何维护这个项目：

- 改 CLI
- 改 template
- 改文档
- 发版与发布

### 2. 用户模板（template output）

`template/` 目录下这些文件：

- `template/AGENTS.md`
- `template/_harness/*`

是给 `npx agents-md-harness init` 生成出去的模板。

## 快速开始

### 用 npx 初始化

```bash
npx agents-md-harness init
npx agents-md-harness init my-project
npx agents-md-harness init my-project --force
```

### 仓库开发（pnpm 10）

```bash
pnpm install
pnpm format
pnpm format:check
pnpm changeset
pnpm version-packages
pnpm release
```

## 生成结果

```text
AGENTS.md
_harness/
  README.md
  ROUTING.md
  CATALOG.md
  RULES.md
  WORKFLOW.md
```

## 发布流程

本仓库使用：

- `pnpm@10`
- `changesets`
- `oxfmt`
- GitHub Actions

发布到 npm 需要配置：

- `NPM_TOKEN`

## 英文文档

主 README：[`README.md`](./README.md)
