import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state ',() => {
  const createBlog = jest.fn()

  const component=render(
    <BlogForm createBlog={createBlog}/>
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle,{
    target: { value: 'testing form' }
  })
  fireEvent.change(inputAuthor,{
    target: { value: 'tester' }
  })
  fireEvent.change(inputUrl,{
    target: { value: 'localhost' }
  })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing form')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('localhost')
})

