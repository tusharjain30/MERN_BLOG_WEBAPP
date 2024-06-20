import React, { useContext } from 'react'
import Avatar from 'react-avatar'
import { Context } from '../../main'
import { Link } from 'react-router-dom'

const Popular = ({ value }) => {

    const { theme } = useContext(Context)

    return (
        <Link to={`/singleBlog/${value._id}`} className='md:w-[40%] w-[100%]'>
            <div className={`card flex flex-col md:flex-row gap-8 justify-center items-start items-center ${theme == 'light' ? "text-slate-900 bg-gray-200" : "text-white border"}  w-[100%] p-2`}>
                <div className=" w-[100%] h-[200px] pr-2 cursor-pointer" style={{ backgroundImage: `url(${value.mainImage.url})`, backgroundSize: "cover" }}></div>
                <div className='w-fit flex flex-col gap-2 p-4'>
                    <h1 className={`capitalize ${theme == 'light' ? "text-white bg-slate-700" : "text-black bg-white"}  w-fit pl-2 pr-2 pt-1 pb-1 text-xs`}>{value.category}</h1>
                    <h1 className={`${theme == 'light' ? "text-slate-900" : "text-white"} text-xs md:text-sm font-semibold capitalize`}>{value.title}</h1>
                    <div className='flex gap-2 items-center'>
                        <Avatar src={value.authorAvatar} className='rounded-full' size="30" />
                        <h1 className={`capitalize font-semibold ${theme == 'light' ? "text-slate-900" : "text-white"} text-xs`}>{value.authorName}</h1>
                    </div>
                    <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{value.createdAt.slice(0, 10)}</p>
                </div>
            </div>
        </Link>

    )
}

export default Popular
