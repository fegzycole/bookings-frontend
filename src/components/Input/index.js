import React from 'react';
import { StyledTextField } from './style';

const Input = ({ type, value, handleChange, placeholder, name }) => {
    return (
        <StyledTextField
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            name={name}
            required
        />
    );
};

export default Input;
