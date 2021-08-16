import { useCallback, useEffect } from 'react';

export type EventType<
  Type extends string = string,
  Data extends object = {}
> = {
  type: Type;
} & Data;

export type Dispatch<E extends EventType> = (data: Omit<E, 'type'>) => void;

export function useEvent<E extends EventType>(
  type: E['type'],
  onEvent?: (event: E) => void,
): Dispatch<E> {
  useEffect(() => {
    if (!onEvent) return;
    window.addEventListener(type, onEvent as () => void);
    return () => {
      window.removeEventListener(type, onEvent as () => void);
    };
  }, [type, onEvent]);

  const dispatchEvent: Dispatch<E> = useCallback(
    (data: Omit<E, 'type'>) => {
      dispatch<E>(type, data);
    },
    [type],
  );

  return dispatchEvent;
}

export function dispatch<E extends EventType>(
  type: E['type'],
  data: Omit<E, 'type'>,
) {
  const event = Object.assign(new Event(type), data);
  window.dispatchEvent(event);
}

export default useEvent;
