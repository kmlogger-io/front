import { useState } from 'react';

export type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export const useButtonSubmit = () => {
  const [state, setState] = useState<ButtonState>('idle');

  const setLoading = () => setState('loading');
  const setSuccess = () => {
    setState('success');
    setTimeout(() => setState('idle'), 2000);
  };
  const setError = () => {
    setState('error');
    setTimeout(() => setState('idle'), 2000);
  };
  const reset = () => setState('idle');

  return {
    state,
    setLoading,
    setSuccess,
    setError,
    reset,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error'
  };
};
