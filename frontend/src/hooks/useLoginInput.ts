import { useState, ChangeEvent } from 'react';

export function useLoginInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
}
