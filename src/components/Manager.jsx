import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = 'text'
    if (ref.current.src.includes("eyecross.svg")) {
      ref.current.src = "build/eye.svg"
      passwordRef.current.type = 'text'
    }
    else {
      ref.current.src = "build/eyecross.svg"
      passwordRef.current.type = 'password'
    }
  }

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newEntry = { ...form, id: uuidv4() };
      
      setPasswordArray([...passwordArray, newEntry]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, newEntry]));
      setForm({ site: "", username: "", password: "" });
      
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    } else {
      toast('Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }

  }

  const editPassword = (id) => {
    setform(passwordArray.filter(i => i.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
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
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className="p-3 md:mycontainer min-h-[83.5vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
              <span className='absolute right-[6px] top-[9px] w-5 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='w-4' src="eye.svg" alt="eye.png" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
            <span className="material-symbols-outlined">
              library_add
            </span>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='cursor-pointer' onClick={() => copyText(item.site)}>
                        <img src="build/copy.svg" alt="copy" className='w-6 pl-2 pt-1' />
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      {item.username}
                      <div className='cursor-pointer' onClick={() => copyText(item.username)}>
                        <img src="build/copy.svg" alt="copy" className='w-6 pl-2 pt-1' />
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      {"*".repeat(item.password.length)}
                      <div className='cursor-pointer' onClick={() => copyText(item.password)}>
                        <img src="build/copy.svg" alt="copy" className='w-6 pl-2 pt-1' />
                      </div>
                    </div>
                  </td>
                  <td className='flex items-center justify-center cursor-pointer py-2 border border-white text-center gap-2'>
                    <img onClick={() => editPassword(item.id)} src="build/edit.svg" alt="" />
                    <img onClick={() => deletePassword(item.id)} src="build/delete.svg" alt="" />
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