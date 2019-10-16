import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    likes: 7
  }

  const mockHandler = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('renders title, authors and likes', () => {
    const div = component.container.querySelector('.simpleBlog')
    expect(div).toHaveTextContent('React Patterns')
    expect(div).toHaveTextContent('Michael Chan')
    expect(div).toHaveTextContent('7')
  })

  test('calls handler twice when the like button is pressed twice', () => {

    const button = component.container.querySelector('.like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
