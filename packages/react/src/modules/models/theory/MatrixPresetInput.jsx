import pw_core from "@pw/core";
import React, { useState } from "react";
import DropdownInput from "../ui/DropdownInput/DropdownInput";
import ChordInput from "./chord/ChordInput";
import IntervalInput from "./interval/IntervalInput";
import NoteInput from "./note/NoteInput";
import ScaleInput from "./scale/ScaleInput";

const VECTOR_TYPES = [
	{
		id: 'note',
		name: 'Note',
		input: NoteInput
	},
	{
		id: 'interval',
		name: 'Interval',
		input: IntervalInput
	}
];

const MATRIX_TYPES = [
	{
		id: 'chord',
		name: 'Chord',
		input: ChordInput
	},
	{
		id: 'scale',
		name: 'Scale',
		input: ScaleInput
	}
];

const TYPES = {
	vector: VECTOR_TYPES,
	matrix: MATRIX_TYPES
}

const MatrixPresetInput = ({ value, setValue, modelType }) => {
	//if (!value) return null;

	const model = TYPES[modelType];
	const [type, setType] = useState(model[0]);
	const InputComponent = type.input;

	return (
		<div className='preset-input'>
			<DropdownInput options={model} value={type} setValue={setType} />
			<InputComponent value={value} setValue={setValue} />
		</div>
	);
};

export default MatrixPresetInput;
