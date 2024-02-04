import React from 'react'

const TodoItem = ({title,description,isCompleted,updateHandeller,deleteHandeller,id}) => {
  return (
    <div className='todo'>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input onChange={()=>updateHandeller(id)} type="checkbox" checked={isCompleted}/>
        <button onClick={()=>deleteHandeller(id)} className='btn'>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem
