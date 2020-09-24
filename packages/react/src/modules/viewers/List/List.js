import PW_Core from '@pw/core';
import PW_Color from '@pw/color';
import PW_Tone from '@pw/tone';
import React from 'react';
import './List.css';

const ListItem = ({ value, theoryType }) => {
	let onClick = null;
	let text = '';
	let color = null;
	let style = {};

	switch (theoryType) {
	case 'note': {
		const note = PW_Core.models.math.pod.reduce(value);
		const [p, d] = note;
		text = PW_Core.models.theory.note.getName({ A: note })
		color = PW_Core.models.theory.degree.getColor(d);
		style = {
			border: `1px solid ${color}`
		};
		const f = PW_Core.tuning.getFrequency(value[0]);
		onClick = () => PW_Tone.out.play(f);
		break;
	}
	case 'interval': {
		const interval = PW_Core.models.math.pod.reduce(value);
		const [p, d] = interval;
		text = PW_Core.models.theory.interval.getName({ A: interval })
		color = PW_Core.models.theory.degree.getColor(d);
		style = {
			border: `1px solid ${color}`
		};
		break;
	}
	default: {
		return null;
	}
	}

	return <div className='list-item' style={style} onClick={onClick}>{text}</div>;
};

const List = ({ value, mathType, theoryType, ...props }) => {
	switch (mathType) {
	case 'string':
	case 'integer': {
		return value;
	}
	case 'pod': {
		return <ListItem value={value} theoryType={theoryType} />;
	}
	case 'podList': {
		return (
			<div className='list'>
				{value.map((v, i) => <ListItem value={v} theoryType={theoryType} key={i} />)}
			</div>
		);
	}
	default: {
		return null;
	}
	}
}

export default List;
