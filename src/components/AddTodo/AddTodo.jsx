// import React,{useState} from 'react'
// import "./AddTodo.css"
// import { useState } from 'react'
// const AddTodo = ({addTodo}) => {
//  const[title,setTitle]=useState("");
//  const handleSubmit =(e)=>{
//     e.preventDefault();
//     if(title.trim()){
//         addTodo(title);
//         setTitle("");
//     }

//  }
//  return(
//     <form className='add-todo-form' onSubmit={handleSubmit}>
//         <input 
//            type="text"
//            className='add-todo-input'
//            value={title}
//            onChange={(e)=>setTitle(e.target.value)}
//            placeholder='Add a new todo'
//         />
//         <button type='submit' className='add-todo-button'>Add</button>

//     </form>
//  )
// }

// export default AddTodo
import { useState } from "react";
import "./AddTodo.css";

function AddTodo({ onAdd }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a new todo" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodo;
