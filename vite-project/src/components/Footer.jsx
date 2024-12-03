import React from 'react'

const Footer = () => {
  return (
    <div className='footer w-full bg-slate-800 flex flex-col justify-center items-center text-white'>
      <div className='logo font-bold text-white text-2xl text-center'>
    
    <span className='text-green-700'>&lt;</span>
    <span>Pass</span>
    <span className='text-green-700'>OP&gt;</span>
    
    </div>
    <div className="flex justify-center items-center">Created with <img className='w-7 mx-2' src='icons/heart.png' alt='' /> by Shabahat</div>
    </div>
  )
}

export default Footer
