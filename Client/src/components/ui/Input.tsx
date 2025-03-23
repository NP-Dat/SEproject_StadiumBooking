import React from 'react';

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} />
);

export default Input;
