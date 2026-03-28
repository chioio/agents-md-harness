# agents-md-harness

把 AGENTS.md 变成 agent 可用的 harness。

`agents-md-harness` 是一个极简 CLI，用来为 agent 驱动项目初始化一套模块化的 AGENTS.md harness 结构。

它会为项目提供一层轻量但成体系的说明基础设施：

- 根 `AGENTS.md` 入口
- 模块化的 `_harness/` 目录
- 用于后续生成项目说明 Markdown 的 setup 脚手架
- 面向长期 agent 工作流的 memory 与 GC 基础能力

## Why

很多项目里的 `AGENTS.md` 最后都会膨胀成一个扁平长文档。
这样会让 agent 更难做路由、按需加载，也更难长期维护。

这个项目的目标，就是把单一入口文件转成轻量 harness：

- `AGENTS.md` 保持精简，只承担入口职责
- `_harness/` 承载 routing、rules、catalog、workflow、memory、GC 等模块
- agent 可以只加载当前任务真正需要的上下文
- harness 可以持续演进，而不是重新坍塌成一个超大文件

## Core ideas

### 把 AGENTS.md 当成入口文件

让根文件保持短小。
它主要负责告诉 agent：这里是什么项目、下一步该去哪里、哪些高风险改动必须先确认。

### 模块化上下文加载

agent 不应该默认把所有内容全读一遍。
它应该只加载当前任务真正需要的最小说明集。

### 把 memory 当作基础设施

项目长期记忆和 agent 本地工作记忆，都应该是 harness 的组成部分，而不是事后补丁。

### 把 GC 当作维护机制

harness 需要随着时间保持可用。
GC 的存在，就是为了让 memory 和说明层能持续裁剪、压缩、保持高信号。

## 实现原则

Harness-first. Policy-driven. Guardrail-oriented.

- `AGENTS.md` 是入口，不是全部。
- harness 的目标是约束 agent 行为，不只是生成 Markdown。
- 优先产出 routing、policy、workflow、guardrails，而不是泛项目介绍。
- 先路由，后加载；只读取最小必要上下文。
- README 面向人类；agent 规则放在 harness。
- 短期任务记忆与长期项目记忆分层管理。
- harness 是否有效，应以真实 agent session 验证，而不是只看静态文件。
- 多 agent 协作默认共享一套 harness，除非确有必要再拆分。

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

这个仓库有三个工作区域：

### 仓库自用

根目录的 `AGENTS.md` 和根目录 `_harness/`，用于维护这个仓库本身。

### 模板输出

`template/` 下的内容，才是 CLI 会复制到用户项目里的内容。

### 场景样例

`samples/todo-app/` 是运行时测试场景。
它提供一个共享 harness 的全栈工作区，用来验证 routing、memory、GC、文档生成与多 agent 协作是否真实生效。

## 当前状态

当前重点在：

- 改进 setup 流程
- 改进生成后的 harness 质量
- 验证 fresh session 下的 agent 行为
- 测试 memory / GC 模式
- 改进基于 session 的 harness 评估方式

## 测试方法

主测试对象是 `samples/todo-app` 中 fresh session 下的 agent 行为。

当前建议：

- `pnpm test:cli`
- `pnpm test:harness`
- 在 `samples/todo-app` 中，使用 `tests/runtime/tasks.json` 中的任务做 fresh session 测试

详见 [TESTING.md](./TESTING.md)。

## License

MIT
