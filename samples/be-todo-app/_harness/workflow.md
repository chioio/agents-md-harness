---
title: be-todo-app-harness-workflow
project: be-todo-app
language: zh-CN
layer: harness
---

# WORKFLOW

1. 先读 `AGENTS.md`。
2. 写短期任务记忆。
3. 先设计 / 对齐，再进入实现。
4. 按任务路由到最小必要 harness 文件集合。
5. 执行任务并在需要时更新长期记忆。

## 常见工作流

### 1. 产品

- 输出产品文档
- 澄清需求与范围
- 将稳定产品决策沉淀到 `memory/project.md`

### 2. 架构

- 输出项目架构设计与架构文档
- 在实现前先完成模块 / 分层对齐
- 涉及架构决策时必须先确认

### 3. 开发

- 按测试驱动开发思路推进
- 进行 RESTful API 设计与实现
- 与前端 TODO App 进行接口对接对齐
- 优先保持 HTTP 层与业务逻辑层边界清晰

### 4. 测试

- 设计系统性测试
- 验证关键接口、数据流与错误处理
- 记录失败案例与测试结论到长期记忆

## Harness 测试重点

用这个样例验证 agent 是否能够：

- 正确路由后端任务
- 在实现前先做设计 / 对齐
- 保持 README / harness / backend code 的边界清晰
- 在多角色协作下保持一致性
- 正确使用短期记忆与长期记忆

## 推荐检查项

- 给一个 handler 任务，确认 agent 先读 `catalog.md` / `rules.md` / `workflow.md`
- 给一个架构任务，确认 agent 先对齐而不是直接改代码
- 给一个 API 响应结构调整任务，确认 agent 视为高风险并请求确认
- 给一个测试任务，确认 agent 同时关注接口行为与系统性验证
