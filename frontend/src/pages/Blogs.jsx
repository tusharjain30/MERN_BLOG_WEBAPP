import React, { useContext, useEffect } from 'react'
import Card from '../components/Card/Card'
import { Context } from "../main"
import { BallTriangle } from 'react-loader-spinner'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Blogs = () => {

  const { theme, allBlogs } = useContext(Context)

  return (
    <>
      <Navbar />
      <div className={`${theme == 'light' ? "bg-[#F7F7F8] " : "bg-[#171A29]"} flex flex-col md:flex-row flex-wrap justify-center pt-[4rem] md:pt-[10rem] items-center md:justify-between pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem] gap-8`}>
        {
          allBlogs.length > 0
            ?
            (allBlogs.map((curVal) => {
              return <Card value={curVal} key={curVal._id} />
            }))
            :
            (<div className={`flex flex-col md:flex-row flex-wrap justify-between pl-4 pr-4 pt-[4rem] md:pt-[10rem] pb-4 md:pl-[4rem] md:pr-[4rem] gap-4 md:gap-4 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
              <BallTriangle
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>)
        }

      </div>
      <Footer />
    </>
  )
}

export default Blogs
