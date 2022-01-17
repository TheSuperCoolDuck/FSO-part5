import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const buttonLabel = viewDetails ? 'hide' : 'view'

  const handleDetailClick = () => {
    setViewDetails(!viewDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} By {blog.author} <button onClick={handleDetailClick}>{buttonLabel}</button>
      </div>

      {viewDetails ?
        <>
          <div>
            {blog.url}
          </div>
          <div>
          likes {blog.likes} <button id='like-button' onClick={likeBlog}>like</button>
          </div>
          <button id="delete-button" onClick={deleteBlog}>
          remove
          </button>
        </> :
        <></>}

    </div>
  )
}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog