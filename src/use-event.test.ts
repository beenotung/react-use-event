import { eventSystem as window } from './event-system';
import defaultUseEvent, { useEvent, dispatch } from './use-event';

describe('export functions', () => {
  it('should export useEvent function as default export', () => {
    expect(defaultUseEvent).toBe(useEvent);
  });
  it('should export useEvent function', () => {
    expect(typeof useEvent).toBe('function');
  });
  it('should export dispatch function', () => {
    expect(typeof dispatch).toBe('function');
  });
});

describe('event dispatch and listening', () => {
  let listener = jest.fn();

  window.addEventListener('test', listener);
  expect(listener).not.toBeCalled();

  dispatch('test', { data: 'mock 1' });
  expect(listener).toBeCalledTimes(1);
  expect(listener.mock.calls[0][0].data).toBe('mock 1');

  window.removeEventListener('test', listener);
  dispatch('test', { data: 'mock 2' });
  expect(listener).toBeCalledTimes(1);
});
