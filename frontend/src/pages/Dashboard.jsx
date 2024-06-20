import React, { useContext, useEffect } from 'react'
import { Context } from '../main'
import CreateBlog from './CreateBlog'
import Chart from './Chart'
import MyProfile from './MyProfile'
import AllBlogs from './AllBlogs'
import DashboardNavbar from '../components/DashboardComponents/DashboardNavbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { Navigate } from 'react-router-dom'

const Dashboard = () => {

    const { theme, component, showDashNav, isAuthenticated, setShowDashNav, user } = useContext(Context)


    if (user.role == "Reader" || !isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className={`${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
            <div className={`w-full ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"} fixed z-50 p-4 md:hidden`}>
                <GiHamburgerMenu size="30" className={`ml-2 pt-2 ${theme == "light" ? "text-black" : "text-white"} cursor-pointer md:hidden`} onClick={() => setShowDashNav(!showDashNav)} />
            </div>
            <div className='flex w-[100%] justify-between'>
                <DashboardNavbar />
                <section className={`w-full md:pl-[20%] flex justify-center items-center flex-wrap pr-2 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                    {
                        component == "Create Blog" ? (<CreateBlog />)
                            : component == "Chart" ? (<Chart />)
                                : component == "My Profile" ? (<MyProfile />)
                                    : (<AllBlogs />)
                    }
                </section>
            </div>
        </div>
    )
}

export default Dashboard
