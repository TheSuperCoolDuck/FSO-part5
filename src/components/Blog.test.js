import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders correct content', () => {
  const blog = {
    title: 'Component testing',
    author: 'John Doe',
    url: 'localhost/',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} likeBlog={() => null} deleteBlog={() => null}/>
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

test('displays url and likes when button is pressed',() => {
  const blog = {
    title: 'Component testing',
    author: 'John Doe',
    url: 'localhost/',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} likeBlog={() => null} deleteBlog={() => null}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    blog.url
  )

  expect(component.container).toHaveTextContent(
    `likes ${blog.likes}`
  )
})