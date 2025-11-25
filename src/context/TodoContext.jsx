import React, { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext()
const ThemeContext = createContext()

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a TodoProvider')
  }
  return context
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })

  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    // Update document class for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const getFilteredTodos = () => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }

  const todoValue = {
    todos,
    filteredTodos: getFilteredTodos(),
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  }

  const themeValue = {
    darkMode,
    toggleDarkMode,
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
    </ThemeContext.Provider>
  )
}

