# 🚨 use-dependency-alert

[![npm](https://img.shields.io/npm/v/use-dependency-alert?style=flat-square)](https://www.pkgstats.com/pkg:use-dependency-alert)
[![NPM](https://img.shields.io/npm/l/use-dependency-alert?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/dt/use-dependency-alert?style=flat-square)](https://www.pkgstats.com/pkg:use-dependency-alert)
[![Coveralls github](https://img.shields.io/coveralls/github/ryanhefner/use-dependency-alert?style=flat-square)](https://coveralls.io/github/ryanhefner/use-dependency-alert)
[![codecov](https://codecov.io/gh/ryanhefner/use-dependency-alert/branch/main/graph/badge.svg)](https://codecov.io/gh/ryanhefner/use-dependency-alert)
[![CircleCI](https://img.shields.io/circleci/build/github/ryanhefner/use-dependency-alert?style=flat-square)](https://circleci.com/gh/ryanhefner/use-dependency-alert)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ryanhefner/use-dependency-alert?style=flat-square)

React hook for debugging hook dependency arrays to validate what is changing, and how often. Not intended to be included in the final `production` build, but handy to use while debugging and confirming hooks are being triggered/rerendered when expected.

## Install

Via [npm](https://npmjs.com/package/use-dependency-alert)

```sh
npm install use-dependency-alert
```

Via [Yarn](https://yarn.pm/use-dependency-alert)

```sh
yarn add use-dependency-alert
```

## How to use

```js
import { useEffect } from 'react'
import useDepedencyAlert from 'use-dependency-alert'

const TestComponent = ({ changingProp }) => {
  useEffect(() => {
    // This should not be changing often, but useDependencyAlert will let us know if that’s the case
  }, useDependencyAlert([changingProp]))

  return <div>{changingProp}</div>
}
```

### With Options

```js
import { useEffect } from 'react'
import useDepedencyAlert from 'use-dependency-alert'

const TestComponent = ({ changingProp }) => {
  useEffect(() => {
    // This should not be changing often, but useDependencyAlert will let us know if that’s the case
  }, useDependencyAlert(
    [changingProp],
    {
      context: 'TestComponent',
      dependencyKeys: ['changingProps'],
      logDelay: 5000,
    },
  ))

  return <div>{changingProp}</div>
}
```

#### Options

* `context: string` - Basic string for making alerts unique to help differentiate from others.
* `dependencyKeys: string[]` - Array of names to apply to depedency indexes in the array. Intended to streamline debugging.
* `logDelay: number` - Milliseconds used to delay the logging of depedency updates to help keep the noise down in the `console`.

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
