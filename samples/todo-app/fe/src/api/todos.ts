export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export const seedTodos: Todo[] = [
  { id: "1", title: "Design harness routing", done: true },
  { id: "2", title: "Verify bilingual README updates", done: false },
  { id: "3", title: "Test multi-agent consistency", done: false },
];
