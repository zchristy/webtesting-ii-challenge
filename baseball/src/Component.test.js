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

    it('shows after 3 strikes the value of outs is incremented by 1', () => {
      const { getByTestId } = render(<Dashboard count={{ strike: 0 }} inning={{ outs: 0}}/>)

      const button = getByTestId('strikeBtn')

      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(button)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
    })

    it('shows after (3 strike outs) 3 outs the value of innings number is incremented by 1', () => {
      const { getByTestId } = render(<Dashboard
        count={{ strike: 0, ball: 1, foul: 1 }}
        inning={{ outs: 0, number: 1, hit: 1}}
        />)

      const button = getByTestId('strikeBtn')

      // First out
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(button)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)

      // Second out
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
      fireEvent.click(button)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)

      // third out - inning increments - outs, inning hits, and count reset
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)
      fireEvent.click(button)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)
      fireEvent.click(button)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('inningCount').textContent, 10)).toBe(2)
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

  describe('Foul button', () => {
    it('changes the foul, and strike value by 1', () => {
      const { getByTestId } = render(<Dashboard count={{ strike: 0, foul: 0 }}/>)

      const button = getByTestId('foulBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
    })
  })

  describe('Hit button', () => {
    it('changes the hit value by 1', () => {
      const { getByTestId } = render(<Dashboard count={{ hit: 0 }}/>)

      const button = getByTestId('hitBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(1)
    })
  })

  describe('Error button', () => {
    it('changes the inning errors value by 1', () => {
      const { getByTestId } = render(<Dashboard inning={{ errors: 0 }}/>)

      const button = getByTestId('errorBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('errorsCount').textContent, 10)).toBe(1)
    })

    it('changes the game errors total value by 1', () => {
      const { getByTestId } = render(<Dashboard game={{ errosTotal: 0 }}/>)

      const button = getByTestId('errorBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('errorTotal').textContent, 10)).toBe(1)
    })
  })

  describe('Reset Batter Count button', () => {
    it('Sets the strikes, balls, and fouls to 0', () => {
      const { getByTestId } = render(<Dashboard count={{ strike: 2, ball: 2, foul: 2 }}/>)

      const button = getByTestId('resetBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)
    })
  })

})
