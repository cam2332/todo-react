import React, { SyntheticEvent } from 'react'
import Todo from '../models/Todo'

interface IFormProps {
  inputText: string
  setInputText: (value: string) => void
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  setStatus: (status: string) => void
}

const Form = (props: IFormProps) => {
  const inputTextHandler = (event: SyntheticEvent) => {
    props.setInputText((event.target as HTMLInputElement).value)
  }

  const submitTodoHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    props.setTodos([
      ...props.todos,
      { text: props.inputText, completed: false, id: Math.random() * 1000 },
    ])
    props.setInputText('')
  }

  const statusHandler = (event: SyntheticEvent) => {
    props.setStatus((event.target as HTMLInputElement).value)
  }

  return (
    <form>
      <input
        value={props.inputText}
        onChange={inputTextHandler}
        type='text'
        className='todo-input'
      />
      <button onClick={submitTodoHandler} className='todo-button' type='submit'>
        <i className='fas fa-plus-square'></i>
      </button>
      <div className='select'>
        <select onChange={statusHandler} name='todos' className='filter-todo'>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='uncompleted'>Uncompleted</option>
        </select>
      </div>
    </form>
  )
}

export default Form
