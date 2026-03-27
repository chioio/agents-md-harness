---
title: be-todo-app-harness-readme
project: be-todo-app
language: zh-CN
layer: harness
---

# README

这是 `be-todo-app` 的模块化 harness 说明层。

它用于支持一个与 `fe-todo-app` 呼应的 Golang TODO App 后端服务，并验证后端项目中的 agent 工作方式是否稳定、可读、可组合。

## 用途

- 保持根 `AGENTS.md` 精简
- 将概览、路由、规则、结构、流程拆分为按需加载文档
- 支持产品、架构、开发、测试多角色协作
- 支持 memory、GC 与真实后端工作流测试

## 项目上下文

该项目是一个后端 TODO App 样例，主要用于验证：

- RESTful API 设计与实现
- 与前端应用的 API 对接边界
- 测试驱动开发方式
- 系统性测试流程
- 后端分层与接口稳定性

文档语言使用中文。

## 文件

- `routing.md` —— 任务到文档的路由规则
- `catalog.md` —— 当前项目结构索引
- `rules.md` —— 硬规则、边界与确认条件
- `workflow.md` —— 项目执行流程与测试方式

## Memory

- `memory/project.md` 保存长期共享记忆
- `memory/agents/*.local.md` 保存各 agent 短期任务记忆

## Setup

可以通过 `.setup/` 重新进入 harness setup / refine 流程。

## GC

`gc/` 用于帮助清理过期短期上下文并保留高信号长期知识。
