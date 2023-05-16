import React from 'react'
import {AiFillDelete} from 'react-icons/ai'

let color

const ListTask = ( {item, handleDelete, handleEdit} ) => {

    switch(item.status){
        case "New":
            color="yellow"
            break
        case "Chased":
            color="lightgrey"
            break
        case "Received":
            color="orange"
            break        
        case "Completed":
            color="blue"
            break       
        case "Sent for approval":
            color="green"
            break                     
        case "Repeat":
            color="red"
            break                                 
        default:
            color="white"
    }


  return (
    <ul>
    <li className="w-full py-3 mb-2" style={{backgroundColor:color}}>
    <div className="w-full px-2 m-auto flex justify-between gap-2 lg:w-3/5 lg:px-0">
      <input
        className="w-full px-2 py-3 rounded outline-none"
        type="text"
        value={item.task}
        onChange={(e) => handleEdit(item.id, 'task', e.target.value)}
      />
      <select
        className="rounded px-2 py-3 outline-none hover:cursor-pointer"
        value={item.status}
        onChange={(e) => handleEdit(item.id, 'status', e.target.value)}              
      >
        <option value="New">New</option>
        <option value="Chased">Chased</option>
        <option value="Sent for approval">Sent for approval</option>
        <option value="Repeat">Repeat</option>
        <option value="Received">Received</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        className="rounded px-2 py-3 outline-none hover:cursor-pointer"           
        value={item.size} 
        onChange={(e) => handleEdit(item.id, 'size', e.target.value)}              
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="1/2">1/2</option>
        <option value="1/4">1/4</option>         
      </select>
      
      <button
        className="p-3 rounded bg-red-500 hover:bg-red-700"
        onClick={()=>handleDelete(item.id)}
      >
        <AiFillDelete className="text-white text-2xl" />
      </button>
    </div>
    </li>
  </ul>
  )
}

export default ListTask