# react-use-event

> React use hook for global event dispatch and listening

[![NPM](https://img.shields.io/npm/v/react-use-event.svg)](https://www.npmjs.com/package/react-use-event)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/react-use-event)](https://bundlephobia.com/package/react-use-event)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/react-use-event)](https://bundlephobia.com/package/react-use-event)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package provide a simple mechanism **for components across any level in the hierarchy to communicate via events**. ~~Without a top-level redux store and verbose reducer.~~

## Features

- Realtime event-based communication across multiple components
- Support any javascript data type
- Do not need to combine states and reducers into a centralized redux store
- Compatible with `React.useState()` and other stateful use hooks

Demo: [https://react-use-event-demo.surge.sh](https://react-use-event-demo.surge.sh)

## Description

The event listener is auto registered when the component is mount, and got unregistered when the component is unmounted.

You can **store the state in any component** using `ClassComponent.state` or `React.useState()` or any use hooks that fit your need. And you can **dispatch event from any component**.

The events are dispatched using the native DOM (using window as target), therefore it can work outside react as well.

## Install

```bash
## using npm
npm install react-use-event

## or using yarn
yarn add react-use-event

## or using pnpm
pnpm install react-use-event
```

## Typescript Signature

```typescript
export function useEvent<E extends EventType>(
  type: E['type'],
  onEvent?: (event: E) => void,
): Dispatch<E>

export function dispatch<E extends EventType>(
  type: E['type'],
  data: Omit<E, 'type'>,
): void

export type EventType<
  Type extends string = string,
  Data extends object = {}
> = {
  type: Type
} & Data

export type Dispatch<E extends EventType> = (data: Omit<E, 'type'>) => void

export default useEvent
```

## Usage

```tsx
import React, { useState } from 'react'
import { useEvent } from 'react-use-event'

const DemoApp = () => {
  return (
    <>
      <View />
      <Buttons />
    </>
  )
}

type CounterEvent = {
  type: 'Counter'
  delta: number
}

const View = () => {
  const [count, setCount] = useState(0)
  // auto add listener when mount, and remove listener when unmount
  useEvent<CounterEvent>('Counter', event => {
    setCount(count + event.delta)
  })
  return <div>{count}</div>
}

const Buttons = () => {
  // setup event dispatcher
  const dispatchCounter = useEvent<CounterEvent>('Counter')
  return (
    <div>
      <button onClick={() => dispatchCounter({ delta: -1 })}>-1</button>
      <button onClick={() => dispatchCounter({ delta: +1 })}>+1</button>
    </div>
  )
}

export default DemoApp
```

Details see [Example.tsx](./src/Example.tsx) and [DemoApp.tsx](./src/DemoApp.tsx)

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
