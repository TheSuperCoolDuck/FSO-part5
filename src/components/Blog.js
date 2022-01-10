import React, {useState} from 'react'

const Blog = ({blog, likeBlog, deleteBlog}) => {
  const [viewDetails, setViewDetails] = useState(false)

  const buttonLabel = viewDetails ? 'hide' : 'view'

  const handleDetailClick = (event) =>{
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
        {blog.title} <button onClick={handleDetailClick}>{buttonLabel}</button>
      </div> 

      {viewDetails ?
      <>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button onClick={deleteBlog}>
          remove
        </button>
      </> : 
      <></>}
      
    </div>
  )
}

export default Blog