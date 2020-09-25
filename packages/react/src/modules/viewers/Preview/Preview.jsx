import PW_Core from '@pw/core';
import PW_Color from '@pw/color';
import PW_Tone from '@pw/tone';
import React, { useState } from 'react';
import './Preview.css';
import ScalarInput from '../../models/math/scalar/ScalarInput';
import VectorInput from '../../models/math/vector/VectorInput';
import MultiInput from '../../models/math/matrix/MultiInput';
import VectorOutput from '../../models/math/vector/VectorOutput';
import MatrixOutput from '../../models/math/matrix/MatrixOutput';

const max = [12, 7];

const ListItem = ({ value, podType }) => {

	let onClick = null;
	let text = '';
	let color = null;
	let style = {};

	switch (podType) {
	case 'note': {
		const note = PW_Core.models.math.vector.reduce(value);
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
		const interval = PW_Core.models.math.vector.reduce(value);
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

	return (
		<div className='list-item' style={style} onClick={onClick}>
			{text}
		</div>
	);
};

const List = ({ value, podType }) => {
	return (
		<div className='list'>
			{value.map((v, i) => <ListItem value={v} podType={podType} key={i} />)}
		</div>
	);
};

export const Edit = ({ value, setValue, modelType, podType }) => {
	return <MultiInput value={value} setValue={setValue} max={max} podType={podType} modelType={modelType} />
};

export const View = ({ value, podType, modelType }) => {
	switch (modelType) {
	case 'vector': {
		return <List value={[value]} podType={podType} />;
	}
	case 'matrix': {
		return <List value={value} podType={podType} />;
	}
	default: {
		return <div className='list-item' >{value}</div>;
	}
	}
};