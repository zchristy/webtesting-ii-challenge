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
      const { getByTestId } = render(<Dashboard />)

      const button = getByTestId('strikeBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
    })

    it('shows after 3 strikes the value of outs is incremented by 1', () => {
      const { getByTestId } = render(<Dashboard />)

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
      const { getByTestId } = render(<Dashboard />)

        const strikeButton = getByTestId('strikeBtn')
        const ballButton = getByTestId('ballBtn')
        const foulButton = getByTestId('foulBtn')
        const hitButton = getByTestId('hitBtn')

        // ball button event
        fireEvent.click(ballButton)
        // foul button event
        fireEvent.click(foulButton)
        // hit button event
        fireEvent.click(hitButton)

      // First out
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(0)
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)

      // Second out
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)

      // third out - inning increments - outs, inning hits, and count reset
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)
      fireEvent.click(strikeButton)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(2)
      fireEvent.click(strikeButton)
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

    it('shows after 4 balls the count is reset', () => {
      const { getByTestId } = render(<Dashboard
        count={{ ball: 0, strike: 1, foul: 1 }}
        />)

      const strikeButton = getByTestId('strikeBtn')
      const ballButton = getByTestId('ballBtn')
      const foulButton = getByTestId('foulBtn')

      // strike button event
      fireEvent.click(strikeButton)
      // foul button event
      fireEvent.click(foulButton)

      // Ball 1
      fireEvent.click(ballButton)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(1)

      // Ball 2
      fireEvent.click(ballButton)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(2)

      // Ball 3
      fireEvent.click(ballButton)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(3)

      // Ball 4
      fireEvent.click(ballButton)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)
    })
  })

  describe('Foul button', () => {
    it('changes the foul, and strike value by 1', () => {
      const { getByTestId } = render(<Dashboard />)

      const button = getByTestId('foulBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)
    })

    it('shows when strikes are at the value of 2, fouls will increment by 1 and strikes will remain at the value 2', () => {
      const { getByTestId } = render(<Dashboard />)

      const button = getByTestId('foulBtn')

      // Foul ball 1
      fireEvent.click(button)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(1)

      // Foul ball 2
      fireEvent.click(button)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(2)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)

      // Foul ball 3
      fireEvent.click(button)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(3)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)

      // Foul ball 4
      fireEvent.click(button)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(4)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(2)
    })
  })

  describe('Hit button', () => {
    it('changes the inning hit and game total hit value by 1', () => {
      const { getByTestId } = render(<Dashboard />)

      const button = getByTestId('hitBtn')

      fireEvent.click(button)

      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('hitTotal').textContent, 10)).toBe(1)
    })

    it('shows when 4 or more hits occur before 3 outs in the inning the value of runs increment by 1', () => {
      const { getByTestId } = render(<Dashboard />)

      const button = getByTestId('hitBtn')

      // Hit count 1
      fireEvent.click(button)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(1)

      // Hit count 2
      fireEvent.click(button)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(2)

      // Hit count 3
      fireEvent.click(button)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(3)

      // Hit count 4
      fireEvent.click(button)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(4)
      expect(parseInt(getByTestId('runsTotal').textContent, 10)).toBe(1)
    })

    it('shows when a hit occurs the count is reset', () => {
      const { getByTestId } = render(<Dashboard />)

      const hitButton = getByTestId('hitBtn')
      const strikeButton = getByTestId('strikeBtn')
      const ballButton = getByTestId('ballBtn')
      const foulButton = getByTestId('foulBtn')

      // strike button event
      fireEvent.click(strikeButton)
      // ball button event
      fireEvent.click(ballButton)
      // foul button event
      fireEvent.click(foulButton)

      // A Hit Occurs
      fireEvent.click(hitButton)
      expect(parseInt(getByTestId('hitCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)

    })
  })

  describe('Error button', () => {
    it('changes the inning errors value by 1', () => {
      const { getByTestId } = render(<Dashboard />)

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

  describe('Out button', () => {
    it('Sets the strikes, balls, and fouls to 0, and increments outs by 1', () => {
      const { getByTestId } = render(<Dashboard />)

      const outButton = getByTestId('outBtn')
      const strikeButton = getByTestId('strikeBtn')
      const ballButton = getByTestId('ballBtn')
      const foulButton = getByTestId('foulBtn')

      // strike button event
      fireEvent.click(strikeButton)
      // ball button event
      fireEvent.click(ballButton)
      // foul button event
      fireEvent.click(foulButton)
      // out button event
      fireEvent.click(outButton)

      expect(parseInt(getByTestId('outCount').textContent, 10)).toBe(1)
      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)
    })
  })

  describe('Reset Batter Count button', () => {
    it('Sets the strikes, balls, and fouls to 0', () => {
      const { getByTestId } = render(<Dashboard />)

      const resetButton = getByTestId('resetBtn')
      const strikeButton = getByTestId('strikeBtn')
      const ballButton = getByTestId('ballBtn')
      const foulButton = getByTestId('foulBtn')

      // strike button event
      fireEvent.click(strikeButton)
      // ball button event
      fireEvent.click(ballButton)
      // foul button event
      fireEvent.click(foulButton)
      // reset button event
      fireEvent.click(resetButton)

      expect(parseInt(getByTestId('strikeCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('ballCount').textContent, 10)).toBe(0)
      expect(parseInt(getByTestId('foulCount').textContent, 10)).toBe(0)
    })
  })

})
