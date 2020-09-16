import vector from './vector';
import scalar from './scalar';
import Utils from '../Utils';

import preset from './matrix.presets';

const isValid = (matrix) => {
	return matrix !== null && Array.isArray(matrix) && !matrix.find((v) => !vector.isValid(v));
};

const areEqual = ({ list1, list2 }) => {
	if (!list1 || !list2) return false;
	if (list1.length !== list2.length) return false;
	for (let i = 0; i < list1.length; i++) {
		if (!vector.areEqual(list1[i], list2[i])) { return false; }
	}
	return true;
};

const findVectorWithPitch = ({ matrix, pitch, pitchClass = false }) => {
	const p = pitchClass ? scalar.modulo(pitch, vector.max[0]) : pitch;
	const index = matrix.findIndex((n) => n[0] === p);
	return index > -1 ? [matrix[index], index] : [null, index];
};

const getMode = ({ scale, degree }) => {
	let mode = [...scale];
	mode = Utils.rotate(mode, degree);
	const a = mode[0];
	const newMode = mode.map((m) => {
	  return [
			scalar.moduloSum(m[0], a[0], 12, 0, true),
			scalar.moduloSum(m[1], a[1], 7, 0, true)
	  ];
	});
	return newMode;
};

const getAllModes = ({ scale, keyCenter }) => {
	const modes = [];
	for (let i = 1; i <= scale.length; i++) {
	  modes.push(getMode({ scale, degree: i }));
	}
	return modes.map((m, i) => ({
	  name: `Degree ${i + 1}`,
	  a: keyCenter,
	  B: m
	}));
};

const getNumeral = ({ scale, keyCenter, degree }) => {
	const i1 = degree;
	const i3 = scalar.moduloSum(degree, 2, scale.length);
	const i5 = scalar.moduloSum(degree, 4, scale.length);
	const i7 = scalar.moduloSum(degree, 6, scale.length);
	const numeral = [scale[i1], scale[i3], scale[i5], scale[i7]];
	return {
	  name: `Numeral ${degree + 1}`,
	  a: keyCenter,
	  B: numeral
	};
};

const getAllNumerals = ({ scale, keyCenter }) => {
	const numerals = [];
	for (let i = 0; i < scale.length; i++) {
	  numerals.push(getNumeral({ scale, keyCenter, degree: i }));
	}
	return numerals;
};

export default {
	preset,
	isValid,
	areEqual,
	findVectorWithPitch,
	getNumeral,
	getAllNumerals,
	getMode,
	getAllModes
};
