import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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

  const likeBlog = (id) => {
    const blog = blogs.find(b=>b.id===id)
    const changedBlog = {...blog, likes:blog.likes+1}

    blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog=>{
        setBlogs(blogs.map(blog=>blog.id!==id?blog:returnedBlog))
        })
  }

  const addBlog = (blogObject) =>{
    displayNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
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
    <Togglable buttonLabel='create new blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  blogs.sort((a,b)=>a.likes-b.likes).reverse()

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
            <Blog key={blog.id} blog={blog} likeBlog={()=>likeBlog(blog.id)} />
          )}
        </div>
      }
    </div>
  )
}

export default App