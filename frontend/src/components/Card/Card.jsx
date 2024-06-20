import React, { useContext } from 'react'
import Avatar from 'react-avatar'
import { Context } from '../../main'
import { Link } from 'react-router-dom'

const Card = ({ value }) => {

    const { theme } = useContext(Context)

    return (
        <Link to={`/singleBlog/${value._id}`} >
            <div className="book cursor-pointer">
                <div className='p-4 flex flex-col gap-4 justify-center items-center bg-black h-[100%]'>
                    <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{value.category}</h1>
                    <h1 className='text-white text-md md:text-md text-center font-semibold capitalize'>{value.title}</h1>
                    <div className='flex gap-2 items-center'>
                        <Avatar src={value.authorAvatar} className='rounded-full' size="30" />
                        <h1 className='capitalize text-white text-sm'>{value.authorName}</h1>
                    </div>
                    <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{value.createdAt.slice(0, 10)}</p>
                </div>
                <div className="cover">
                    <img src={value.mainImage.url} className='h-full w-full' />
                </div>
            </div>
        </Link>
    )
}

export default Card
