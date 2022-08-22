import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('show initially only title and author', () => {
  const blog = {
    title: 'otsikko',
    author: 'tekijä',
    url: 'osoite',
    likes: '2',
    user: 'moi'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog-first-row')
  expect(div).toHaveTextContent('otsikko')
  expect(div).toHaveTextContent('tekijä')

  const div2 = container.querySelector('.blog-other-rows')
  expect(div2).toBeNull()
})