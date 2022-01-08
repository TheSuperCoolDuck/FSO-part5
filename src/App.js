import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message})=>{
  const notificationStyle={
    background: 'lightgray',
    fontSize:20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10
  }

  if(message===null){
    return null
  }

  return(
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
 
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async(event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection){
      displayNotification('wrong username or password')
    }
  }

  const handleBlogTitleChange=(event)=>{
    setTitle(event.target.value)
  }

  const handleBlogAuthorChange=(event)=>{
    setAuthor(event.target.value)
  }

  const handleBlogUrlChange=(event)=>{
    setUrl(event.target.value)
  }

  const addBlog = (event) =>{
    event.preventDefault()
    const blogObject = {
      id: blogs.length+1,
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    displayNotification(`a new blog ${title} by ${author} added`)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (message)=>{
    setMessage(message)

    setTimeout(()=>{
      setMessage(null)
    },2000)
  }

  const loginForm= () =>(
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({target})=>setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
      type="text"
      value={password}
      name="Password"
      onChange={({target})=>setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const blogForm = () =>(
    <form onSubmit={addBlog}>
      <div>title
        <input
        value = {title}
        onChange={handleBlogTitleChange}
        />
      </div>
      <div>author
        <input
        value = {author}
        onChange={handleBlogAuthorChange}
        />
      </div>
      <div>url
        <input
        value = {url}
        onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <Notification message={message}/>
      {user===null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App