import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar"
import { Context } from '../../main';
import { IoIosSunny } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    const { theme, setTheme, isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context)
    const [showNav, setShowNav] = useState(false)
    const navigateTo = useNavigate()

    const isNavShow = (e) => {
        e.preventDefault()
        setShowNav(!showNav)
    }

    const darkTheme = () => {
        setTheme("dark")
    }

    const lightTheme = () => {
        setTheme("light")
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
        <>
            <div className={`flex flex md:flex-col ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}  z-30 items-center justify-between fixed top-0 justify-center w-[100%] pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem]`}>
                <div className='pt-2 pb-2 flex justify-between gap-6 w-full items-center'>
                    <Link to={"/"}><h1 className={`md:text-2xl uppercase text-md font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Business Blog</h1></Link>
                    <div className='flex gap-4 hidden md:flex'>
                        <Avatar src={user?.userAvatar?.url ? user?.userAvatar?.url : "https://cdn-icons-png.freepik.com/512/6596/6596121.png"} size="40" className='rounded-full cursor-pointer' />
                    </div>
                </div>
                <nav className='pt-2 pb-2 hidden md:flex'>
                    <ul className='flex gap-8 items-center'>
                        <Link to="/"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>Home</li></Link>
                        <Link to="/blogs"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>All Blogs</li></Link>
                        <Link to="/authors"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>all authors</li></Link>
                        {
                            isAuthenticated
                                ?
                                (<li onClick={loggedOut} className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>logout</li>)
                                :
                                (<Link to="/auth"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>login</li></Link>)
                        }

                        {
                            theme == 'dark'
                                ? <IoMoonSharp size="20" className='cursor-pointer text-white' onClick={lightTheme} />
                                : <IoIosSunny size="20" className='cursor-pointer text-orange-700' onClick={darkTheme} />
                        }
                        {
                            user.role === "Author"
                            &&
                            <Link to="/dashboard"><button className='uppercase bg-[#6813F7] hover:bg-[#2254B6] transition-all duration-500 ease-in-out text-white w-[8rem] text-xs pt-1 pb-1 rounded-md'>Dashboard</button></Link>
                        }
                    </ul>
                </nav>
                <div className='md:hidden' onClick={isNavShow}>
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox" className="toggle" >
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </label>
                </div>
            </div>
            {showNav ? <div className=' pt-2 pb-2 pl-8 pt-[4rem] bg-black h-screen md:hidden fixed z-30 top-0 w-[70%]'>
                <nav>
                    <ul className='flex flex-col gap-8'>
                        <Avatar src={user?.userAvatar?.url ? user?.userAvatar?.url : "https://cdn-icons-png.freepik.com/512/6596/6596121.png"} size="80" className='rounded-full cursor-pointer' />
                        <Link to="/"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-white" : "text-white hover:text-[#626578]"}  font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>Home</li></Link>
                        <Link to="/blogs"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-white" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>All Blogs</li></Link>
                        <Link to="/authors"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-white" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>all authors</li></Link>
                        {
                            !isAuthenticated
                                ?
                                (<Link to="/auth"><li className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>login</li></Link>)
                                :
                                (<li onClick={loggedOut} className={`uppercase ${theme == 'light' ? "text-[#626578] hover:text-black" : "text-white hover:text-[#626578]"} font-semibold transition-all duration-500 ease-in-out cursor-pointer text-xs md:text-sm`}>logout</li>)
                        }
                        {
                            theme == 'dark'
                                ? <IoMoonSharp size="20" className='cursor-pointer text-white' onClick={lightTheme} />
                                : <IoIosSunny size="20" className='cursor-pointer text-orange-700' onClick={darkTheme} />
                        }
                        {
                            user.role === "Author"
                            &&
                            <Link to="/dashboard"><button className='uppercase bg-[#6813F7] hover:bg-[#2254B6] transition-all duration-500 ease-in-out text-white w-[8rem] text-xs pt-1 pb-1 rounded-md'>Dashboard</button></Link>
                        }
                    </ul>
                </nav>
            </div>
                : ""}
        </>
    )
}

export default Navbar
