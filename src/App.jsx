import { useEffect, useState } from "react"
import "./App.css"

export default function App() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos")
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    document.querySelector("input").focus()
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    if (!input) return
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: input,
          completed: false,
        },
      ]
    })
    setInput("")
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id != id)
    })
  }

  function toggleCompleted(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.length === 0 && "no todos"}
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyleType: "none" }}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleCompleted(todo.id, e.target.checked)}
              />
            </label>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
