const defaults = {
	a: [0, 0],
	B: []
};

/*
export const chordalInversion = (conceptConfig, inversion) => {
    const concept = { ...conceptConfig };
    concept.B = [...conceptConfig.B];
    concept.B[0] = addVectors(concept.B[0], Presets.INTERVALS.P8.a);
    concept.B = rotate(concept.B, inversion);
    return concept;
} */

export default {
	defaults
};
