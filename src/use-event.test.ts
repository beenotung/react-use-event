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
