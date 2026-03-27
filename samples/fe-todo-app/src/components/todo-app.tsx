import { useMemo, useState } from "react";
import { TodoItem } from "./todo-item";
import { seedTodos } from "../api/todos";

export function TodoApp() {
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  const todos = useMemo(() => seedTodos, []);

  const visibleTodos = todos.filter((todo) => {
    if (filter === "open") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  return (
    <main className="layout">
      <section className="card">
        <header>
          <p className="eyebrow">TanStack React sample</p>
          <h1>Frontend Todo App</h1>
          <p className="muted">A fixture app used to test generated harness behavior.</p>
        </header>

        <div className="filters">
          {(["all", "open", "done"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={filter === value ? "active" : ""}
            >
              {value}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} title={todo.title} done={todo.done} />
          ))}
        </ul>
      </section>
    </main>
  );
}
