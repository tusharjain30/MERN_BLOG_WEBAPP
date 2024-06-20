import React, { useContext } from 'react'
import { Context } from '../../main'

const Footer = () => {

  const { theme } = useContext(Context)

  return (
    <div className={`pt-[4rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
      <hr className='border ${theme == "light" ? "border-black" : "border-white"}  ml-4 mr-4 md:ml-[4rem] md:mr-[4rem]'></hr>
      <div className='flex flex-col md:flex-row flex-wrap justify-center pt-[4rem] pb-[4rem] items-center md:items-start md:justify-between pl-4 pr-4 pt-4 pb-4 md:pl-[4rem] md:pr-[4rem] gap-8'>
        <div className='flex flex-col'>
          <h1 className={`text-sm ${theme == "light" ? "text-text-slate-800" : "text-white"} font-bold capitalize text-center md:text-start`}>About</h1>
          <p className={`${theme == "light" ? "text-[#45485F]" : "text-white"} text-xs capitalize w-[15rem] pt-4 text-center md:text-start text-justify`}>Turpis erat tincidunt et viverra id nunc molestie et faucibus diam, proin lectus aliquam mattis ac nunc elementum accumsan libero.</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className={`text-sm ${theme == "light" ? "text-text-slate-800" : "text-white"} font-bold capitalize text-center md:text-start`}>Company</h1>
          <div className='flex flex-col gap-4'>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>About Us</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>contact us</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>our staff</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>advertise</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className={`text-sm ${theme == "light" ? "text-text-slate-800" : "text-white"} font-bold capitalize text-center md:text-start`}>legal</h1>
          <div className='flex flex-col gap-4'>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>privacy policy</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>Terms of Service</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>extra crunch terms</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>Code of Conduct</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className={`text-sm ${theme == "light" ? "text-text-slate-800" : "text-white"} font-bold capitalize text-center md:text-start`}>follow us</h1>
          <div className='flex flex-col gap-4'>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>facebook</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>youtube</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>twitter</p>
            <p className={`cursor-pointer  text-xs text-center md:text-start ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>instagram</p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className={`flex md:pl-[4rem] pb-[4rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"} justify-between md:pr-[4rem] pl-4 pr-4`}>
        <p className={`text-start text-xs text-[#45485F] ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>Copyright &copy; 2024 Business Blog</p>
        <p className={`text-end text-xs text-[#45485F] ${theme == "light" ? "text-[#45485F]" : "text-white"}`}>Powered by Business Blog</p>
      </div>
    </div>
  )
}

export default Footer
