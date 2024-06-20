import React, { useContext } from 'react'
import Avatar from 'react-avatar'
import { Context } from '../../main'

const AuthorCard = ({ value }) => {

    const { theme } = useContext(Context)

    return (

        <div className='flex flex-col items-center gap-2'>
            <Avatar src={value?.userAvatar?.url} className='rounded-full' size="130" />
            <h1 className={`${theme == "light" ? "text-[#1E293B]" : "text-white"} text-sm font-bold`}>{value?.name}</h1>
            <p className={`${theme == "light" ? "text-[#1E293B]" : "text-white"} text-xs`}>Author</p>
        </div>


    )
}

export default AuthorCard
