import { renderHook, act  } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePersistedState } from '../hooks/usePersistedState';
import {LocalStorage} from 'node-localstorage'
global.localStorage = new LocalStorage('./scratch');

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the default value', () => {
    const { result } = renderHook(() =>
      usePersistedState('testKey', 'defaultValue')
    );
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should persist the state in localStorage', () => {
    const { result } = renderHook(() =>
      usePersistedState('testKey', 'defaultValue')
    );
    act(() => {
      const [, setState] = result.current;
      setState('newValue');
    });
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should retrieve the persisted state from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('persistedValue'));
    const { result } = renderHook(() =>
      usePersistedState('testKey', 'defaultValue')
    );
    expect(result.current[0]).toBe('persistedValue');
  });

  it('should update the state correctly', () => {
    const { result } = renderHook(() =>
      usePersistedState('testKey', 'defaultValue')
    );
    act(() => {
      const [, setState] = result.current;
      setState('newValue');
    });
    expect(result.current[0]).toBe('newValue');
  });
});
