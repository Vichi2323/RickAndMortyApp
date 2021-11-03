// vendor imports
import React from 'react';
// components
import { Radio } from './base';

export const RadioGroup = (props) => {
	return (
		<>
			{props.options.map((option, i) => (
				<Radio
					key={i}
					name={props.name}
					label={option.label}
					value={option.value}
					disabled={props.disabled}
					checked={props.value === option.value}
					onChange={props.onChange}
				/>
			))}
		</>
	);
};