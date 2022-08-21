import { useState } from 'react'
import blogService from '../services/blogs'



const BlogForm = ({ displayError, displayNotification, user, setBlogs, blogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    try {
      const result = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(result))
      setAuthor('')
      setTitle('')
      setUrl('')
      displayNotification(`a new blog ${title} by ${author} added`)
    } catch (error) {
      displayError(error.response.data.error)
    }
  }

  return (
    <form onSubmit={addBlog}>
    title
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /><br></br>
    author
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      /><br></br>
    url
      <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      /><br></br>
      <button onClick={addBlog} type="submit">create</button>
    </form>
  )
}

export default BlogForm