import React from 'react';

const Input = ({ name, type, value, onChange, onFocus, className }) => {
    return (
        <input
            className={className}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
        />
    );
};

export default Input;