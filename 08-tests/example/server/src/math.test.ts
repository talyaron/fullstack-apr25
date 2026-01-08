import { add } from './math';

describe('add function', () => { //suite describe block for grouping related tests
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds 0 + 0 to equal 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test('adds positive and negative', () => {
    expect(add(5, -3)).toBe(2);
  });

  test('adds floating point numbers', () => {
    expect(add(1.5, 2.5)).toBeCloseTo(4.0);
  });

  test('adds large numbers', () => {
    expect(add(1e10, 1e10)).toBe(2e10);
  });

  //other edge cases can be added here
  test('adds very small numbers', () => {
    expect(add(1e-10, 2e-10)).toBeCloseTo(3e-10);
  });
});
