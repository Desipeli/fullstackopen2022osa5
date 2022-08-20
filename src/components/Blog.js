import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog }) => {

  const [showFullInfo, setShowFullInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const clickHandler = () => {
    setShowFullInfo(!showFullInfo)
  }

  const likeHandler = async () => {
    const modifiedBlog = {...blog, likes: likes}
    try {
      const sendLike = await blogService.like({ modifiedBlog })
      setLikes(sendLike.likes)
    } catch(exception) {
      console.log(exception.response.data.error)
    }
  }

  return(
    <div className={'blog'} >
      <div className={'blog-first-row'} onClick={() => clickHandler()}>
        {blog.title} {blog.author}
      </div>
      {showFullInfo &&
        <>
        <br></br>
          {blog.url}<br></br>
          {likes} <button onClick={() => likeHandler()}>like</button><br></br>
          {blog.user.username}<br></br>
        </>
      }
    </div>  
  )
}

export default Blog