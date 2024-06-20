import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import Avatar from 'react-avatar'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const SingleBlog = () => {

  const { theme, isAuthenticated } = useContext(Context)
  const [singleBlog, setSingleBlog] = useState({})
  const { id } = useParams()

  useEffect(() => {

    const getSingleBlog = async () => {
      try {
        axios.defaults.withCredentials = true
        const { data } = await axios.get(`http://localhost:1000/api/v1/blog/getSingleBlog/${id}`, {
          withCredentials: true
        })

        if (data.success) {
          setSingleBlog(data.blog)
        }
      } catch (err) {
        console.log(err.response.data.message)
      }
    }

    getSingleBlog()

  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Navbar />
      <div className={`flex flex-col justify-center items-start pt-[6rem] md:pt-[10rem] md:pl-[4rem] md:pr-[4rem] pl-4 pr-4 pb-[2rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
        {singleBlog?.category && <h1 className='uppercase text-white  text-xs pl-2 pr-2 pt-1 pb-1 bg-[#0065E3]'>{singleBlog?.category}</h1>}
        {singleBlog?.title && <h1 className={`w-full text-xl pt-4 font-semibold ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.title}</h1>}
        <div className='flex justify-center items-center gap-2 mt-4'>
          {singleBlog?.authorAvatar && <Avatar src={singleBlog?.authorAvatar ? singleBlog?.authorAvatar : "https://cdn-icons-png.freepik.com/512/6596/6596121.png"} size="35" className='rounded-full' />}
          {singleBlog?.authorName && <p className={`${theme == "light" ? "text-slate-800" : "text-white"} text-sm`}>{singleBlog?.authorName}</p>}
        </div>
        <p className={`text-xs pt-4 ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{singleBlog?.createdAt?.slice(0, 10)}</p>
        {singleBlog?.mainImage?.url && <img src={singleBlog?.mainImage?.url} className='w-full pt-4' />}
        {singleBlog?.intro && <p className={`w-full text-sm pt-4 ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.intro}</p>}
        {singleBlog?.paraOneTitle && <h1 className={`w-full text-xl pt-8 font-semibold ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraOneTitle}</h1>}
        {singleBlog?.paraOneImage?.url && <img src={singleBlog?.paraOneImage?.url} className='w-full pt-4' />}
        {singleBlog?.paraOneDescription && <p className={`w-full text-sm pt-4 ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraOneDescription}</p>}
        {singleBlog?.paraTwoTitle && <h1 className={`w-full text-xl pt-8 font-semibold ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraTwoTitle}</h1>}
        {singleBlog?.paraTwoImage?.url && <img src={singleBlog?.paraTwoImage?.url} className='w-full pt-4' />}
        {singleBlog?.paraTwoDescription && <p className={`w-full text-sm pt-4 ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraTwoDescription}</p>}
        {singleBlog?.paraThreeTitle && <h1 className={`w-full text-xl pt-8 font-semibold ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraThreeTitle}</h1>}
        {singleBlog?.paraThreeImage?.url && <img src={singleBlog?.paraThreeImage?.url} className='w-full pt-4' />}
        {singleBlog?.paraThreeDescription && <p className={`w-full text-sm pt-4 ${theme == "light" ? "text-black" : "text-white"}`}>{singleBlog?.paraThreeDescription}</p>}
      </div>

      <Footer />
    </>

  )
}

export default SingleBlog
