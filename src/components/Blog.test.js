import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from './Blog'

test('renders correct content', ()=>{
  const blog = {
    title: 'Component testing',
    author: 'John Doe',
    url: 'localhost/',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} likeBlog={()=>null} deleteBlog={()=>null}/>
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )

  expect(component.container).toHaveTextContent(
    blog.author
  )

  expect(component.container).not.toHaveTextContent(
    blog.url
  )

  expect(component.container).not.toHaveTextContent(
    `likes ${blog.likes}`
  )
})