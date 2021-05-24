import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import TodoList from './components/TodoList'
import Todo from './models/Todo'

function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

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

  return (
    <div className='App'>
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
