import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Blog from "../models/blogSchema.js";
import cloudinary from "cloudinary";

const postBlog = catchAsyncError(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length == 0) {
        return next(new ErrorHandler("Blog main image is required!", 400))
    }

    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;

    if (!mainImage) {
        return next(new ErrorHandler("Blog main image is required!", 400))
    }

    const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

    if (!allowedFormats.includes(mainImage.mimetype) ||
        (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype))
        || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype))
        || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))) {
        return next(new ErrorHandler("Invalid file type, please provide file type only PNG, JPG, and WEBP", 400))
    }

    const { title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        category,
        published
    } = req.body;

    const authorName = req.user.name
    const authorAvatar = req.user.userAvatar.url
    const createdBy = req.user._id

    if (!title || !intro || !category) {
        return next(new ErrorHandler("Title, Intro and Category are required!", 400))
    }

    const uploadImages = [
        cloudinary.uploader.upload(mainImage.tempFilePath),
        paraOneImage
            ? cloudinary.uploader.upload(paraOneImage.tempFilePath)
            : Promise.resolve(null),
        paraTwoImage
            ? cloudinary.uploader.upload(paraTwoImage.tempFilePath)
            : Promise.resolve(null),
        paraThreeImage
            ? cloudinary.uploader.upload(paraThreeImage.tempFilePath)
            : Promise.resolve(null),
    ]

    const [mainImageRes, paraOneImgRes, paraTwoImgRes, paraThreeImgRes] = await Promise.all(uploadImages);

    if (!mainImageRes || mainImageRes.error
        || (paraOneImage && (!paraOneImgRes || paraOneImgRes.error))
        || (paraTwoImage && (!paraTwoImgRes || paraTwoImgRes.error))
        || (paraThreeImage && (!paraThreeImgRes || paraThreeImgRes.error))) {
        return next(new ErrorHandler("Cloudinary Error while uploading one or more images!!", 400))
    }


    const blogObject = {
        title,
        intro,
        category,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        published,
        authorName,
        authorAvatar,
        createdBy,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url
        },
    }

    if (paraOneImgRes) {
        blogObject.paraOneImage = {
            public_id: paraOneImgRes.public_id,
            url: paraOneImgRes.secure_url
        }
    }

    if (paraTwoImgRes) {
        blogObject.paraTwoImage = {
            public_id: paraTwoImgRes.public_id,
            url: paraTwoImgRes.secure_url
        }
    }

    if (paraThreeImgRes) {
        blogObject.paraThreeImage = {
            public_id: paraThreeImgRes.public_id,
            url: paraThreeImgRes.secure_url
        }
    }

    const blog = await Blog.create(blogObject)

    return res.status(201).json({
        success: true,
        message: "Blog Created!",
        blog
    })
})

const deleteBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found", 400));
    }

    if (blog && blog.mainImage) {
        const publicId = blog.mainImage.public_id;
        await cloudinary.uploader.destroy(publicId)
    }

    if (blog && blog.paraOneImage && blog.paraOneImage.public_id) {
        const publicId = blog.paraOneImage.public_id;
        await cloudinary.uploader.destroy(publicId)
    }

    if (blog && blog.paraTwoImage && blog.paraTwoImage.public_id) {
        const publicId = blog.paraTwoImage.public_id;
        await cloudinary.uploader.destroy(publicId)
    }

    if (blog && blog.paraThreeImage && blog.paraThreeImage.public_id) {
        const publicId = blog.paraThreeImage.public_id;
        await cloudinary.uploader.destroy(publicId)
    }

    await blog.deleteOne(blog)
    return res.status(200).json({ success: true, message: "Blog Deleted!" })
})

const updateBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id)
    if (!blog) {
        return next(new ErrorHandler("Blog not found", 400));
    }

    const updatedBlogData = {
        title: req.body.title,
        intro: req.body.intro,
        category: req.body.category,
        paraOneDescription: req.body.paraOneDescription,
        paraOneTitle: req.body.paraOneTitle,
        paraTwoDescription: req.body.paraTwoDescription,
        paraTwoTitle: req.body.paraTwoTitle,
        paraThreeDescription: req.body.paraThreeDescription,
        paraThreeTitle: req.body.paraThreeTitle,
        published: req.body.published,
    }

    if (req.files) {
        let { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;

        const allowedFormats = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg']
        if (
            (mainImage && !allowedFormats.includes(mainImage.mimetype))
            || (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype))
            || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype))
            || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
        ) {
            return next(new ErrorHandler("Invalid mainImage file type, please provide file type only PNG, JPG, and WEBP", 400))
        }

        if (req.files && mainImage) {
            const publicId = blog.mainImage.public_id
            await cloudinary.uploader.destroy(publicId)
            const updatedMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath)
            updatedBlogData.mainImage = {
                public_id: updatedMainImage.public_id,
                url: updatedMainImage.secure_url
            }
        }

        if (req.files && paraOneImage) {
            if (blog.paraOneImage && blog.paraOneImage.public_id) {
                const publicId = blog.paraOneImage.public_id
                await cloudinary.uploader.destroy(publicId)
            }
            const updatedParaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath)
            updatedBlogData.paraOneImage = {
                public_id: updatedParaOneImage.public_id,
                url: updatedParaOneImage.secure_url
            }
        }

        if (req.files && paraTwoImage) {
            if (blog.paraTwoImage && blog.paraTwoImage.public_id) {
                const publicId = blog.paraTwoImage.public_id
                await cloudinary.uploader.destroy(publicId)
            }
            const updatedParaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath)
            updatedBlogData.paraTwoImage = {
                public_id: updatedParaTwoImage.public_id,
                url: updatedParaTwoImage.secure_url
            }
        }

        if (req.files && paraThreeImage) {
            if (blog.paraThreeImage && blog.paraThreeImage.public_id) {
                const publicId = blog.paraThreeImage.public_id
                await cloudinary.uploader.destroy(publicId)
            }

            const updatedParaThreeImage = await cloudinary.uploader.upload(paraThreeImage.tempFilePath)
            updatedBlogData.paraThreeImage = {
                public_id: updatedParaThreeImage.public_id,
                url: updatedParaThreeImage.secure_url
            }
        }
    }

    const updatedData = await Blog.findByIdAndUpdate(id, updatedBlogData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true,
        message: "Blog Updated!",
        updatedData
    })

})

const getAllBlogs = catchAsyncError(async(req, res, next) => {
    let allBlogs = await Blog.find({published: true});
    return res.status(200).json({
        success: true,
        allBlogs
    })
})

const getSelfBlogs = catchAsyncError(async(req, res, next) => {
    const userId = req.user._id
    const blogs = await Blog.find({createdBy : userId})
    return res.status(200).json({
        success: true,
        blogs
    })
})

const getSingleBlog = catchAsyncError(async(req, res, next) => {
    const {id} = req.params
    const blog = await Blog.findById(id)
    if(!blog){
        return next(new ErrorHandler("Blog not found", 404))
    }

    return res.status(200).json({
        success: true,
        blog
    })
})

export { postBlog, deleteBlog, updateBlog, getAllBlogs, getSelfBlogs, getSingleBlog }