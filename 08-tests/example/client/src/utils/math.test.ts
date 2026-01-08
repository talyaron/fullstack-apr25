import { add } from './math';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('should add positive and negative numbers', () => {
    expect(add(5, -3)).toBe(2);
  });

  it('should return 0 when adding 0 and 0', () => {
    expect(add(0, 0)).toBe(0);
  });
});
