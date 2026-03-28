---
title: todo-app-harness-readme
project: todo-app
language: zh-CN
layer: harness
---

# README

这是 `todo-app` 的模块化 harness 说明层。

它服务于一个全栈 TODO App 项目，并用于验证 FE、BE、全栈联动、多角色协作下的 agent 工作方式是否稳定、可读、可组合。

## 用途

- 保持根 `AGENTS.md` 精简
- 将概览、路由、规则、结构、流程拆分为按需加载文档
- 支持产品、架构、开发、测试、UI/UX 多角色协作
- 支持 memory、GC 与真实全栈工作流测试

## 使用边界

- 这是补充性的概览文档，不是默认入口。
- 默认入口始终是根 `AGENTS.md`。
- 对普通 FE / BE / 测试 / UI 任务，不要优先加载本文件。
- 只有在确实缺少项目整体背景时，才补读本文件。

## 项目上下文

该项目包含两个主要部分：

- `fe/`：React + TanStack Router 前端
- `be/`：Golang RESTful API 服务

主要用于验证：

- 全栈项目中的 harness 路由是否正确
- FE / BE API 对接是否有清晰边界
- 测试驱动开发方式是否可落地
- 多角色 agent 协作是否稳定

文档语言使用中文。
