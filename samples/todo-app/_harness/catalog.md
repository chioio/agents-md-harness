---
title: todo-app-harness-catalog
project: todo-app
language: zh-CN
layer: harness
---

# CATALOG

## Root

- `AGENTS.md` —— 项目入口与总体工作方式
- `_harness/` —— 模块化 harness 文档
- `fe/` —— 前端应用
- `be/` —— 后端服务

## FE

- `fe/package.json` —— 前端脚本与依赖
- `fe/index.html` —— HTML 入口
- `fe/tsconfig.json` —— TypeScript 配置
- `fe/src/main.tsx` —— React 启动入口
- `fe/src/app.tsx` —— 应用壳层
- `fe/src/components/` —— 组件层
- `fe/src/api/` —— 数据定义 / API 相关内容
- `fe/src/lib/` —— 基础设施与通用能力

## BE

- `be/go.mod` —— Go 模块定义
- `be/cmd/api/main.go` —— 服务启动入口
- `be/internal/httpapi/` —— HTTP 路由与处理层
- `be/internal/todo/` —— 领域模型与服务逻辑

## Harness

- `_harness/readme.md` —— 项目与 harness 概览
- `_harness/routing.md` —— 路由规则
- `_harness/catalog.md` —— 结构索引
- `_harness/rules.md` —— 规则与确认边界
- `_harness/workflow.md` —— 执行流程
- `_harness/memory/project.md` —— 长期共享记忆
