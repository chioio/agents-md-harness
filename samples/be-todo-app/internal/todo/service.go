package todo

type Service struct {
    todos []Todo
}

func NewService() *Service {
    return &Service{todos: []Todo{
        {ID: "1", Title: "Expose todo list endpoint", Done: true},
        {ID: "2", Title: "Add create-todo handler", Done: false},
    }}
}

func (s *Service) List() []Todo {
    return s.todos
}
