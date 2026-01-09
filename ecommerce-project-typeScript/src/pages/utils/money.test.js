import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('FormateMoney', () => {
  it('formats 1999 cents as &19.99 ', () => {
  expect(formatMoney(1999)).toBe('$19.99');
});

it('Display 2 decimal', () => {
  expect(formatMoney(1090)).toBe('$10.90');
  expect(formatMoney(100)).toBe('$1.00');
});

it('Display Zeros 0', () => {
  expect(formatMoney(0)).toBe('$0.00');
});

it('Display Negative numbers', () => {
  expect(formatMoney(-100)).toBe('-$1.00');
});

})

