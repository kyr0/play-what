import React from 'react';
import './interval.css';
import pw_core from '@pw/core';
import pw_tone from '@pw/tone';

export const IntervalInput = ({ value, reduce }) => {
	const interval = reduce ? pw_core.models.math.vector.reduce({ a: value }) : value;

	const [p, d] = interval;

	const name = pw_core.models.theory.interval.getName({ a: interval });

	const color = pw_core.models.theory.degree.getColor(d);
	const style = {
		border: `1px solid ${color}`
	};

	const froot = pw_core.tuning.getFrequency(0);
	const f = pw_core.tuning.getFrequency(p);
	const onClick = () => pw_tone.out.play([froot, f]);

	return (
		<div className='interval-output output' style={style} onClick={onClick}>
			{name}
		</div>
	);
};
export default IntervalInput;