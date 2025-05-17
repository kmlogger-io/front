import { useEffect, useState } from 'react';
import ButtonContent from './ButtonContent';
import SuccessIcon from './SuccessIcon';
import ErrorIcon from './ErrorIcon';
import { AnimatePresence } from 'framer-motion';

type ButtonState = 'initial' | 'loading' | 'success' | 'error';

interface GenericButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
}

export default function GenericButton({
  onClick,
  isLoading = false,
  isSuccess = false,
  isError = false,
  text = 'Save',
  loadingText = 'Saving...',
  className,
  disabled = false,
}: GenericButtonProps) {
  const [state, setState] = useState<ButtonState>('initial');

  useEffect(() => {
    if (isLoading) {
      setState('loading');
    } else if (isSuccess) {
      setState('success');
      const timeout = setTimeout(() => setState('initial'), 1200);
      return () => clearTimeout(timeout);
    } else if (isError) {
      setState('error');
      const timeout = setTimeout(() => setState('initial'), 1200);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {state === 'initial' || state === 'loading' ? (
          <ButtonContent
            onClick={onClick}
            isLoading={state === 'loading'}
            text={text}
            loadingText={loadingText}
            key="content"
            disabled={disabled}
          />
        ) : state === 'success' ? (
          <SuccessIcon key="success" />
        ) : (
          <ErrorIcon key="error" />
        )}
      </AnimatePresence>
    </div>
  );
}
