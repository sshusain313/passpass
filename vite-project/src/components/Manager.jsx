import React from 'react'
import {useRef, useState, useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
const ref=useRef();
const passwordRef=useRef();
const [form, setform]=useState({site: '', username:'', password:''})
const [passwordArray, setPasswordArray]=useState([])

const getPass = async () => {
  let req=await fetch(' http://localhost:3000')
  let passwords=await req.json();
  console.log(passwords)
  setPasswordArray(passwords);
}

useEffect(()=>{
    getPass()
    
},[])

const showPassword=()=>{
  passwordRef.current.type='text'
    console.log(ref.current.src);
    if(ref.current.src.includes('assets/cross-eye.png')){
        ref.current.src='assets/eye.webp';
        passwordRef.current.type='password'
    }
    else{
        ref.current.src='assets/cross-eye.png';
        passwordRef.current.type='text'
    }
}
const savePassword= async()=>{
 if(form.site.length>3 && form.username.length>3 && form.password.length>3){

//  if any such id exists in the database, delete it
await fetch('http://localhost:3000', {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id: form.id }) })
 
 setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
 await fetch('http://localhost:3000', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() }) })
//  localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
//  console.log([...passwordArray, form])
 setform({ site: '', username:'', password:''})
 toast('Password Saved Succesfully!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"
  });
 }
}
const handleChange=(e)=>{
    setform({...form, [e.target.name]: e.target.value})
}
const deletePassword=async(id)=>{
  toast('Password Deleted Succesfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });
  console.log('deleting password with id', id)
  let c=confirm('do you really want to delete this password ?')
  if(c){
  setPasswordArray(passwordArray.filter(item=>item.id!==id))
  // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  let res= await fetch('http://localhost:3000', {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id }) })
  }
}
const editPassword=(id)=>{
  console.log('edit password with id', id)
  setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
  setPasswordArray(passwordArray.filter(item=>item.id!==id))
}

// const handleChange=(e)=>{
//   setform({...form, [e.target.name]: e.target.value})
// }
const copyText=(text)=>{
  toast('Text Copied!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });
    navigator.clipboard.writeText(text)
 }

  return (
  <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    // transition="Bounce"
    />
    <ToastContainer />
    <div className="bg-green-50 mycontainer">
        <h1 className='text-4xl text font-bold text-center '>
            <span className='text-green-700'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>OP&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own password manager</p>

      <div className='flex flex-col p-4 text-black gap-4'>
        <input value={form.site} onChange={handleChange}  className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" placeholder='enter website url' />
        <div className="flex w-full justify-between gap-4">
        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" placeholder='enter username' />
        <div className="relative">
        <input value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="password" id="password" placeholder='enter password' />
        <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
        <img ref={ref} className='p-2' width={20} src='assets/eye.webp' alt='eye' />
        </span>
        </div>
      </div>
        <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-500 hover:bg-green-300 rounded-full border border-green-900 mx-auto px-4 py-2 w-fit'>
            <lord-icon 
             src='https://cdn.lordicon.com/jgnvfzqg.json'
             trigger='hover'
             >
            </lord-icon>
            Add Password</button>
      </div>
      <div className="passwords">
        <h2 className='font-bold text-xl py-4'>your passwords</h2>
        {passwordArray.length===0 && <div>No Passwords to show</div>}
        {passwordArray.length !=0 &&<table className="table-auto w-full overflow-hidden rounded-md">
  <thead className='bg-green-800 text-white'>
    <tr>
      <th className='py-2'>site</th>
      <th className='py-2'>username</th>
      <th className='py-2'>password</th>
      <th className='py-2'>actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-100'>
    {passwordArray.map((item,index)=>{
       return <tr key={index}>
      <td className='py-2 border border-white text-center '>
      <div className="flex align-items justify-center">
       <a href={item.site} target='_blank'>{item.site}</a>
       <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.site)}} >
       <lord-icon 
       style={{'width':'25px', 'height':'25px', 'paddingTop':'3px', 'paddingLeft':'3px'}}
       src='https://cdn.lordicon.com/iykgtsbt.json'
       trigger='hover'
       >
       </lord-icon>
       </div>
       </div>
       </td>
       <td className='py-2 border border-white text-center '>
       <div className="flex align-items justify-center">
       <span>{item.username}</span>
       <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
       <lord-icon 
       style={{'width':'25px', 'height':'25px', 'paddingTop':'3px', 'paddingLeft':'3px'}}
       src='https://cdn.lordicon.com/iykgtsbt.json'
       trigger='hover'
       >
       </lord-icon>
       </div>
       </div>
       </td>
       <td className='py-2 border border-white text-center '>
       <div className="flex align-items justify-center">
       <span>{"*".repeat(item.password.length)}</span>
       <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
       <lord-icon 
       style={{'width':'25px', 'height':'25px', 'paddingTop':'3px', 'paddingLeft':'3px'}}
       src='https://cdn.lordicon.com/iykgtsbt.json'
       trigger='hover'
       >
       </lord-icon>
       </div>
       </div>
       </td>
       <td className='justify-center py-2 border border-white text-center'>
        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
          <lord-icon
            src='https://cdn.lordicon.com/gwlusjdu.json'
            trigger='hover'
            style={{'width':'25px', 'height':'25px'}}>
          </lord-icon>
        </span>
        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
          <lord-icon
          src='https://cdn.lordicon.com/skkahier.json'
          trigger='hover'
          style={{'width':'22px', 'height':'22px'}}>
        </lord-icon>
        </span>
       </td>
     </tr>
    })}
    </tbody>
    </table>}
      </div>
    </div>
  </>
  
  )
}

export default Manager
