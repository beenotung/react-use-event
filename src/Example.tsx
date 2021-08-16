import React, { useState } from 'react';
import { useEvent } from './use-event';

const DemoApp = () => {
  return (
    <>
      <View />
      <Buttons />
    </>
  );
};

type CounterEvent = {
  type: 'Counter';
  delta: number;
};

const View = () => {
  const [count, setCount] = useState(0);
  useEvent<CounterEvent>('Counter', (event) => {
    setCount(count + event.delta);
  });
  return (
    <fieldset>
      <legend>
        <code>{'<View> Component'}</code>
      </legend>
      {count}
    </fieldset>
  );
};

const Buttons = () => {
  const dispatchCounter = useEvent<CounterEvent>('Counter');
  return (
    <fieldset>
      <legend>
        <code>{'<Buttons> Component'}</code>
      </legend>
      <button onClick={() => dispatchCounter({ delta: -1 })}>-1</button>
      <button onClick={() => dispatchCounter({ delta: +1 })}>+1</button>
    </fieldset>
  );
};

export default DemoApp;
