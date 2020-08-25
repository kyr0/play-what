import _Preset from './Vector.Note.presets';
import * as Theory from './Theory';
import * as Vector from './Vector';

export const Preset = _Preset;

export const getName = ({ pod }) => {
  if (pod.d < 0 || pod.d > Vector.max.d) {
    console.error('degree out of bounds', pod);
    return '';
  }
  const reduced = Vector.reduce(pod);
  const degree = Theory.DEGREE_MAP[reduced.d];
  return degree.name + Theory.getAccidentalString(reduced.p - degree.p);
};

/* export const parseString = keyString => {
    if (typeof keyString !== 'string' || !keyString.length) {
        throw ('Bad keystring args')
    }
    const [tonicStr, accidentalStr] = Utils.splitAt(keyString, 1);

    const degreeIndex = DEGREE_MAPPING.findIndex(d => d.name === tonicStr);

    const accidental = ACCIDENTAL_VALUES.find(a => a.name === accidentalStr) || ACCIDENTAL.Natural;

    return {
        id: keyString,
        name: keyString,
        p: DEGREE_MAPPING[degreeIndex].pitch + accidental.offset,
        d: degreeIndex
    };
}; */