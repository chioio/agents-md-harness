---
title: todo-app-harness-workflow
project: todo-app
language: zh-CN
layer: harness
---

# WORKFLOW

1. 先读 `AGENTS.md`。
2. 写短期任务记忆。
3. 先设计 / 对齐，再进入实现。
4. 按任务路由到最小必要 harness 文件集合。
5. 执行任务并在需要时更新长期记忆。

## 默认加载策略

### FE / BE / 测试 / UI

先保留并加载：

- `AGENTS.md`
- `catalog.md`
- `rules.md`
- `workflow.md`

不要默认先读 `readme.md`。

### API 契约 / 架构 / Memory

先保留并加载：

- `AGENTS.md`
- `rules.md`
- `workflow.md`
- `memory/project.md`

只有在需要定位真实目录时，再补 `catalog.md`。

## 常见工作流

### 1. 产品

- 输出产品文档
- 澄清需求与范围
- 将稳定产品决策沉淀到 `memory/project.md`

### 2. 架构

- 输出项目架构设计与架构文档
- 在实现前先完成 FE / BE 模块与分层对齐
- 涉及架构决策时必须先确认

### 3. FE 开发

- 按测试驱动开发思路推进
- 先引用 React 开发规范
- 进行 React 页面 / 组件 / 状态 / 路由实现
- 优先定位 `fe/src/components`
- 与 BE API 契约保持对齐
- 优先保持组件、数据、基础设施边界清晰
- 常见验证命令：`pnpm --dir fe test`

### 4. BE 开发

- 按测试驱动开发思路推进
- 进行 RESTful API 设计与实现
- 与 FE TODO App 对接对齐
- 优先保持 HTTP 层与业务逻辑层边界清晰
- 优先定位 `be/internal/httpapi` 与 `be/internal/todo`
- 常见验证命令：`go test ./be/...`

### 5. 测试

- 设计系统性测试
- 同时验证 FE 交互、BE 接口、FE / BE 对接流程
- 记录失败案例与测试结论到长期记忆

### 6. UI / UX

- 输出高质量 UI 与交互方案
- 在重大交互调整前先确认
- 将稳定 UI 规范沉淀到长期记忆

## API / 架构 / 长期记忆专项信号

### API 契约任务

- 优先识别是否涉及 FE / BE API 对接
- 优先识别是否涉及接口约定
- 若涉及契约变化，先确认，再实现

### 架构任务

- 优先引用“架构”
- 优先引用“模块与分层对齐”
- 对后端分层任务，优先引用“HTTP 层与业务逻辑层边界”
- 架构任务默认先出方案，不直接改代码

### 长期记忆任务

- 优先引用“长期共享记忆”
- 明确“任务开始写短期记忆”
- 明确“任务结束写短期记忆”
- 明确“用户 review 后更新短期记忆”

## Harness 测试重点

用这个样例验证 agent 是否能够：

- 正确路由 FE、BE、全栈联动任务
- 在实现前先做设计 / 对齐
- 保持 README / harness / app code 的边界清晰
- 在多角色协作下保持一致性
- 正确使用短期记忆与长期记忆

## 推荐检查项

- 给一个 FE 组件任务，确认 agent 先读 `catalog.md` / `rules.md` / `workflow.md`
- 给一个 BE handler 任务，确认 agent 先读 `catalog.md` / `rules.md` / `workflow.md`
- 给一个 API 对接任务，确认 agent 同时关注 FE + BE 边界
- 给一个架构任务，确认 agent 先对齐而不是直接改代码
