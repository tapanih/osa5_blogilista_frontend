import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  test('if no user logged in, blogs are not rendered', async () => {

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelector('.blog')
    expect(blogs).toBe(null)

    expect(component.container).not.toHaveTextContent(
      'React patterns'
    )
    expect(component.container).not.toHaveTextContent(
      'Arthur Author'
    )
  })

  test('if user logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )

    const blogs = component.container.getElementsByClassName('blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Arthur Author'
    )
  })
})