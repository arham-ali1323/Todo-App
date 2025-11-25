import { useState } from 'react'
import { useTodos, useTheme } from '../context/TodoContext'

const TodoForm = () => {
  const [input, setInput] = useState('')
  const { addTodo } = useTodos()
  const { darkMode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className={`flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 font-medium ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/30'
              : 'border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-200'
          }`}
        />
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400 focus:ring-offset-gray-800'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoForm

