import { useTodos, useTheme } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import FilterButtons from './components/FilterButtons'

function App() {
  const { filteredTodos, todos, clearCompleted, filter } = useTodos()
  const { darkMode, toggleDarkMode } = useTheme()
  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      } py-12 px-4`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              darkMode
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
            }`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div
          className={`rounded-2xl shadow-2xl p-8 transition-all duration-500 ${
            darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white'
          }`}
        >
          <h1
            className={`text-4xl font-bold text-center mb-2 bg-gradient-to-r ${
              darkMode
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}
          >
            My Todo App
          </h1>
          <p
            className={`text-center mb-8 transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Stay organized and get things done
          </p>

          <TodoForm />

          {todos.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4">📝</div>
              <p
                className={`text-lg transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                No todos yet. Add one to get started!
              </p>
            </div>
          ) : (
            <>
              {/* Stats Section */}
              <div
                className={`mb-6 p-4 rounded-lg transition-colors duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border border-gray-600'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex gap-4 flex-wrap justify-center">
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Total:{' '}
                      <span
                        className={`font-bold ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      >
                        {todos.length}
                      </span>
                    </span>
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Active:{' '}
                      <span
                        className={`font-bold ${
                          darkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        {activeCount}
                      </span>
                    </span>
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Completed:{' '}
                      <span
                        className={`font-bold ${
                          darkMode
                            ? 'text-purple-400'
                            : 'text-purple-600'
                        }`}
                      >
                        {completedCount}
                      </span>
                    </span>
                  </div>
                  {completedCount > 0 && (
                    <button
                      onClick={clearCompleted}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                        darkMode
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30'
                          : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                      }`}
                    >
                      Clear Completed
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Buttons */}
              <FilterButtons />

              {/* Todo List */}
              <div
                className={`space-y-3 max-h-96 overflow-y-auto pr-2 transition-colors duration-300 ${
                  darkMode ? 'scrollbar-dark' : 'scrollbar-light'
                }`}
              >
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-8">
                    <p
                      className={`transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {filter === 'active' && 'No active todos'}
                      {filter === 'completed' && 'No completed todos'}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className="animate-slide-in"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <TodoItem todo={todo} />
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <footer
          className={`text-center mt-8 text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          <p>Built with React, Tailwind CSS, Context API & Local Storage</p>
        </footer>
      </div>
    </div>
  )
}

export default App

