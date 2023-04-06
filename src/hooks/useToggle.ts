import { useState } from 'react';

export function useToggle(initialValue: boolean): { value: boolean; toggle: () => void } {
    const [value, setValue] = useState<boolean>(initialValue);
  
    const toggle = () => {
      setValue(!value);
    };
  
    return { value, toggle };
  }
  
