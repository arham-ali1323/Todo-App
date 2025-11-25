# 🚀 Quick Start Guide

## Running the Todo App

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Start Development Server
```bash
cd d:\Github\React_Projects\todo-app
npm install
npm run dev
```

The app will open at `http://localhost:5173` (Vite default)

## 📚 Learning Path

### 1. Understanding the Context API (TodoContext.jsx)
- **Two contexts**: TodoContext (todos) and ThemeContext (dark mode)
- **State initialization**: Todos loaded from localStorage on startup
- **Computed values**: filteredTodos derived from filter state
- **localStorage sync**: useEffect syncs state changes to browser storage

### 2. Component Architecture
- **App.jsx** - Main layout, stats display, filter buttons
- **TodoForm.jsx** - Input form with submission handling
- **TodoItem.jsx** - Individual todo with edit/delete actions
- **FilterButtons.jsx** - Filter selection with active state

### 3. CRUD Operations

**Create**: 
```javascript
addTodo(text) // Creates new todo with id, text, completed, createdAt
```

**Read**: 
```javascript
filteredTodos // Derived state based on filter (all/active/completed)
```

**Update**: 
```javascript
toggleTodo(id) // Toggle completed status
editTodo(id, newText) // Update todo text
```

**Delete**: 
```javascript
deleteTodo(id) // Remove single todo
clearCompleted() // Remove all completed todos
```

### 4. Dark Mode Implementation
- Stored in Context and localStorage
- Applied via `document.documentElement.classList` for Tailwind
- All components respond to `useTheme()` hook
- Smooth transitions with CSS

### 5. Filtering System
- **all** - Show all todos
- **active** - Show only incomplete todos
- **completed** - Show only finished todos
- Filter state stored in Context

### 6. Animations & Styling
- **Tailwind dark mode**: Uses class strategy
- **Custom animations**: Defined in tailwind.config.js
- **CSS transitions**: Smooth 300-500ms color/transform changes
- **Hover effects**: Scale buttons, lift cards on hover

## 🎓 Key Concepts Demonstrated

### State Management Pattern
```javascript
// Before: Prop drilling
<App todos={todos} setTodos={setTodos}>
  <TodoList todos={todos} setTodos={setTodos}>
    <TodoItem />
  </TodoList>
</App>

// After: Context API
<TodoProvider>
  <App /> // Access todos anywhere with useTodos()
</TodoProvider>
```

### Derived State
```javascript
// Instead of managing filteredTodos separately
const [filteredTodos, setFilteredTodos] = useState([])

// Compute it from existing state
const filteredTodos = getFilteredTodos() // Based on todos + filter
```

### localStorage Sync Pattern
```javascript
// Load on init
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos')
  return saved ? JSON.parse(saved) : []
})

// Sync on change
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
```

## 🔧 Common Customizations

### Change Color Scheme
Edit `tailwind.config.js` theme colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color'
    }
  }
}
```

### Add new CRUD operation
1. Add function to TodoContext
2. Export it in the value object
3. Use `useTodos()` to access it in components

### Modify dark mode behavior
- Update `toggleDarkMode()` in TodoContext
- Adjust dark mode CSS in components
- Update transition duration if needed

## 📊 Stats Interpretation

- **Total**: All todos (active + completed)
- **Active**: Todos with completed: false
- **Completed**: Todos with completed: true

## 🐛 Debugging Tips

### Check localStorage
```javascript
// Browser console
JSON.parse(localStorage.getItem('todos'))
JSON.parse(localStorage.getItem('darkMode'))
```

### Verify Context
```javascript
// In any component
const { todos, filter, darkMode } = useTodos()
console.log(todos, filter, darkMode)
```

### Watch re-renders
Add React DevTools browser extension to track component updates

## 🎯 Next Steps to Extend

1. **Due dates** - Add date picker and sort by due date
2. **Categories** - Add tags/categories for todos
3. **Priority levels** - Add high/medium/low priority
4. **Search** - Add search functionality
5. **Cloud sync** - Sync todos to cloud service
6. **PWA** - Convert to Progressive Web App
7. **Statistics** - Add charts for productivity tracking

---

Happy coding! 🎉
