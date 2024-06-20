import React, { useContext, useEffect } from 'react'
import { IoIosSunny } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardNavbar = () => {

    const navigateTo = useNavigate()
    const { theme, setTheme, setComponent, showDashNav, setShowDashNav, user, setUser, setIsAuthenticated } = useContext(Context)

    const darkTheme = () => {
        setTheme("dark")
    }

    const lightTheme = () => {
        setTheme("light")
    }

    const handleComponent = (value) => {
        setComponent(value)
    }

    const loggedOut = async (e) => {
        e.preventDefault()

        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.get('http://localhost:1000/api/v1/user/logout', {
                withCredentials: true
            })

            if (data.success) {
                setIsAuthenticated(false)
                setUser({})
                navigateTo('/auth')
                toast.success(data.message)
            }

        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (

        <div className='z-50'>
            <div className='relative'>
                {showDashNav && <IoMdClose size="20" className={`fixed top-0 mt-4 ml-2 z-50 text-white cursor-pointer md:hidden`} onClick={() => setShowDashNav(!showDashNav)} />}
            </div>
            <nav className={`h-screen fixed flex flex-col justify-center items-center w-[40%] md:w-[20%] gap-4 bg-[#152047] ${showDashNav ? "flex" : "hidden"} md:flex`}>

                <h1 className={`text-white uppercase font-bold`}>Welcome</h1>
                <div className='flex flex-col justify-center items-center gap-2 pb-[4rem]'>
                    <Avatar src={user?.userAvatar?.url} size="100" className='rounded-full cursor-pointer' />
                    <p className={`text-white text-sm capitalize`}>{user?.name}</p>
                </div>
                <div>
                    <button className='uppercase bg-[#D53AB2] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md' onClick={() => handleComponent("All Blogs")}>All Blogs</button>
                </div>
                <div>
                    <button className='uppercase bg-[#0615F7] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md' onClick={() => handleComponent("Create Blog")}>create blog</button>
                </div>
                <div>
                    <button className='uppercase bg-[#2254B6] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md' onClick={() => handleComponent("Chart")}>chart</button>
                </div>
                <div>
                    <button className='uppercase bg-[#6813F7] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md' onClick={() => handleComponent("My Profile")}>my profile</button>
                </div>
                <Link to="/"><div>
                    <button className='uppercase bg-[#F26100] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md'>Home</button>
                </div></Link>
                <div>
                    <button className='uppercase bg-[#F6D101] text-white w-[8rem] text-sm pt-1 pb-1 rounded-md' onClick={loggedOut}>log out</button>
                </div>
                {
                    theme == 'dark'
                        ? <IoMoonSharp size="20" className='cursor-pointer text-white' onClick={lightTheme} />
                        : <IoIosSunny size="25" className='cursor-pointer text-orange-700' onClick={darkTheme} />
                }
            </nav>
        </div>



    )
}

export default DashboardNavbar
