---
title: todo-app-harness-rules
project: todo-app
language: zh-CN
layer: harness
---

# RULES

- 任何任务都必须把 `AGENTS.md` 视为当前工作集的一部分。
- 不要跳过 `AGENTS.md`，也不要用 `_harness/readme.md` 替代它。
- harness 文档使用中文。
- 文档应短小精练、清晰明了、agent 可读性高、可组合性高。
- 默认采用测试驱动开发思路推进实现。
- FE 默认遵循 React 开发规范。
- BE 默认遵循 Go 开发规范与 `gofmt` 风格。

## 命令约定

### FE

- 开发：`pnpm --dir fe dev`
- 构建：`pnpm --dir fe build`
- 测试：`pnpm --dir fe test`
- 代码检查：`pnpm --dir fe lint`

### BE

- 开发 / 运行：`go run ./be/cmd/api`
- 测试：`go test ./be/...`
- 格式化：`gofmt ./be/...`

## 确认边界

以下事项必须先确认：

- 项目模块决策
- 架构决策
- 破坏性更新
- API 契约、路由、响应结构的重大调整
- 重大 UX / 数据流 / FE-BE 接口协作方式调整

以下事项默认不需要先确认：

- 普通 FE 功能开发与前端测试补充
- 普通 BE 接口实现与 Go 测试补充
- 常规表单校验、筛选、列表、状态交互
- 系统性测试设计与回归测试方案补充
- 不涉及契约变化的实现细化

如果只是普通 FE / BE / 测试任务，不要过度升级为“必须先确认”。

## 分层边界

- FE 组件职责优先放在 `fe/src/components/`
- FE API / 数据定义优先放在 `fe/src/api/`
- FE 基础设施优先放在 `fe/src/lib/`
- BE 传输层职责优先放在 `be/internal/httpapi/`
- BE 领域模型与业务逻辑优先放在 `be/internal/todo/`
- 不要把实现细节写进 harness 文档
- 不要把 agent 规则混入面对人的产品文档

这些路径与信号在规划时应被优先引用：

- `fe/src/components`
- `fe/src/api`
- `be/internal/httpapi`
- `be/internal/todo`
- React 开发规范
- 测试驱动开发
- `pnpm --dir fe test`
- `go test ./be/...`

## Memory 规则

- 长期记忆记录：产品决策、架构决策、失败案例、测试结论、UI 规范、接口约定
- 短期记忆：任务开始写一次，任务结束写一次，用户 review 后再更新
- 长期记忆写入：`memory/project.md`
- 短期记忆写入：`memory/agents/*.local.md`
