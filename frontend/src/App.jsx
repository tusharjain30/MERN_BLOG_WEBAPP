import React, { useContext, useEffect } from 'react'
import Home from './pages/Home'
import Blogs from './pages/Blogs';
import Auth from "./components/auth/Auth";
import Authors from './pages/Authors';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SingleBlog from './pages/SingleBlog';
import Dashboard from './pages/Dashboard';
import { Context } from './main';
import AllBlogs from './pages/AllBlogs';
import MyProfile from './pages/MyProfile';
import Chart from './pages/Chart';
import CreateBlog from './pages/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';
import UpdateBlog from './pages/UpdateBlog';

const App = () => {

  const { theme, isAuthenticated, setIsAuthenticated, refresh, setRefresh, setUser, allBlogs, setAllBlogs, authors, setAuthors } = useContext(Context)

  useEffect(() => {
    const isUserAuthenticated = async () => {
      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.get("http://localhost:1000/api/v1/user/getUserDetails", {
          withCredentials: true
        })

        if (data.success) {
          setUser(data.user)
          setIsAuthenticated(true)
        }

      } catch (err) {
        setUser({})
        setIsAuthenticated(false)
      }
    }

    isUserAuthenticated()

  }, [isAuthenticated])


  useEffect(() => {
    const getAllBlogs = async () => {

      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.get("http://localhost:1000/api/v1/blog/getAllBlogs", {
          withCredentials: true
        })

        if (data.success) {
          setAllBlogs(data.allBlogs)
        }

      } catch (err) {
        console.log(err.response.data.message)
      }

    }

    getAllBlogs()
  }, [refresh])

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
    <div className={`bg-[#F7F7F8] h-screen roboto-light ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/singleBlog/:id" element={<SingleBlog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/updateBlog/:id" element={<UpdateBlog />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} position="bottom-right" />
      </Router>
    </div>
  )
}

export default App
