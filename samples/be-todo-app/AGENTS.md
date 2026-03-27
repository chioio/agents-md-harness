---
title: be-todo-app-agents-entry
project: be-todo-app
language: zh-CN
layer: root
---

# AGENTS.md

这是 `agents-md-harness` 的后端样例项目，一个与 `fe-todo-app` 呼应的基于 Golang 的 TODO App 后端服务。

在行动前：

1. 先读本文件。
2. 识别当前任务类型。
3. 只加载 `_harness/` 中最小必要文档。
4. 先写短期任务记忆，再进入设计 / 对齐 / 实现流程。

## 主要目标

- 支持产品、架构、开发、测试多角色 agent 协作
- 验证后端项目中的 harness 路由、memory、GC 是否可用
- 支持 RESTful API 设计、实现、测试与文档产出
- 在真实后端任务中验证 agent 是否能稳定遵守边界
- 作为 `fe-todo-app` 的呼应后端项目存在

## 路由

- 项目概览与上下文 -> `_harness/readme.md`
- 结构与文件定位 -> `_harness/catalog.md`
- 规则与确认边界 -> `_harness/rules.md`
- 执行流程与测试方式 -> `_harness/workflow.md`
- 长期项目记忆 -> `_harness/memory/project.md`

## 默认执行风格

- 先设计 / 先对齐，再实现。
- 默认采用测试驱动开发思路推进任务。
- 每个 agent 在任务开始时先写短期任务记忆。
- 优先保持 harness 文档短小、清晰、可组合。

## 必须先确认

- 项目模块决策
- 架构决策
- 破坏性更新
- API 契约与响应结构的重大调整

## Memory

- 长期共享记忆：`_harness/memory/project.md`
- 短期 agent 记忆：`_harness/memory/agents/*.local.md`

## Evolution

核心 harness 文件属于高风险指导文件。
不要静默重写。
需要先提出修改建议，再等待确认。
