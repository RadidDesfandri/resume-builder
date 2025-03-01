import { ChangeEvent, useState } from 'react';

export function useInput<T>(
  defaultValue: T
): [
  T,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<T>>,
  (idx: number) => void,
] {
  const [value, setValue] = useState<T>(defaultValue);

  const handleChangeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: newValue } = event.target;

    setValue((prevValue) => {
      if (Array.isArray(prevValue)) {
        return [...prevValue, newValue] as T;
      }
      if (typeof prevValue === 'object' && prevValue !== null) {
        return { ...prevValue, [name]: newValue } as T;
      }
      return newValue as T;
    });
  };

  const removeItemByIndex = (index: number) => {
    if (Array.isArray(value)) {
      setValue(value.filter((_, i) => i !== index) as T);
    }
  };

  return [value, handleChangeValue, setValue, removeItemByIndex];
}
