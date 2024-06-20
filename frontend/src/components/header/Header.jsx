import React, { useContext, useEffect, useState } from 'react'
import Avatar from "react-avatar"
import Popular from "./Popular";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Context } from '../../main';
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';


const Header = () => {

    const { theme, allBlogs, authors } = useContext(Context)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };


    return (
        <>

            {/* First Four Cards */}
            {
                allBlogs && allBlogs.length > 0 ?
                    (<div className={`flex flex-col md:flex-row flex-wrap justify-between pl-4 pr-4 pt-[4rem] md:pt-[10rem] pb-4 md:pl-[4rem] md:pr-[4rem] gap-4 md:gap-4 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                        <Link to={`/singleBlog/${allBlogs[0]._id}`} className="relative w-[100%] md:w-[45%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[0].mainImage.url})`, backgroundSize: "cover" }}><div>
                            <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[0].category}</h1>
                                <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[0].title}</h1>
                                <div className='flex gap-2 items-center'>
                                    <Avatar src={allBlogs[0].authorAvatar} className='rounded-full' size="30" />
                                    <h1 className='capitalize text-white text-sm'>{allBlogs[0].authorName}</h1>
                                </div>
                                <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[0].createdAt.slice(0, 10)}</p>
                            </div>
                        </div></Link>
                        {allBlogs[1] && <Link to={`/singleBlog/${allBlogs[1]._id}`} className="relative w-[100%] md:w-[45%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[1].mainImage.url})`, backgroundSize: "cover" }}><div>
                            <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[1].category}</h1>
                                <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[1].title}</h1>
                                <div className='flex gap-2 items-center'>
                                    <Avatar src={allBlogs[1].authorAvatar} className='rounded-full' size="30" />
                                    <h1 className='capitalize text-white text-sm'>{allBlogs[1].authorName}</h1>
                                </div>
                                <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[1].createdAt.slice(0, 10)}</p>
                            </div>
                        </div></Link>}
                        {allBlogs[2] && <Link to={`/singleBlog/${allBlogs[2]._id}`} className="relative w-[100%] md:w-[45%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[2].mainImage.url})`, backgroundSize: "cover" }}><div>
                            <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[2].category}</h1>
                                <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[2].title}</h1>
                                <div className='flex gap-2 items-center'>
                                    <Avatar src={allBlogs[2].authorAvatar} className='rounded-full' size="30" />
                                    <h1 className='capitalize text-white text-sm'>{allBlogs[2].authorName}</h1>
                                </div>
                                <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[2].createdAt.slice(0, 10)}</p>
                            </div>
                        </div></Link>}
                        {allBlogs[3] && <Link to={`/singleBlog/${allBlogs[3]._id}`} className="relative w-[100%] md:w-[45%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[3].mainImage.url})`, backgroundSize: "cover" }}><div>
                            <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[3].category}</h1>
                                <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[3].title}</h1>
                                <div className='flex gap-2 items-center'>
                                    <Avatar src={allBlogs[3].authorAvatar} className='rounded-full' size="30" />
                                    <h1 className='capitalize text-white text-sm'>{allBlogs[3].authorName}</h1>
                                </div>
                                <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[3].createdAt.slice(0, 10)}</p>
                            </div>
                        </div></Link>}
                    </div>)
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


            {/* Trending */}
            <div className={`pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem] gap-4 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                <h1 className={`uppercase text-xl font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Trending</h1>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                >
                    <div className='p-2'>
                        {
                            allBlogs.length > 0
                                ?
                                allBlogs[0] && <Link to={`/singleBlog/${allBlogs[0]._id}`} ><div className="relative w-[100%] md:w-[100%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[0].mainImage.url})`, backgroundSize: "cover" }}>
                                    <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                        <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[0].category}</h1>
                                        <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[0].title}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar src={allBlogs[0].authorAvatar} className='rounded-full' size="30" />
                                            <h1 className='capitalize text-white text-sm'>{allBlogs[0].authorName}</h1>
                                        </div>
                                        <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[0].createdAt.slice(0, 10)}</p>
                                    </div>
                                </div></Link>
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
                    <div className='p-2'>
                        {
                            allBlogs.length > 0
                                ?
                                allBlogs[1] && (<Link to={`/singleBlog/${allBlogs[1]._id}`} ><div className="relative w-[100%] md:w-[100%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[1].mainImage.url})`, backgroundSize: "cover" }}>
                                    <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                        <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[1].category}</h1>
                                        <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[1].title}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar src={allBlogs[1].authorAvatar} className='rounded-full' size="30" />
                                            <h1 className='capitalize text-white text-sm'>{allBlogs[1].authorName}</h1>
                                        </div>
                                        <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[1].createdAt.slice(0, 10)}</p>
                                    </div>
                                </div></Link>)
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
                    <div className='p-2'>
                        {
                            allBlogs.length > 0
                                ?
                                allBlogs[2] && (<Link to={`/singleBlog/${allBlogs[2]._id}`} ><div className="relative w-[100%] md:w-[100%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[2].mainImage.url})`, backgroundSize: "cover" }}>
                                    <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                        <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[2].category}</h1>
                                        <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[2].title}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar src={allBlogs[2].authorAvatar} className='rounded-full' size="30" />
                                            <h1 className='capitalize text-white text-sm'>{allBlogs[2].authorName}</h1>
                                        </div>
                                        <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[2].createdAt.slice(0, 10)}</p>
                                    </div>
                                </div></Link>)
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
                    <div className='p-2'>
                        {
                            allBlogs.length > 0
                                ?
                                allBlogs[3] && (<Link to={`/singleBlog/${allBlogs[3]._id}`} ><div className="relative w-[100%] md:w-[100%] h-[350px] cursor-pointer card" style={{ backgroundImage: `linear-gradient(rgba(30, 29, 29, 0.5),rgba(46, 44, 44, 0.5)), url(${allBlogs[3].mainImage.url})`, backgroundSize: "cover" }}>
                                    <div className='absolute bottom-0 p-4 flex flex-col gap-4 items-start'>
                                        <h1 className='capitalize text-white bg-slate-700 w-fit pl-2 pr-2 pt-1 pb-1 text-xs'>{allBlogs[3].category}</h1>
                                        <h1 className='text-white text-md md:text-xl font-semibold capitalize'>{allBlogs[3].title}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar src={allBlogs[3].authorAvatar} className='rounded-full' size="30" />
                                            <h1 className='capitalize text-white text-sm'>{allBlogs[3].authorName}</h1>
                                        </div>
                                        <p className={`text-xs ${theme == 'light' ? "text-slate-900" : "text-white"}`}>{allBlogs[3].createdAt.slice(0, 10)}</p>
                                    </div>
                                </div></Link>)
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

                </Carousel>
            </div>


            {/* Popular */}
            <div className={`pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem] gap-4 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                <h1 className={`uppercase text-xl font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Popular</h1>
                <div className='flex flex-col md:flex-row flex-wrap items-center justify-between pt-4 pb-4 gap-4'>
                    {
                        allBlogs.length > 0 ?
                            (allBlogs.map((curVal) => {
                                return <Popular value={curVal} key={curVal._id} />
                            })) :
                            ((<div className={`flex flex-col md:flex-row flex-wrap justify-between pl-4 pr-4 pt-[4rem] md:pt-[10rem] pb-4 md:pl-[4rem] md:pr-[4rem] gap-4 md:gap-4 ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                                <BallTriangle
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="green"
                                    ariaLabel="loading"
                                    wrapperStyle
                                    wrapperClass
                                />
                            </div>))
                    }
                </div>
            </div>

            {/* Popular Authors */}
            <div className={`pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
                <h1 className={`uppercase text-xl font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Popular Authors</h1>
                <div className='flex flex-col md:flex-row flex-wrap justify-between gap-8 pt-8'>
                    {authors && <div className='flex flex-col items-center gap-2'>
                        <Avatar src={authors[0]?.userAvatar?.url} className='rounded-full' size="130" />
                        <h1 className={`text-[#1E293B] text-sm font-bold ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>{authors[0]?.name}</h1>
                        <p className={`text-[#1E293B] text-xs ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>Author</p>
                    </div>}
                    {authors[1] && <div className='flex flex-col items-center gap-2'>
                        <Avatar src={authors[1]?.userAvatar?.url} className='rounded-full' size="130" />
                        <h1 className={`text-[#1E293B] text-sm font-bold ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>{authors[1]?.name}</h1>
                        <p className={`text-[#1E293B] text-xs ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>Author</p>
                    </div>}
                    {authors[2] && <div className='flex flex-col items-center gap-2'>
                        <Avatar src={authors[2]?.userAvatar?.url} className='rounded-full' size="130" />
                        <h1 className={`text-[#1E293B] text-sm font-bold ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>{authors[2]?.name}</h1>
                        <p className={`text-[#1E293B] text-xs ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>Author</p>
                    </div>}
                    {authors[3] && <div className='flex flex-col items-center gap-2'>
                        <Avatar src={authors[3]?.userAvatar?.url} className='rounded-full' size="130" />
                        <h1 className={`text-[#1E293B] text-sm font-bold ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>{authors[3]?.name}</h1>
                        <p className={`text-[#1E293B] text-xs ${theme == "light" ? "text-[#1E293B]" : "text-white"}`}>Author</p>
                    </div>}
                </div>
            </div>

        </>
    )
}

export default Header
