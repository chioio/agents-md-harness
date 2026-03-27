---
title: be-todo-app-harness-rules
project: be-todo-app
language: zh-CN
layer: harness
---

# RULES

- harness 文档使用中文。
- 文档应短小精练、清晰明了、agent 可读性高、可组合性高。
- 默认遵循 Go 开发规范与 `gofmt` 风格。
- 默认采用测试驱动开发思路推进实现。

## 命令约定

- 开发 / 运行：`go run ./cmd/api`
- 测试：`go test ./...`
- 格式化：`gofmt ./...`

## 确认边界

以下事项必须先确认：

- 项目模块决策
- 架构决策
- 破坏性更新
- API 契约、路由、响应结构的重大调整

## 后端边界

- 传输层职责优先放在 `internal/httpapi/`
- 领域模型与业务逻辑优先放在 `internal/todo/`
- 不要把后端实现细节写进 harness 文档
- 不要把 agent 规则混入面对人的产品文档

## Memory 规则

- 长期记忆记录：产品决策、架构决策、失败案例、测试结论、接口约定
- 短期记忆：任务开始写一次，任务结束写一次，用户 review 后再更新
- 长期记忆写入：`memory/project.md`
- 短期记忆写入：`memory/agents/*.local.md`
