import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords=async ()=>{
        let req= await fetch("https://passop-backend-ofea.onrender.com")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copy to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
        console.log(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.jpeg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            // if any such id exists in db, delete it
            await fetch("https://passop-backend-ofea.onrender.com",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch("https://passop-backend-ofea.onrender.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            
            setForm({ site: "", username: "", password: "" })
            toast('Password saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error: Password not saved',{
                theme: "dark",
            })
        }
    }

    const deletePassword = async(id) => {
        console.log("deleting password with id", id)
        let confirmm = confirm("Do you really want to Delete?")
        if (confirmm) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // removes only the item that matches the given id

            await fetch("https://passop-backend-ofea.onrender.com",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            

            toast('Password Deleted', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id", id)
        setForm({...passwordArray.filter(i => i.id === id)[0],id:id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        // before the selected id was copying to setform, now by this it moves to setform because we are deleting that id
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto right-[0] top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgb(28,221,10,20%);] opacity-50 blur-[80px]"></div></div>

            <div className='md:mycontainer p-4  md:px-10 md:py-4  md:pt-28 md:min-h-screen min-h-[73vh]'>
                <h1 className='md:text-4xl text-3xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="username" id="username" />

                        <div className="relative w-full">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 pr-8' type="password" name="password" id="password" />
                            <span className='absolute right-0 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2' width={35} src="icons/eye.jpeg" alt="show" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-600 rounded-full py-1 w-1/4 gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords">
                    <h2 className=' font-bold md:text-2xl text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-lg'>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-900 text-white'>
                            <tr>
                                <th className='font-semibold py-2'>Site</th>
                                <th className='font-semibold py-2'>Username</th>
                                <th className='font-semibold py-2'>Password</th>
                                <th className='font-semibold py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-1  border border-white w-2/5  '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='px-1' onClick={() => { copyText(item.site) }}>
                                                <img src='icons/copy2.svg' className='lordiconcopy w-4 cursor-pointer hover:w-3' alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center py-1 md:py-2   border border-white w-1/5'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='px-1' onClick={() => { copyText(item.username) }}>
                                                <img src='icons/copy2.svg' className='lordiconcopy w-4 cursor-pointer hover:w-3' alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center py-1 md:py-2   border border-white w-1/5'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='px-1' onClick={() => { copyText(item.password) }}>
                                                <img src='icons/copy2.svg' className='lordiconcopy w-4 cursor-pointer hover:w-3' alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center py-1 md:py-2  border border-white w-1/5'>
                                        <div className="flex items-center justify-center h-full cursor-pointer gap-2">
                                            <img src="icons/edit.svg" className='w-4 hover:w-5' alt="edit" onClick={() => { editPassword(item.id) }} />
                                            <img src="icons/delete.svg" className='w-4 hover:w-5' alt="delete" onClick={() => { deletePassword(item.id) }} />
                                        </div>




                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>


            </div>

        </div>
    )
}

export default Manager




