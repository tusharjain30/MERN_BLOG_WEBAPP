import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Context } from '../main'

const NotFoundPage = () => {

  const { theme } = useContext(Context)

  return (
    <div className={`flex flex-col justify-center h-screen items-center pt-[2rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
      <Link to={"/"}><img src="images/404.png" className='w-[400px]' /></Link>
    </div>
  )
}

export default NotFoundPage
