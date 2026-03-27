---
title: be-todo-app-harness-catalog
project: be-todo-app
language: zh-CN
layer: harness
---

# CATALOG

## Root

- `AGENTS.md` —— 项目入口与总体工作方式
- `go.mod` —— Go 模块定义
- `_harness/` —— 模块化 harness 文档
- `cmd/api/main.go` —— 服务启动入口

## 后端代码

- `internal/httpapi/` —— HTTP 路由与处理层
- `internal/todo/` —— 领域模型与服务逻辑

## Harness

- `_harness/readme.md` —— 项目与 harness 概览
- `_harness/routing.md` —— 路由规则
- `_harness/catalog.md` —— 结构索引
- `_harness/rules.md` —— 规则与确认边界
- `_harness/workflow.md` —— 执行流程

## Memory

- `_harness/memory/project.md` —— 长期共享记忆
- `_harness/memory/agents/*.local.md` —— agent 短期任务记忆

## Setup / GC

- `_harness/.setup/` —— setup 与再生成流程
- `_harness/gc/` —— GC 策略与流程

## 当前约定

当前不强行预设“最重要目录”，以实际任务上下文驱动。
但通常后端实现会优先关注：

- `cmd/api/main.go`
- `internal/httpapi/`
- `internal/todo/`
- `go.mod`
