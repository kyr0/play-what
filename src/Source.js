import api from './api';
import * as KeyCenter from "./KeyCenter";
import * as Theory from './Theory';
import { CONCEPT_DEFAULTS } from './Concept';

export const SCOPE = {
    Concept: 'concept',
    Progression: 'progression',
    Section: 'section',
    Chart: 'chart'
}

export const getConceptAt = (chart, position) => {
    const { a, B } = conceptConfig;
    const tonic = Theory.getNoteName(a);
    const preset = Theory.findPreset(B);
    return `${tonic} ${preset.name || '?'}`;
}

export const getConceptName = (conceptConfig) => {
    const { a, B } = conceptConfig;
    const tonic = Theory.getNoteName(a);
    const preset = Theory.findPreset(B);
    return `${tonic} ${preset.name || '?'}`;
}

export const parseA = a => {
    if (typeof a === 'string') {
        return api(a).a;
    }
    return a;
    if (a.input) {
        const { input, props } = a;
        return api(input, props).a;
    }
}

export const parseB = B => {
    if (typeof B === 'string') {
        return api(B).B;
    }
    if (B.input) {
        const { input, props } = B;
        return api(input, props).B;
    }
    if(Array.isArray(B)) {
        // handle array of config case
        return B;
    }
}

export const parseConceptHelper = (conceptConfig) => {
    let concept = {};
    concept.a = parseA(conceptConfig.a);
    concept.B = parseB(conceptConfig.B);
    concept.C = KeyCenter.addVectorArray({ a: concept.a, B: concept.B });
    return concept;
};

export const parseConceptConfig = (conceptConfig, parentInput = {}) => {
    const { id, name } = conceptConfig;

    if (typeof conceptConfig === 'string') {
        throw ('');
        return api(conceptConfig);
    }
    else if (typeof conceptConfig === 'object') {
        // sketchy logic for determining parser on leaf
        if (typeof conceptConfig.value === 'string')
            return api(conceptConfig.value, conceptConfig.props);
        // only case to handle now
        const mergedConfig = { ...CONCEPT_DEFAULTS, ...parentInput, ...conceptConfig };
        const concept = parseConceptHelper(mergedConfig);
        return concept;
    }
    else if (Array.isArray(conceptConfig)) {
        throw ('');
        const inputReducer = (acc, cur, i, arr) => {
            return parseInput({ value: cur.value, props: { ...acc, ...cur.props } });
        };
        return conceptConfig.reduce(inputReducer, {});
    }
    else {
        throw ('');
        return {};
    }
};

const parseInput = (input) => {
    if (typeof input === 'string') {
        return api(input);
    }
    else if (Array.isArray(input)) {
        const inputReducer = (acc, cur, i, arr) => {
            return parseInput({ value: cur.value, props: { ...acc, ...cur.props } });
        };
        const result = input.reduce(inputReducer, {});
        return result;
    }
    else if (typeof input === 'object') {
        return api(input.value, input.props);
    }
    else {
        return {};
    }
}

export const parseSourceConfig = (sourceConfig, parentInput = {}) => {

    const parsedInput = parseInput(sourceConfig.input);
    const mergedInput = { ...parentInput, ...parsedInput };
    console.log(sourceConfig.input, parentInput, mergedInput);

    //console.log(sourceConfig.scope)

    if (sourceConfig.children) {
        return {
            ...sourceConfig,
            id: sourceConfig.id || 'id',
            name: sourceConfig.name || 'name',
            children: sourceConfig.children.map(c => parseSourceConfig(c, mergedInput))
        }
    }
    return parseConceptConfig(sourceConfig, mergedInput);
}

export const parse = props => {
    if (!props.config) throw ('Missing config from source props');
    return parseSourceConfig(props.config);
}