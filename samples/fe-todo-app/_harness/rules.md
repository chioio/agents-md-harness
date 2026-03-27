---
title: fe-todo-app-harness-rules
project: fe-todo-app
language: zh-CN
layer: harness
---

# RULES

- harness 文档使用中文。
- 文档应短小精练、清晰明了、agent 可读性高、可组合性高。
- 默认遵循 React 开发规范。
- 默认采用测试驱动开发思路推进实现。

## 命令约定

- 开发：`pnpm dev`
- 构建：`pnpm build`
- 测试：`pnpm test`
- 代码检查：`pnpm lint`

## 确认边界

以下事项必须先确认：

- 项目模块决策
- 架构决策
- 破坏性更新
- 重大 UX / 数据流 / API 对接方式调整

## 前端边界

- 组件职责优先放在 `src/components/`
- API / 数据定义优先放在 `src/api/`
- 基础设施与通用能力优先放在 `src/lib/`
- 不要把前端实现细节写进 harness 文档
- 不要把 agent 规则混入面对人的产品文档

## Memory 规则

- 长期记忆记录：产品决策、架构决策、失败案例、测试结论、UI 规范
- 短期记忆：任务开始写一次，任务结束写一次，用户 review 后再更新
- 长期记忆写入：`memory/project.md`
- 短期记忆写入：`memory/agents/*.local.md`
