import React, { useContext, useEffect } from 'react'
import { Context } from '../main'
import axios from 'axios'

const MyProfile = () => {

  const { theme, user } = useContext(Context)


  return (
    <div className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-14 h-screen pl-2 pr-2'>
      <img src={user?.userAvatar?.url ? user?.userAvatar?.url : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} className='w-[300px] h-[300px] rounded-full' />
      <div>
        <div className='flex gap-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-semibold text-sm`}>Name: </h1>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} text-sm`}>{user?.name}</h1>
        </div>
        <div className='flex gap-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-semibold text-sm`}>Email: </h1>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} text-sm`}>{user.email}</h1>
        </div>
        <div className='flex gap-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-semibold text-sm`}>Phone: </h1>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} text-sm`}>{user.number}</h1>
        </div>
        <div className='flex gap-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-semibold text-sm`}>Education: </h1>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} text-sm`}>{user.education}</h1>
        </div>
        <div className='flex gap-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-semibold text-sm`}>Role: </h1>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} text-sm`}>{user.role}</h1>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;
