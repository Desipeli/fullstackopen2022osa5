import { useState } from "react"

const Blog = ({blog }) => {

  const [showFullInfo, setShowFullInfo] = useState(false)

  const clickHandler = () => {
    setShowFullInfo(!showFullInfo)
  }

  const likeHandler = () => {
    
  }

  return(
    <div className={'blog'} >
      <div className={'blog-first-row'} onClick={clickHandler}>
        {blog.title} {blog.author}
      </div>
      {showFullInfo &&
        <>
        <br></br>
          {blog.url}<br></br>
          {blog.likes} <button onClick={likeHandler}>like</button><br></br>
          {blog.user.username}<br></br>
        </>
      }
    </div>  
  )
}

export default Blog