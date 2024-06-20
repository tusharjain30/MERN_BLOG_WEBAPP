import React, { useContext, useEffect, useState } from 'react'
import BlogCard from '../components/DashboardComponents/BlogCard'
import axios from 'axios'
import { Context } from '../main'

const AllBlogs = () => {

  const { selfBlog, setSelfBlog } = useContext(Context)

  useEffect(() => {
    const getSelfBlog = async () => {
      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.get("http://localhost:1000/api/v1/blog/getSelfBlogs", {
          withCredentials: true
        })

        if (data.success) {
          setSelfBlog(data.blogs)
        }

      } catch (err) {
        console.log(err)
      }
    }

    getSelfBlog()

  }, [])

  return (
    <>
      <div className={`flex flex-col md:flex-row flex-wrap justify-center items-center w-full z-30 md:mt-0 mt-[2rem] ${selfBlog?.length == 0 ? "h-screen" : ""}`}>
        {
          selfBlog && selfBlog.map((curVal) => {
            return (<BlogCard key={curVal._id} value={curVal} />)
          })
        }

      </div>
    </>
  )
}

export default AllBlogs
