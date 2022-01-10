import React, {useState} from 'react'
const Blog = ({blog}) => {
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
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </> : 
      <></>}
      
    </div>
  )
}

export default Blog