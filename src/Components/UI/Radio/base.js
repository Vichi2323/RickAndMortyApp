// vendor imports
import React from 'react';
// styles
import './style.css';

export const Radio = (props) => {

	const onChange = () => {
		props.onChange(props.value);
	};

	return (
		<label className={`radio ${props.disabled ? 'radio-disabled' : null}`}>
			<span className='radio__label'>{props.label}</span>
			<input
				className='radio__input'
				type='radio'
				name={props.name}
				value={props.value}
				disabled={props.disabled}
				checked={props.checked}
				onChange={onChange}
			/>
			<span className="radio__span"></span>
		</label>
	);
};