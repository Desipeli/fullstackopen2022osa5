import { useState } from 'react'



const BlogForm = ({ sendBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    if (await sendBlog({ title, author, url })) {
      setAuthor('')
      setTitle('')
      setUrl('')
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