import React, { useContext, useEffect, useRef, useState } from 'react'
import Avatar from "react-avatar"
import { Context } from "../../main"
import axios from "axios";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Auth = () => {

  const navigateTo = useNavigate()
  const { theme, isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [isLogin, setIsLogin] = useState(true)
  const clickRef = useRef()

  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [education, setEducation] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("")

  const chooseFile = (e) => {
    e.preventDefault()
    clickRef.current.click()
  }

  const handleAvatar = (e) => {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }

  let formData = new FormData();
  formData.append("name", name)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("role", role)
  formData.append("education", education)
  formData.append("number", number)
  formData.append("userAvatar", avatar)

  const register = async (e) => {
    e.preventDefault()
    try {

      axios.defaults.withCredentials = true
      console.log(avatar)
      const { data } = await axios.post("http://localhost:1000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        })

      if (data.success) {
        setIsAuthenticated(true)
        navigateTo('/')
        toast.success(data.message)
        setName("")
        setEmail("")
        setPassword("")
        setEducation("")
        setAvatarPreview("")
        setAvatar("")
        setRole("")
        setNumber("")
      }

    } catch (err) {
      toast.error(err.response.data.message)
    }

  }

  const login = async (e) => {
    e.preventDefault()
    try {

      axios.defaults.withCredentials = true
      const { data } = await axios.post("http://localhost:1000/api/v1/user/login", {
        email, password, role
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (data.success) {
        setIsAuthenticated(true)
        navigateTo('/')
        toast.success(data.message)
        setEmail("")
        setPassword("")
        setRole("")
      }

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <Navbar />
      <div className={`${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
        <div className={`pt-[12rem] pb-[4rem]`}>
          <h1 className={`text-center font-semibold text-xl ${theme == "light" ? "text-black" : "text-white"}  uppercase`}>{isLogin ? "Login" : "Register"}</h1>
          <div className='md:pl-[24rem] md:pr-[24rem] pr-4 pl-4 w-full flex flex-row justify-center items-center'>
            <form className='w-full'>
              <select onChange={(e) => setRole(e.target.value)} value={role} className={`w-full border-b-2  outline-none ${theme == "light" ? "text-black bg-transparent" : "text-white bg-[#171A29]"}`}>
                <option value="" >Select Role</option>
                <option value="Reader" >Reader</option>
                <option value="Author">Author</option>
              </select>
              {!isLogin && <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Your Name' className={`pt-4 w-full border-b-2 bg-transparent outline-none ${theme == "light" ? "text-black" : "text-white"}`} />}
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Your Email' className={`pt-4 w-full border-b-2 bg-transparent outline-none ${theme == "light" ? "text-black" : "text-white"}`} />
              {!isLogin && <input onChange={(e) => setNumber(e.target.value)} value={number} type="number" placeholder='Your Number' className={`pt-4 w-full border-b-2 bg-transparent outline-none ${theme == "light" ? "text-black" : "text-white"}`} />}
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className={`pt-4 w-full border-b-2 bg-transparent outline-none ${theme == "light" ? "text-black" : "text-white"}`} />
              {!isLogin && <select onChange={(e) => setEducation(e.target.value)} value={education} className={`w-full border-b-2 pt-4 outline-none ${theme == "light" ? "text-black bg-transparent" : "text-white bg-[#171A29]"}`}>
                <option value="">Select Your Education</option>
                <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                <option value="Master of Science (Computer Science)">Master of Science (Computer Science)</option>
                <option value="Bachelor of Computer Applications">Bachelor of Computer Applications</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
              </select>}
              {!isLogin && <div className='flex gap-2 pt-4 justify-start items-center'>
                <Avatar src={avatarPreview ? avatarPreview : "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"} size="50" className='rounded-full' />
                <button className='bg-[purple] text-white w-full pt-1 pb-1 outline-none hover:bg-[#9001BA] transition-all ease-in-out duration-500' onClick={chooseFile}>Choose File</button>
                <input type="file" onChange={handleAvatar} ref={clickRef} className='w-full border-b-2 bg-transparent hidden' />
              </div>}
              <p className='text-sm text-slate-600 pt-4 text-center'>{isLogin ? "Don't have any account?" : "Already Registered?"} <span className='text-orange-600 cursor-pointer capitalize' onClick={() => setIsLogin(!isLogin)}>{!isLogin ? "Login Now" : "Register Now"}</span></p>
              <button type="submit" className='text-sm text-white bg-[#F700CA] hover:bg-[#A22BB5] transition-all ease-in-out duration-500 font-semibold w-full pt-1 pb-1 uppercase mt-4 outline-none' onClick={isLogin ? login : register}>{isLogin ? "Login" : "Register"}</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Auth
