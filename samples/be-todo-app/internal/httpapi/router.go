package httpapi

import (
    "encoding/json"
    "net/http"

    "github.com/chioio/agents-md-harness/samples/be-todo-app/internal/todo"
)

func NewRouter(service *todo.Service) http.Handler {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        _, _ = w.Write([]byte("ok"))
    })
    mux.HandleFunc("GET /todos", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(service.List())
    })
    return mux
}
