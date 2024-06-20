import React, { useContext } from 'react'
import { Context } from '../main'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
} from "chart.js"

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
)

const Chart = () => {

  const { selfBlog, theme } = useContext(Context)

  const publishedBlogs = selfBlog && selfBlog.filter((blog) => blog.published == true)
  const notPublishedBlogs = selfBlog && selfBlog.filter((blog) => blog.published == false)

  const data = {
    labels: ["Published", "Not Published"],
    datasets: [
      {
        label: "Blogs",
        data: [
          publishedBlogs.length > 0 ? publishedBlogs.length : 0,
          notPublishedBlogs.length > 0 ? notPublishedBlogs.length : 0
        ],
        borderColor: ["#0e7490", "#facc15"],
        backgroundColor: ["#0e7490", "#facc15"],
        borderWidth: 1,
      }
    ]
  }

  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <div>
        <h3 className={`${theme == "light" ? "text-black" : "text-white"} pb-4`}>BLOG ANALYTICS</h3>
        <Doughnut data={data} className='w-[350px]' />
      </div>
    </div>
  )
}

export default Chart
