import React, {useState, useReducer} from 'react'
import axios from 'axios'


import ListTask from './ListTask'
import NewTask from './NewTask'

const ACTION = {
  NEW_TASK:"newTask",
  DELETE_TASK:"deleteTask",
  EDIT_TASK:"editTask"
}

const reducer = (state, action) => {
    const { type, payload } = action
  switch (type) {
      // case ACTION.NEW_TASK:
      // axios.post(process.env.NEXT_PUBLIC_URL+"/api/data", payload);
      // return [...state, payload]
    case ACTION.DELETE_TASK:
      axios.delete(process.env.NEXT_PUBLIC_URL+"/api/data?id="+payload)
      return state.filter(task => task.id !== payload)
    case ACTION.EDIT_TASK:
      return state.map(task=>{
        if(task.id===payload.id){
          return {...task, ...payload}
        }
      return task
      })
    default:
      return state
  }
}

export default function Home( {data} ) {

  const [state, dispatch] = useReducer(reducer, data)
  const [newTask, setNewTask] = useState("")
  const [newStatus, setNewStatus] = useState("New")
  const [newSize, setNewSize] = useState("1")

  const addTask = async () => {
    if(newTask.trim()){
      await axios.post(process.env.NEXT_PUBLIC_URL+"/api/data", {newTask, newStatus, newSize});
      setNewTask("")
      setNewSize("1")
      setNewStatus("New")
    }
  }

  const handleDelete = async (id) =>{
    confirm("Are you sure to want to delete this item?")&&dispatch({type:"deleteTask", payload:id})
  }

  const handleEdit =  (id, field, value) => {
    console.log(id, field, value)
    axios.put(process.env.NEXT_PUBLIC_URL+"/api/data", {id, value, field})  
    dispatch({type:ACTION.EDIT_TASK, payload:{id, [field]:value}})
  }

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl m-auto w-full lg:w-3/5">Flatplan</h1>
      <NewTask
        setNewTask={setNewTask}
        setNewStatus={setNewStatus}
        setNewSize={setNewSize}
        addTask={addTask}
        newTask={newTask}
        newStatus={newStatus}
        newSize={newSize}
      />
      <br /><hr /><br />
      {state.map((item, index)=>
        <ListTask
          key={index}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </main>
  )
}

export async function getServerSideProps() {
  const response = await axios.get(process.env.NEXT_PUBLIC_URL+"/api/data")
  const data = response.data

  return {
    props: {data}
  }
}