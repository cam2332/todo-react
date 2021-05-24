import React from 'react'
import Todo from '../models/Todo'

interface ITodoItemProps {
  todo: Todo
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

const TodoItem = (props: ITodoItemProps) => {
  const deleteHandler = () => {
    props.setTodos(
      props.todos.filter((todo: Todo) => todo.id !== props.todo.id),
    )
  }
  const completeHandler = () => {
    props.setTodos(
      props.todos.map((todo: Todo) => {
        if (todo.id === props.todo.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      }),
    )
  }

  return (
    <div className='todo'>
      <li className={`todo-item ${props.todo.completed && 'completed'}`}>
        {props.todo.text}
      </li>
      <button onClick={completeHandler} className='complete-btn'>
        <i className='fas fa-check'></i>
      </button>
      <button onClick={deleteHandler} className='trash-btn'>
        <i className='fas fa-trash'></i>
      </button>
    </div>
  )
}

export default TodoItem
