import type { EventType } from './use-event';

type EventListener = (event: EventType) => void;

type EventSystem = {
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
  dispatchEvent(event: EventType): void;
};

/**
 * implement in js for react native when not running with DOM
 */
function getEventSystem(): EventSystem {
  if (typeof window !== 'undefined') {
    return window;
  }
  let eventListeners = new Map<string, Set<EventListener>>();
  return {
    addEventListener(type: string, listener: (event: EventType) => void) {
      let listeners = eventListeners.get(type);
      if (!listeners) {
        listeners = new Set();
        eventListeners.set(type, listeners);
      }
      listeners.add(listener);
    },
    removeEventListener(type: string, listener: (event: EventType) => void) {
      eventListeners.get(type)?.delete(listener);
    },
    dispatchEvent(event: EventType) {
      eventListeners.get(event.type)?.forEach((listener) => listener(event));
    },
  };
}

export let eventSystem = getEventSystem();
