import React, { createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext();

const AppWrapper = () => {

  const getTheme = () => {
    const res = localStorage.getItem('theme')
    if (res == null || res == undefined) {
      localStorage.setItem('theme', 'light');
    }
    return res;
  }

  const [theme, setTheme] = useState(getTheme())
  const [component, setComponent] = useState("All Blogs")
  const [showDashNav, setShowDashNav] = useState(false)
  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [allBlogs, setAllBlogs] = useState([])
  const [authors, setAuthors] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [selfBlog, setSelfBlog] = useState([])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])


  return (
    <Context.Provider value={{ theme, setTheme, refresh, setRefresh, component, selfBlog, setSelfBlog, setComponent, showDashNav, setShowDashNav, isAuthenticated, setIsAuthenticated, user, setUser, allBlogs, setAllBlogs, authors, setAuthors }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
