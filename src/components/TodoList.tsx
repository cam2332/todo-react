import React from 'react'
import Todo from '../models/Todo'
import TodoItem from './TodoItem'

interface ITodoListProps {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

const TodoList = (props: ITodoListProps) => {
  return (
    <div className='todo-container'>
      <ul className='todo-list'>
        {props.todos.map((todo: Todo) => (
          <TodoItem
            todos={props.todos}
            setTodos={props.setTodos}
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
