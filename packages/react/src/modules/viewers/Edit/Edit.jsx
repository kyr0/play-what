import React from 'react';
import VectorInput from '../../models/math/vector/VectorInput';
import VectorOutput from '../../models/math/vector/VectorOutput';
import IntervalInput from '../../models/theory/interval/IntervalInput';
import IntervalOutput from '../../models/theory/interval/IntervalOutput';
import NoteInput from '../../models/theory/note/NoteInput';
import NoteOutput from '../../models/theory/note/NoteOutput';
import './Edit.css';

const getInput = (podType) => {
	switch (podType) {
	case 'pod':
		return VectorInput;
	case 'interval':
		return IntervalInput;
	case 'note':
		return NoteInput;
	}
}

const getOutput = (podType) => {
	switch (podType) {
	case 'pod':
		return VectorOutput;
	case 'interval':
		return IntervalOutput;
	case 'note':
		return NoteOutput;
	}
}

const Single = ({ value, setValue, podType }) => {
	const InputComponent = getInput(podType);
	const OutputComponent = getOutput(podType);
	return (
		<div className="center-x" >
			<InputComponent value={value} setValue={setValue} />
			<OutputComponent value={value} />
		</div>
	);
}

const Multi = ({ value, setValue, podType }) => {
	return (
		<div className="multi">
			{value.map((v, i) => {
				const setSubValue = r => setValue([...value.slice(0, i), r, ...value.slice(i + 1)]);
				return <Single value={v} setValue={setSubValue} podType={podType} key={i} />;
			})}
		</div>
	);
}

const Edit = ({ value, setValue, modelType, podType }) => {
	switch (modelType) {
	case 'scalar':
		return value;
	case 'vector':
		return <Single value={value} setValue={setValue} podType={podType} />;
	case 'matrix':
		return <Multi value={value} setValue={setValue} podType={podType} />;
	default:
		return null;
	}
}

export default Edit;
