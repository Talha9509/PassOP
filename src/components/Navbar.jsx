import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white '>
      <div className="mycontainer flex justify-around items-center px-4 py-5 h-14">
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
          </div>
        {/* <ul>
          <li className='flex gap-3'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">Home</a>
          </li>
        </ul> */}
        <button className='  bg-green-600 my-5 flex  justify-center items-center rounded-3xl ring-green-200 ring-1'>
          <img className='w-8 ' src="icons/github.svg" alt="github logo" />
          <span className='font-semibold px-2 text-[#090532]'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
