import React from 'react';

const Input = ({
    name,
    type,
    value,
    onChange,
    onFocus,
    className,
    placeholder,
    children,
    labelClassname,
    inputContainerClassname
}) => {
    return (
        <div className={inputContainerClassname}>
            <label className={labelClassname}>{children}</label>
            <input
                className={className}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;