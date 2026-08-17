import { describe, expect, it } from 'vitest';
import clsx from 'clsx';

describe('clsx', () => {
  it('조건부 클래스를 공백으로 합친다.', () => {
    const isActive = true;
    const isDisabled = false;

    expect(clsx('base', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base active',
    );
  });
});
