import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log("Logged in: ", user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

      displayError(exception.response.data.error)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    try {
      const result = await blogService.create({title, author, url})
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setAuthor('')
      setTitle('')
      setUrl('')
      displayNotification(`a new blog ${title} by ${author} added`)
    } catch(error) {
      displayError(error.response.data.error)
    }
    
  }

  const displayError = (message) => {
    setNotification(message)
    setNotificationType('error')
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 4000)
  }

  const displayNotification = (message) => {
    setNotification(message)
    setNotificationType('notification')
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 4000)
  }

  return (
    <div>
      <Notification message={notification} notificationClass={notificationType}/>
      {user === null && 
        <div>
          <h2>Log in</h2>
          <LoginForm handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}/>
        </div>
      }
      {user !== null &&
      <div>
        <h2>blogs</h2>
      <p> {user.username} logged in <button onClick={logout}>log out</button></p>
      <h2>create new</h2>
      <BlogForm addBlog={addBlog} title={title} author={author} url={url}
        setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }    
    </div>
  )
}



export default App
