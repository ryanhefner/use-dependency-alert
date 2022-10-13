/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
import { renderHook } from '@testing-library/react-hooks'
import useDependencyAlert from '.'

describe('use-dependency-alert', () => {
  beforeEach(() => {
    global.console = {
      groupCollapsed: jest.fn(),
      groupEnd: jest.fn(),
      log: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns dependencies passed', () => {
    const testDependency = 'test'
    const { result } = renderHook(() => useDependencyAlert([testDependency]))

    expect(result.current).toEqual(['test'])
  })

  it('logs when dependencies change', () => {
    let initialValue = 'test'

    const { result, rerender } = renderHook(() =>
      useDependencyAlert([initialValue], { logDelay: 0 })
    )

    initialValue = 'tested'

    rerender()

    expect(result.current).toEqual(['tested'])
    expect(console.groupEnd).toBeCalled()
  })

  it('captures dependency change - object', () => {
    let initialValue = { mock: 'test' }

    const { result, rerender } = renderHook(() =>
      useDependencyAlert([initialValue], { logDelay: 0 })
    )

    initialValue = { mock: 'tested' }

    rerender()

    expect(result.current).toEqual([{ mock: 'tested' }])
    expect(console.groupEnd).toBeCalled()
  })

  it('captures dependency change - array', () => {
    let initialValue = [1]

    const { result, rerender } = renderHook(() =>
      useDependencyAlert([initialValue], { logDelay: 0 })
    )

    initialValue = [2]

    rerender()

    expect(result.current).toEqual([[2]])
    expect(console.groupEnd).toBeCalled()
  })

  it('does not log if no dependency changes', () => {
    let initialValue = [1]

    const { result, rerender } = renderHook(() =>
      useDependencyAlert([initialValue], { logDelay: 0 })
    )

    initialValue = [1]

    rerender()

    expect(result.current).toEqual([[1]])
    expect(console.groupEnd).not.toBeCalled()
  })
})
