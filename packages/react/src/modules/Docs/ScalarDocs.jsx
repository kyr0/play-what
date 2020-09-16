import PW_Core from '@pw/core';
import React, { useState } from "react";
import ScalarInput from '../UI/ScalarInput/ScalarInput';
import "./Docs.css";

const ScalarDocs = () => {

	const [a, setA] = useState(3);
	const [b, setB] = useState(4);
	const [divisor, setDivisor] = useState(2);
	const [offset, setOffset] = useState(1);
	const [subtraction, setSubtraction] = useState(false);

	const result_modulo = PW_Core.models.scalar.modulo(a, divisor);

	const result_moduloSum = PW_Core.models.scalar.moduloSum(a, b, divisor, offset, subtraction);

	return (
		<div className='scalar-docs'>
			<h1>Scalar</h1>

			<h2>Default:</h2>
			<ScalarInput value={0} />

			<h2>Modulo:</h2>
			<label>a</label>
			<ScalarInput value={a} setValue={setA} />
			<label>divisor</label>
			<ScalarInput value={divisor} setValue={setDivisor} />
			<label>=</label>
			<ScalarInput value={result_modulo} />

			<h2>Modulo Sum:</h2>
			<label>a</label>
			<ScalarInput value={a} setValue={setA} />
			<label>b</label>
			<ScalarInput value={b} setValue={setB} />
			<label>divisor</label>
			<ScalarInput value={divisor} setValue={setDivisor} />
			<label>offset</label>
			<ScalarInput value={offset} setValue={setOffset} />
			<label>=</label>
			<ScalarInput value={result_moduloSum} />
		</div>
	);
}

export default ScalarDocs;
