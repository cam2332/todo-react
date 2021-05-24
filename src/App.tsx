import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import TodoList from './components/TodoList'
import Todo from './models/Todo'

function App() {
  const [theme, setTheme] = useState('light')
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  useEffect(() => {
    getLocalTodos()
    getLocalTheme()
  }, [])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  useEffect(() => {
    applyTheme()
    saveLocalTheme()
  }, [theme])

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo: Todo) => todo.completed === true))
        break
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo: Todo) => todo.completed === false))
        break
      default:
        setFilteredTodos(todos)
        break
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos') || '[]')
      setTodos(todoLocal)
    }
  }

  const saveLocalTheme = () => {
    localStorage.setItem('theme', theme)
  }

  const getLocalTheme = () => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(localStorage.getItem('theme') || 'light')
    }
  }

  const themeHandler = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }

  const applyTheme = () => {
    const lightBackgroundImage =
      'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
    const darkBackgroundImage =
      'linear-gradient(120deg, #492f52 0%, #1c133b 100%)'
    const lightElementBackground = 'white'
    const darkElementBackground = '#1f1530'

    document.documentElement.style.setProperty(
      '--background-image',
      theme === 'light' ? lightBackgroundImage : darkBackgroundImage,
    )
    document.documentElement.style.setProperty(
      '--element-background',
      theme === 'light' ? lightElementBackground : darkElementBackground,
    )
    document.documentElement.style.setProperty(
      '--text-color',
      theme === 'light' ? darkElementBackground : lightElementBackground,
    )
  }

  return (
    <div className='App'>
      <button onClick={themeHandler} className='theme-btn'>
        {theme === 'light' ? (
          <i className='fas fa-moon'></i>
        ) : (
          <i className='fas fa-sun'></i>
        )}
      </button>
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
      />
    </div>
  )
}

export default App
