import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup } from '@testing-library/react'

import Dashboard from './components/Dashboard';
import Display from './components/Display';

afterEach(cleanup)

describe('<Dashboard />', () => {

  it('renders without errors', () => {
    const queries = render(<Dashboard />)
  })

  describe('Strike button', () => {
    it('changes the strike value by 1', () => {
      const { getByTestId } = render(<Dashboard count={{ strike: 0 }}/>)

      const button = getByTestId('strikeBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
    })
  })

  describe('Ball button', () => {
    it('changes the ball value by 1', () => {
      const { getByTestId } = render(<Dashboard count={{ ball: 0 }}/>)

      const button = getByTestId('ballBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(1)
    })
  })

})
