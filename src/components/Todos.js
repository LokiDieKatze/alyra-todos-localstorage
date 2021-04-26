import { useState, useEffect } from "react"
import TodosList from "./TodosList"
import SelectTodos from "./SelectTodos"
import AddTodoForm from "./AddTodoForm"
import { v4 as uuidv4 } from "uuid"

const initialTodos = [
  {
    text: "Forkez et cloner ce repo",
    isCompleted: true,
    id: "1b688c51-e990-4ce3-95a5-9018cf81d23d"
  },
  {
    text: "Jouer avec le <title></title> 🤩",
    isCompleted: false,
    id: "efc6331d-7ca2-49a6-b014-378b8280b33d"
  },
  {
    text: "Enregistrer les tâches dans localStorage 🤓",
    isCompleted: false,
    id: "9e60d353-cd72-40bb-97e6-5841e51635c0"
  },
  {
    text: "Mettre en place dark mode 😎",
    isCompleted: false,
    id: "df0ce18c-b4fa-4651-82c0-72fad6b486e4"
  },
  {
    text: "Enregistrer dark mode dans localStorage 🥳",
    isCompleted: false,
    id: "206e8742-02b1-4ce9-92d2-d6184588f4c3"
  }
]

const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("my-todos")) || initialTodos
  )
  const [filter, setFilter] = useState("all")



  const addTodo = (text) => {
    const newTodo = {
      text,
      isCompleted: false,
      id: uuidv4()
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (task) => {
    setTodos(todos.filter((el) => el.id !== task.id))
  }

  const toggleCompleteTodo = (task) => {
    setTodos(
      todos.map((el) => {
        if (el.id === task.id) {
          return {
            ...el,
            isCompleted: !el.isCompleted
          }
        }
        return el
      })
    )
  }

  const filteredTodos = todos.filter((el) => {
    if (filter === "completed") {
      return el.isCompleted
    }
    if (filter === "notcompleted") {
      return !el.isCompleted
    }
    return true
  })

  const completedCount = todos.filter((el) => el.isCompleted).length

  useEffect(() => {
    document.title =
      todos.length - completedCount > 0 ?
        `You have ${todos.length - completedCount} more tasks to go!` :
        `What are your plans?`
  }, [todos, completedCount])

  const [darkMode, setDarkMode] = useState(false)
  const handleCheckboxChange = () => {
    setDarkMode(!darkMode)
  }

  const darkModeCheck = (props) => {
    const { darkMode, setDarkMode } = props;
    const handleCheckboxChange = () => {
      setDarkMode(!darkMode);
    };

    () => JSON.parse(localStorage.getItem("dark-mode") || !isChecked)

  }
  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
    // localStorage.setItem("dark-mode", JSON.stringify(isCkecked))
  }, [todos]
  )

  return (
    <main>
      <h2 className="text-center">
        Ma liste de tâches ({completedCount} / {todos.length})
      </h2>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="activate" onChange={handleCheckboxChange} />
        <label class="form-check-label" for="activate"> Mode Sombre </label>
      </div>
      <SelectTodos filter={filter} setFilter={setFilter} />
      <TodosList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleCompleteTodo={toggleCompleteTodo}
      />
      <AddTodoForm addTodo={addTodo} setFilter={setFilter} />
    </main>
  )
}

export default Todos
