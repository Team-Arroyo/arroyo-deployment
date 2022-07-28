import pause from './pause.js';

describe('Returns a promise', () => {
  test('returns a promise', () => {
    const pauseInvocation = pause(1000);
    const isPromise = pauseInvocation instanceof Promise;
    expect(isPromise).toBe(true);
  })
})