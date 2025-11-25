import { useState } from 'react'
import { useTodos, useTheme } from '../context/TodoContext'

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const { toggleTodo, deleteTodo, editTodo } = useTodos()
  const { darkMode } = useTheme()

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      editTodo(todo.id, editText)
    }
    setIsEditing(!isEditing)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
        todo.completed
          ? darkMode
            ? 'bg-gray-700 border-gray-600'
            : 'bg-gray-50 border-gray-200'
          : darkMode
          ? 'bg-gray-700 border-gray-600 hover:border-blue-400'
          : 'bg-white border-gray-300 hover:border-blue-300'
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={`w-5 h-5 rounded focus:ring-2 cursor-pointer transition-all duration-200 ${
          darkMode
            ? 'text-blue-400 bg-gray-600 border-gray-500 focus:ring-blue-400'
            : 'text-blue-500 focus:ring-blue-500'
        }`}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          autoFocus
          className={`flex-1 px-3 py-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 transition-all duration-200 ${
            darkMode
              ? 'bg-gray-600 text-white focus:ring-blue-400'
              : 'text-gray-800 focus:ring-blue-200'
          }`}
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer font-medium transition-all duration-200 ${
            todo.completed
              ? darkMode
                ? 'line-through text-gray-500'
                : 'line-through text-gray-500'
              : darkMode
              ? 'text-gray-100'
              : 'text-gray-800'
          }`}
          onDoubleClick={handleEdit}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className={`px-3 py-1 text-sm rounded transition-all duration-200 font-semibold hover:scale-105 ${
              darkMode
                ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'
                : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
            }`}
            title="Edit this todo"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className={`px-3 py-1 text-sm rounded transition-all duration-200 font-semibold hover:scale-105 ${
            darkMode
              ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30'
              : 'text-red-600 hover:text-red-800 hover:bg-red-50'
          }`}
          title="Delete this todo"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem

