import { ChangeEvent, useState } from 'react';

interface UseTextAreaValidationProps {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

export const useTextAreaValidation = ({
  maxLength,
  minLength,
  required,
}: UseTextAreaValidationProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (text: string) => {
    if (required && !text) {
      setError(true);
      setErrorMessage('Field is required');
      return false;
    } else if (minLength && text.length < minLength) {
      setError(true);
      setErrorMessage(`Minimum ${minLength} characters`);
      return false;
    } else if (maxLength && text.length > maxLength) {
      setError(true);
      setErrorMessage(`Maximum ${maxLength} characters`);
      return false;
    }

    setError(false);
    setErrorMessage('');
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue);
  };

  const handleBlur = () => {
    validate(value);
  };

  const handleReset = () => {
    setValue('');
  };

  return {
    value,
    error,
    errorMessage,
    handleChange,
    handleBlur,
    validate,
    handleReset,
  };
};
