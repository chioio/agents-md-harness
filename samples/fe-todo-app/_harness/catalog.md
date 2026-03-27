---
title: fe-todo-app-harness-catalog
project: fe-todo-app
language: zh-CN
layer: harness
---

# CATALOG

## Root

- `AGENTS.md` —— 项目入口与总体工作方式
- `package.json` —— 脚本与依赖定义
- `index.html` —— HTML 入口
- `tsconfig.json` —— TypeScript 配置
- `_harness/` —— 模块化 harness 文档

## 前端代码

- `src/main.tsx` —— React 启动入口
- `src/app.tsx` —— 应用壳层
- `src/components/` —— 组件层
- `src/api/` —— 数据定义 / API 相关内容
- `src/lib/` —— 基础设施与通用能力
- `src/styles.css` —— 样例样式

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
但通常前端实现会优先关注：

- `src/components/`
- `src/api/`
- `src/lib/`
- `src/app.tsx`
- `package.json`
