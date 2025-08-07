import { renderHook, act } from '@testing-library/react';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('initializes count to 0 and val to 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('increments count by val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('updates val and increments by new val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(5);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);
  });

  it('increments multiple times correctly', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
  });

  it('handles edge case: setVal and increment in same act', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(10);
      result.current.increment();
    });
    expect(result.current.count).toBe(1); // increment uses old val
    expect(result.current.val).toBe(10);  // val is updated after render
  });
  });