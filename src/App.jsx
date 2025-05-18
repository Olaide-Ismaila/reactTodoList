/* import { useState } from "react"

/*function App() {
const [todo, setTodo] = useState('');
const [displayTodo, setDisplayTodo] = useState('');const [date, setDate] = useState('');
const [displayDate, setDisplayDate] = useState('');
const [isShown, setIsShown] = useState(false);
const [todoLists, setTodoLists] = useState([]);


function handleTodo(e) {
  setTodo(e.target.value)
}

function handleDisplayTodo() {
  setDisplayTodo(todo);
  setDisplayDate(date);
  setIsShown(true);
  setTodoLists(prevTodo => [...prevTodo, todo, date, <button className="bg-red-500 py-1 text-white font-medium text-md px-6 rounded-sm w-full"
  onClick={deleteTodo}>Delete</button>])
  setTodo('');
  setDate('');
}

function handleDate(e) {
  setDate(e.target.value)
}

function deleteTodo() {
  console.log(todoLists.length);
}


  return (
    <main className="mx-2 my-4 p-2">
      <section className="w-full">
        <h2 className="mb-3 text-2xl font-bold">Todo List</h2>
        <article className="grid grid-cols-3 gap-x-20">
          <input 
            type="text" 
            className="border-red-400 border-2 p-1 mr-2" 
            name="Todo" 
            placeholder="Todo Name"
            value={todo} 
            onChange={handleTodo} />
          <input 
            type="date"       className="border-red-400 border-2 p-1 mr-2"
            value={date}
            onChange={handleDate}
          />
          <button 
            className="bg-green-500 py-1.5 text-white font-medium text-md px-8 mr-2 rounded-sm"
            onClick={handleDisplayTodo}
            >Add</button>
        </article>
    </section>
      <article className="mt-3 py-1 grid grid-cols-3 gap-x-20">
        {todoLists.map((todolist, index) => <p 
          key={index}
          className="p-1"
          >{todolist}</p>)}
      </article>
    </main>
  )
}
 */


import { useState, useRef, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    todo: '',
    date: ''
  });
  const [todoLists, setTodoLists] = useState(() => {
    const saveTodos = localStorage.getItem('todoLists');
    return JSON.parse(saveTodos) || [] });

  const todoRef = useRef(null);

  useEffect(() => {
    todoRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

 const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  } 

  const handleTodo = () => {
    setTodoLists([...todoLists, {id: Date.now(), todo: formData.todo, date: formData.date}])
    setFormData({todo: '', date: ''})
    todoRef.current.focus()
  }

  const deleteTodo = (id) =>{
    setTodoLists(todoLists.filter((list) => list.id !== id))
  }
  
  return (
    <main className="mx-2 my-4 p-2">
      <section className="w-full">
        <h2 className="mb-3 text-2xl font-bold">Todo List</h2>
        <article className="grid grid-cols-3 gap-x-20">
          <input 
            ref={todoRef}
            type="text" 
            className="border-red-400 border-2 p-1 mr-2" 
            name="todo" 
            placeholder="Todo Name"
            value={formData.todo}
            onChange={handleChange}
             />
          <input 
            type="date" 
            name="date"      
            className="border-red-400 border-2 p-1 mr-2"
            value={formData.date}
            onChange={handleChange}
          />
          <button 
            className="bg-green-500 py-1.5 text-white font-medium text-md px-8 mr-2 rounded-sm"
            onClick={handleTodo}
            >Add</button>
        </article>
    </section>
      <article className="mt-3 py-1">
      {todoLists.map((list) => <p key={list.id} className="mt-3 py-1 grid grid-cols-3 gap-x-20"><span className="p-1 mr-2">{list.todo}</span> <span>{list.date}</span><span><button className="bg-red-500 py-1 text-white font-medium text-md px-6 rounded-sm w-full" onClick={() => deleteTodo(list.id)}>Delete</button></span></p>
    )}
      </article>
    </main>

  )
}
export default App
