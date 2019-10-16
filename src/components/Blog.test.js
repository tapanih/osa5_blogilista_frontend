import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    id: '12345'
  }

  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'http://www.reactpatterns.com',
    user,
    likes: 7
  }

  let component

  beforeEach(() => {
    const mockFn = jest.fn()

    component = render(
      <Blog blog={blog} updateLikes={mockFn} removeBlog={mockFn} user={user} />
    )
  })

  test('initially show only the title and the author', () => {
    const blogDiv = component.container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('React Patterns')
    expect(blogDiv).toHaveTextContent('Michael Chan')
    const toggleDiv = component.container.querySelector('.togglableContent')
    expect(toggleDiv).not.toHaveTextContent('React Patterns')
    expect(toggleDiv).not.toHaveTextContent('Michael Chan')

    expect(toggleDiv).toHaveStyle('display: none')

    expect(toggleDiv).toHaveTextContent('http://www.reactpatterns.com')
    expect(toggleDiv).toHaveTextContent('7')
    expect(toggleDiv).toHaveTextContent('Matti Luukkainen')
  })

  test('after clicking the div, children are displayed', () => {
    const clickableDiv = component.container.querySelector('.blog')
    fireEvent.click(clickableDiv)

    const toggleDiv = component.container.querySelector('.togglableContent')
    expect(toggleDiv).not.toHaveStyle('display: none')
  })
})

