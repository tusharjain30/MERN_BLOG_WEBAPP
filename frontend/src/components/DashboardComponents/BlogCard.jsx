import React, { useContext } from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogCard = ({ value }) => {

    const { theme, setSelfBlog, setAllBlogs } = useContext(Context)
    const navigateTo = useNavigate()

    const deleteBlog = async (id) => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.delete(`http://localhost:1000/api/v1/blog/deleteBlog/${id}`, {
                withCredentials: true
            })

            if (data.success) {
                setAllBlogs((prev) => prev.filter((blogs) => {
                    return blogs._id !== id
                }))

                setSelfBlog((prev) => prev.filter(((blogs) => {
                    return blogs._id !== id
                })))

                navigateTo('/dashboard')
                toast.success(data.message)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={`w-[100%] md:w-[30%] h-auto mt-8 mb-8 ml-2 mr-2 bg-[#000A30] border p-2 shadow-lg`}>
            <img className='w-full' src={value?.mainImage?.url} />
            <h1 className={`text-white bg-slate-900 w-fit mt-4 pl-2 pr-2 pt-1 pb-1 text-xs uppercase border`}>{value?.category}</h1>
            <h1 className={`text-white text-sm pt-2 capitalize font-semibold`}>{value?.title}</h1>
            <p className={`text-xs pt-2 ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{value.createdAt.slice(0, 10)}</p>
            <Link to={`/updateBlog/${value?._id}`}><button className='w-full bg-[#FFCA15] text-white pt-1 pb-1 font-semibold mt-4 capitalize hover:text-black transition-all duration-500 ease-in-out text-sm'>Update</button></Link>
            <button onClick={() => deleteBlog(value?._id)} className='w-full bg-[red] text-white pt-1 pb-1 font-semibold mt-4 capitalize hover:text-black transition-all duration-500 ease-in-out text-sm'>delete</button>
        </div>
    )
}


export default BlogCard;
