import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, authors and likes', () => {
  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    likes: 7
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('click')} />
  )

  expect(component.container).toHaveTextContent(
    'React Patterns'
  )
  expect(component.container).toHaveTextContent(
    'Michael Chan'
  )
  expect(component.container).toHaveTextContent(
    '7'
  )
})

test('calls handler twice when the like button is pressed twice', () => {
  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    likes: 7
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})