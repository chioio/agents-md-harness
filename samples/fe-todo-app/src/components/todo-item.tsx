export function TodoItem({ title, done }: { title: string; done: boolean }) {
  return (
    <li className="todo-item">
      <span>{done ? "✅" : "⬜️"}</span>
      <span>{title}</span>
    </li>
  );
}
