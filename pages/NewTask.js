import React from 'react'

const NewTask = ( {setNewSize, setNewStatus, setNewTask, addTask, newTask, newStatus, newSize} ) => {
  return (
<div className="sticky top-0 py-5 px-2 bg-black mt-5 w-full lg:px-0">
    <form
    onSubmit = {addTask}
    className="m-auto w-full flex justify-between gap-2 lg:w-3/5 "
  >
    <input
      className="w-full rounded px-2 py-3 outline-none"
      type="text"
      value={newTask}
      onChange={(e)=>setNewTask(prev=>e.target.value)}
    />
    <select
      className="w-fit rounded px-2 py-3 outline-none"        
      value={newStatus}
      onChange={(e)=>setNewStatus(prev=>e.target.value)}
    >
      <option value="New">New</option>
      <option value="Chased">Chased</option>
      <option value="Sent for approval">Sent for approval</option>
      <option value="Repeat">Repeat</option>
      <option value="Received">Received</option>
      <option value="Completed">Completed</option>                    
    </select>
    <select
      className='w-fit rounded px-2 py-3 outline-none'
      value={newSize}
      onChange={(e)=>setNewSize(prev=>e.target.value)}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="1/2">1/2</option>
      <option value="1/4">1/4</option>                              
    </select>
    <button
      className="w-fit rounded px-6 py-3 bg-green-300 hover:bg-green-500"
    >
      ADD
    </button>
  </form>
</div>
  )
}

export default NewTask