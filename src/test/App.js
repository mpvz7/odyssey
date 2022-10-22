import React, {useState, useRef, useEffect } from 'react'
import TodoList from './test/TodoList.js'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const todosCopy = [...todos]
    const todo = todosCopy.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(todosCopy)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(previousTodo =>{
      return [...previousTodo, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const todosCopy = todos.filter(todos => !todos.complete)
    setTodos(todosCopy)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"></input>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Todo</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;