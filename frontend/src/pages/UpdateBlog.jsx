import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBlog = () => {

  const navigateTo = useNavigate()
  const mainImageRef = useRef()
  const paraOneImageRef = useRef()
  const paraTwoImageRef = useRef()
  const paraThreeImageRef = useRef()
  const [category, setCategory] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [mainImage, setMainImage] = useState("")
  const [mainImagePreview, setMainImagePreview] = useState("")
  const [intro, setIntro] = useState("")
  const [paraOneTitle, setParaOneTitle] = useState("")
  const [paraOneImage, setParaOneImage] = useState("")
  const [paraOneImagePreview, setParaOneImagePreview] = useState("")
  const [paraOneDescription, setParaOneDescription] = useState("")
  const [paraTwoTitle, setParaTwoTitle] = useState("")
  const [paraTwoImage, setParaTwoImage] = useState("")
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("")
  const [paraTwoDescription, setParaTwoDescription] = useState("")
  const [paraThreeTitle, setParaThreeTitle] = useState("")
  const [paraThreeImage, setParaThreeImage] = useState("")
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("")
  const [paraThreeDescription, setParaThreeDescription] = useState("")
  const [published, setPublished] = useState(false)
  const { id } = useParams()

  const mainImageChooseFile = (e) => {
    e.preventDefault()
    mainImageRef.current.click()
  }

  const paraOneImageChooseFile = (e) => {
    e.preventDefault()
    paraOneImageRef.current.click()
  }

  const paraTwoImageChooseFile = (e) => {
    e.preventDefault()
    paraTwoImageRef.current.click()
  }

  const paraThreeChooseFile = (e) => {
    e.preventDefault()
    paraThreeImageRef.current.click()
  }

  const { theme, refresh, setRefresh } = useContext(Context)

  const handleMainImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result)
      setMainImage(file)
    }
  }

  const handleParaOneImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result)
      setParaOneImage(file)
    }
  }

  const handleParaTwoImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result)
      setParaTwoImage(file)
    }
  }

  const handleParaThreeImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result)
      setParaThreeImage(file)
    }
  }

  const formData = new FormData();
  formData.append("category", category)
  formData.append("title", mainTitle)
  formData.append("intro", intro)
  formData.append("mainImage", mainImage)
  formData.append("published", published)

  if (paraOneTitle.length > 0) {
    formData.append("paraOneTitle", paraOneTitle)
  }
  if (paraOneDescription.length > 0) {
    formData.append("paraOneDescription", paraOneDescription)
  }

  if (paraTwoTitle.length > 0) {
    formData.append("paraTwoTitle", paraTwoTitle)
  }
  if (paraTwoDescription.length > 0) {
    formData.append("paraTwoDescription", paraTwoDescription)
  }

  if (paraThreeTitle.length > 0) {
    formData.append("paraThreeTitle", paraThreeTitle)
  }
  if (paraThreeDescription.length > 0) {
    formData.append("paraThreeDescription", paraThreeDescription)
  }

  if (paraOneImage) {
    formData.append("paraOneImage", paraOneImage)
  }

  if (paraTwoImage) {
    formData.append("paraTwoImage", paraTwoImage)
  }

  if (paraThreeImage) {
    formData.append("paraThreeImage", paraThreeImage)
  }

  const updateBlogHandler = async (e) => {
    e.preventDefault()
    try {

      axios.defaults.withCredentials = true
      const { data } = await axios.put(`http://localhost:1000/api/v1/blog/updateBlog/${id}`,
        formData,
        {
          withCredentials: true
        }
      )

      if (data.success) {
        setRefresh(!refresh)
        navigateTo("/dashboard")
        toast.success(data.message)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const categories = [
    {
      id: new Date(Date.now()),
      category: "Fashion"
    },
    {
      id: new Date(Date.now()),
      category: "Beauty"
    },
    {
      id: new Date(Date.now()),
      category: "Travel"
    },
    {
      id: new Date(Date.now()),
      category: "Lifestyle"
    },
    {
      id: new Date(Date.now()),
      category: "Gaming"
    },
    {
      id: new Date(Date.now()),
      category: "Tech"
    },
    {
      id: new Date(Date.now()),
      category: "Health"
    },
    {
      id: new Date(Date.now()),
      category: "Fitness"
    },
    {
      id: new Date(Date.now()),
      category: "Wellness"
    },
    {
      id: new Date(Date.now()),
      category: "Business"
    },
    {
      id: new Date(Date.now()),
      category: "Education"
    },
    {
      id: new Date(Date.now()),
      category: "Food and Recipe "
    },
    {
      id: new Date(Date.now()),
      category: "Love and Relationships"
    },
    {
      id: new Date(Date.now()),
      category: "Alternative topics"
    },
    {
      id: new Date(Date.now()),
      category: "Green living"
    },
    {
      id: new Date(Date.now()),
      category: "Automotive"
    },
    {
      id: new Date(Date.now()),
      category: "Marketing"
    },
    {
      id: new Date(Date.now()),
      category: "Internet services"
    },
    {
      id: new Date(Date.now()),
      category: "Sports"
    },
    {
      id: new Date(Date.now()),
      category: "Finance"
    },
    {
      id: new Date(Date.now()),
      category: "Sports"
    },
    {
      id: new Date(Date.now()),
      category: "Entertainment"
    },
    {
      id: new Date(Date.now()),
      category: "Productivity"
    },
    {
      id: new Date(Date.now()),
      category: "Hobbies"
    },
    {
      id: new Date(Date.now()),
      category: "Parenting"
    },
    {
      id: new Date(Date.now()),
      category: "Pets"
    },
    {
      id: new Date(Date.now()),
      category: "Photography"
    },
    {
      id: new Date(Date.now()),
      category: "Agriculture"
    },
    {
      id: new Date(Date.now()),
      category: "Art"
    },
    {
      id: new Date(Date.now()),
      category: "Science"
    },
    {
      id: new Date(Date.now()),
      category: "History"
    },
    {
      id: new Date(Date.now()),
      category: "Self-improvement"
    },
    {
      id: new Date(Date.now()),
      category: "News and current affairs"
    }
  ]

  useEffect(() => {

    const fetchData = async () => {
      try {

        axios.defaults.withCredentials = true
        const { data } = await axios.get(`http://localhost:1000/api/v1/blog/getSingleBlog/${id}`, {
          withCredentials: true
        })

        setCategory(data?.blog?.category)
        setPublished(data?.blog?.published)
        setMainTitle(data?.blog?.title)
        setIntro(data.blog.intro)
        setMainImagePreview(data?.blog?.mainImage?.url)
        if (data?.blog?.paraOneImage?.url) {
          setParaOneImagePreview(data?.blog?.paraOneImage?.url)
        }
        if (data?.blog?.paraTwoImage?.url) {
          setParaTwoImagePreview(data?.blog?.paraTwoImage?.url)
        }
        if (data?.blog?.paraThreeImage?.url) {
          setParaThreeImagePreview(data?.blog?.paraThreeImage?.url)
        }
        if (data?.blog?.paraOneDescription) {
          setParaOneDescription(data?.blog?.paraOneDescription)
        }
        if (data?.blog?.paraOneTitle) {
          setParaOneTitle(data?.blog?.paraOneTitle)
        }
        if (data?.blog?.paraTwoDescription) {
          setParaTwoDescription(data?.blog?.paraTwoDescription)
        }
        if (data?.blog?.paraTwoTitle) {
          setParaTwoTitle(data?.blog?.paraTwoTitle)
        }
        if (data?.blog?.paraThreeDescription) {
          setParaThreeDescription(data?.blog?.paraThreeDescription)
        }
        if (data?.blog?.paraThreeTitle) {
          setParaThreeTitle(data?.blog?.paraThreeTitle)
        }

      } catch (err) {
        console.log(err)
      }
    }

    fetchData();

  }, [id])


  return (
    <div className={`flex flex-col w-full pl-4 pr-4 pt-[2rem] pb-[2rem] ${theme == "light" ? "bg-[#F7F7F8]" : "bg-[#171A29]"}`}>
      <h1 className={`uppercase font-semibold ${theme == "light" ? "text-black" : "text-white"}`}>update blog</h1>
      <form className='w-full'>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className={`mt-4 w-full border pt-1 pb-1 outline-none ${theme == "light" ? "text-black bg-transparent" : "text-white bg-[#171A29]"}`}>
          <option value="">Select Category</option>
          {
            categories.map((category) => {
              return (
                <option key={category.id} value={category.category}>{category.category}</option>
              )
            })
          }

        </select>
        <input onChange={(e) => setMainTitle(e.target.value)} value={mainTitle} type="text" className={`w-full mt-4 outline-none pt-2 pb-2 bg-transparent border ${theme == "light" ? "text-black" : "text-white"}`} placeholder="BLOG MAIN TITLE" />
        <div className='mt-4'>
          <h1 className={`uppercase ${theme == "light" ? "text-black" : "text-white"}`}>BLog main image</h1>
          <img className='w-[500px] h-[500px]' src={mainImagePreview ? mainImagePreview : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} />
          <button className='bg-[purple] text-white w-full md:w-[500px] pt-1 pb-1 outline-none hover:bg-[#9001BA] transition-all ease-in-out duration-500' onClick={mainImageChooseFile}>Choose File</button>
          <input type="file" onChange={handleMainImage} ref={mainImageRef} className='w-full border-b-2 bg-transparent hidden' />
        </div>
        <textarea onChange={(e) => setIntro(e.target.value)} value={intro} className={`w-full h-[200px] mt-4 outline-none pt-2 pb-2  bg-transparent border ${theme == "light" ? "text-black" : "text-white"}`} placeholder="BLOG Intro"></textarea>
        <input onChange={(e) => setParaOneTitle(e.target.value)} value={paraOneTitle} type="text" className={`w-full mt-4 outline-none pt-2 pb-2  bg-transparent border ${theme == "light" ? "text-black" : "text-white"}`} placeholder="Paragraph One TITLE" />
        <div className='mt-4'>
          <h1 className={`${theme == "light" ? "text-black" : "text-white"} uppercase`}>Paragraph One image</h1>
          <img className='w-[300px] h-[300px]' src={paraOneImagePreview ? paraOneImagePreview : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} />
          <button className='bg-[purple] text-white w-[300px] pt-1 pb-1 outline-none hover:bg-[#9001BA] transition-all ease-in-out duration-500' onClick={paraOneImageChooseFile}>Choose File</button>
          <input type="file" onChange={handleParaOneImage} ref={paraOneImageRef} className='w-full border-b-2 bg-transparent hidden' />
          <textarea onChange={(e) => setParaOneDescription(e.target.value)} value={paraOneDescription} className={`w-full h-[300px] mt-4 outline-none pt-2 pb-2  bg-transparent border ${theme == "light" ? "text-black" : "text-white"}`} placeholder="Blog First Sub Paragraph Comes Here..."></textarea>
          <input onChange={(e) => setParaTwoTitle(e.target.value)} value={paraTwoTitle} type="text" className={`w-full mt-4 outline-none pt-2 pb-2  bg-transparent border ${theme == "light" ? "text-black" : "text-white"}`} placeholder="Paragraph Two TITLE" />
          <img className='w-[300px] h-[300px] mt-4' src={paraTwoImagePreview ? paraTwoImagePreview : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} />
          <button className='bg-[purple] text-white w-[300px] pt-1 pb-1 outline-none hover:bg-[#9001BA] transition-all ease-in-out duration-500' onClick={paraTwoImageChooseFile}>Choose File</button>
          <input type="file" onChange={handleParaTwoImage} ref={paraTwoImageRef} className='w-full border-b-2 bg-transparent hidden' />
          <textarea onChange={(e) => setParaTwoDescription(e.target.value)} value={paraTwoDescription} className={`bg-transparent border ${theme == "light" ? "text-black" : "text-white"} w-full h-[300px] mt-4 outline-none pt-2 pb-2`} placeholder="Blog Second Sub Paragraph Comes Here..."></textarea>
          <input onChange={(e) => setParaThreeTitle(e.target.value)} value={paraThreeTitle} type="text" className={`bg-transparent border ${theme == "light" ? "text-black" : "text-white"} w-full mt-4 outline-none pt-2 pb-2`} placeholder="Paragraph Three TITLE" />
          <img className='w-[300px] h-[300px] mt-4' src={paraThreeImagePreview ? paraThreeImagePreview : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} />
          <button className='bg-[purple] text-white w-[300px] pt-1 pb-1 outline-none hover:bg-[#9001BA] transition-all ease-in-out duration-500' onClick={paraThreeChooseFile}>Choose File</button>
          <input type="file" onChange={handleParaThreeImage} ref={paraThreeImageRef} className='w-full border-b-2 bg-transparent hidden' />
          <textarea onChange={(e) => setParaThreeDescription(e.target.value)} value={paraThreeDescription} className={`bg-transparent border ${theme == "light" ? "text-black" : "text-white"} w-full h-[300px] mt-4 outline-none pt-2 pb-2`} placeholder="Blog Third Sub Paragraph Comes Here..."></textarea>
          <div className='mt-4 flex flex-col gap-2'>
            <label className={`${theme == "light" ? "text-black" : "text-white"}`}>Wants to publish now?</label>
            <select onChange={(e) => setPublished(e.target.value)} value={published} className={` w-full border pt-1 pb-1 outline-none ${theme == "light" ? "text-black bg-transparent" : "text-white bg-[#171A29]"}`}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <button onClick={updateBlogHandler} className='bg-[#6813F7] text-white w-full pt-1 pb-1 outline-none hover:bg-[#2254B6] transition-all ease-in-out duration-500 mt-4 uppercase' >update Blog</button>
      </form>
    </div>
  )
}

export default UpdateBlog

