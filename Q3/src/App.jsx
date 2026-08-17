import React, { useEffect, useState } from 'react'
import './App.css'
import AnimatedStarsBackground from './AnimatedStarsBackground';

const App = () => {

  const [alltodo,setAllTodo]=useState([]);
  const [singletodo,setSingleTodo]=useState({title:"", desc:""})


  function handletodo(){

    setAllTodo((prevstate)=>[...prevstate,singletodo]);
    savetolocalstorage([...alltodo,singletodo]);
  }

  useEffect(()=>{
    getdatafromlocalstorage();
  },[])


  function savetolocalstorage(todo){
    localStorage.setItem("todos",JSON.stringify(todo))
  }

  function getdatafromlocalstorage(){
    const saved = localStorage.getItem("todos");
    const parsed = saved ? JSON.parse(saved) : [];
    setAllTodo(parsed);
  }


  function deletetodo(i){
    setAllTodo((prevstat) => {
      const updated = prevstat.filter((_, index) => index !== i);
      savetolocalstorage(updated);
      return updated;
    });
  }
  return (
    <>
      <AnimatedStarsBackground />
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center tracking-tight"> Todo List</h1>
          <div className="flex flex-col gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter title"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-100 placeholder-gray-400 transition"
              onChange={(e) => {
                setSingleTodo((prevstat) => ({
                  ...prevstat, title: e.target.value
                }))
              }}
            />
            <input
              type="text"
              placeholder="Enter Desc"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-100 placeholder-gray-400 transition"
              onChange={(e) => {
                setSingleTodo((prevstat) => ({ ...prevstat, desc: e.target.value }))
              }}
            />
            <button
              onClick={handletodo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition active:scale-95"
            >
              Add Task
            </button>
          </div>

          <div className="space-y-4">
            {alltodo.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border border-gray-200 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 break-words">{item.title}</h2>
                  <button
                    onClick={() => { deletetodo(i) }}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-sm transition active:scale-95"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-600 break-words">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App