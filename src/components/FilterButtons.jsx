import { useTodos, useTheme } from '../context/TodoContext'

const FilterButtons = () => {
  const { filter, setFilter } = useTodos()
  const { darkMode } = useTheme()

  const filters = [
    { label: 'All', value: 'all', icon: '📋' },
    { label: 'Active', value: 'active', icon: '⏳' },
    { label: 'Completed', value: 'completed', icon: '✅' },
  ]

  return (
    <div className="mb-6 flex flex-wrap gap-3 justify-center">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
            filter === f.value
              ? darkMode
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-blue-500 text-white shadow-lg shadow-blue-300'
              : darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          <span>{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
