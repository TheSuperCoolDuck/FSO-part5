import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>title
        <input
          id='title'
          value = {title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>author
        <input
          id='author'
          value = {author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>url
        <input
          id='url'
          value = {url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button id='submit-button' type="submit">create</button>
    </form>
  )
}

export default BlogForm