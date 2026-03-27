package main

import (
    "log"
    "net/http"

    "github.com/chioio/agents-md-harness/samples/be-todo-app/internal/httpapi"
    "github.com/chioio/agents-md-harness/samples/be-todo-app/internal/todo"
)

func main() {
    service := todo.NewService()
    router := httpapi.NewRouter(service)

    log.Println("backend todo API listening on :8080")
    if err := http.ListenAndServe(":8080", router); err != nil {
        log.Fatal(err)
    }
}
