import { useCallback, useEffect, useMemo, useRef } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

function objectDiff(obj1, obj2) {
  if (Object.is(obj1, obj2)) {
    return undefined
  }

  if (!obj2 || typeof obj2 !== 'object') {
    return obj2
  }

  let result = {}

  Object.keys(obj1 || {})
    .concat(Object.keys(obj2 || {}))
    .forEach((key) => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key]
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = diff(obj1[key], obj2[key])
        if (value !== undefined) {
          result[key] = value
        }
      }
    })

  return result
}

const DEFAULT_OPTIONS = {
  context: '',
  dependencyKeys: null,
  logDelay: 1000,
}

/**
 * useDependencyAlert
 *
 * Hook for testing dependency arrays and alerts and reports when exceeds defined thresholds.
 *
 * @param {unknown[]=} dependencies
 * @param {{ context: string, dependencyKeys: string[], logDelay: number }=} options
 * @returns unknown[]
 */
const useDependencyAlert = (dependencies = [], options = {}) => {
  const { context, dependencyKeys, logDelay } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const prevDependenciesRef = useRef(dependencies)
  const diffStartTimeRef = useRef(null)
  const timeoutRef = useRef(null)
  const diffsRef = useRef([])

  const useCompareEffect = useMemo(
    () =>
      dependencies.some((dep) => typeof dep === 'object' || Array.isArray(dep))
        ? useDeepCompareEffect
        : useEffect,
    [dependencies]
  )

  const logDiffs = useCallback((diffs = [], context) => {
    console.groupCollapsed(
      `[Dependency Alert]: ${context ? `${context} -` : ''} ${
        diffs.length
      } changes detected`
    )
    diffs.forEach(console.log)
    console.groupEnd()
  }, [])

  useCompareEffect(() => {
    if (prevDependenciesRef.current) {
      let dependenciesDiff = {}

      dependencies.forEach((dep, index) => {
        // Objects
        if (typeof dependencies[index] === 'object') {
          const diff = objectDiff(
            dependencies[index],
            prevDependenciesRef.current[index]
          )

          if (diff) {
            dependenciesDiff[index] = diff
          }
        }
        // Arrays
        else if (Array.isArray(dependencies[index])) {
          if (
            JSON.stringify(dependencies[index]) !==
            JSON.stringify(prevDependenciesRef.current[index])
          ) {
            dependenciesDiff[index] = depedencies[index]
          }
        }
        // Everything else
        else {
          if (dependencies[index] !== prevDependenciesRef.current[index]) {
            dependenciesDiff[index] = dependencies[index]
          }
        }
      })

      if (Object.keys(dependenciesDiff).length) {
        diffsRef.current.push(dependenciesDiff)

        if (!diffStartTimeRef.current) {
          diffStartTimeRef.current = Date.now()

          if (logDelay) {
            timeoutRef.current = setTimeout(() => {
              logDiffs(diffsRef.current, context)

              diffsRef.current = []
              diffStartTimeRef.current = null
            }, logDelay)
          } else {
            logDiffs(diffsRef.current, context)
          }
        }
      }
    }

    prevDependenciesRef.current = dependencies
  }, dependencies)

  return dependencies
}

export default useDependencyAlert
