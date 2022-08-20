
const BlogForm = ({addBlog, title, setTitle, author, setAuthor, url, setUrl}) => (
  <form onSubmit={addBlog}>
    title
    <input
      value={title}
      onChange={({target}) => setTitle(target.value)}
    /><br></br>
    author
    <input
      value={author}
      onChange={({target}) => setAuthor(target.value)}
    /><br></br>
    url
    <input
      value={url}
      onChange={({target}) => setUrl(target.value)}
    /><br></br>
    <button type="submit">create</button>
  </form>  
)

export default BlogForm