import React, { useContext, useEffect, useState } from 'react'
import AuthorCard from '../components/author card/AuthorCard'
import { Context } from '../main'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Authors = () => {

  const { theme } = useContext(Context)
  const [authors, setAuthors] = useState([])

  useEffect(() => {

    const getAllAuthors = async () => {
      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.get("http://localhost:1000/api/v1/user/getAllAuthors", {
          withCredentials: true
        })

        if (data.success) {
          setAuthors(data.authors)
        }

      } catch (err) {
        console.log(err)
      }
    }

    getAllAuthors()

  }, [])

  return (
    <>
      <Navbar />
      <div className={`pl-4 pr-4 pt-[4rem] md:pt-[10rem] pb-4 md:pl-[4rem] md:pr-[4rem] ${theme == 'light' ? "bg-[#F7F7F8] " : "bg-[#171A29]"} `}>
        <div className='flex flex-col md:flex-row flex-wrap justify-between gap-8 pt-8'>
          {
            authors.length > 0
              ?
              (
                authors.map((curVal) => {
                  return <AuthorCard key={curVal._id} value={curVal} />
                })
              )
              :

              (<BallTriangle
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
              )
          }

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Authors
