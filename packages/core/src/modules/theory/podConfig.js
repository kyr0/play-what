import PodUtils from "../models/pod/PodUtils";
import { INTERVAL_VALUES, NOTE_VALUES } from "./presets";

export const getPodTypePresets = (podType) => {
	if (podType === 'note') {
		return NOTE_VALUES;
	}
	else if (podType === 'interval') {
		return INTERVAL_VALUES;
	}
	return [];
}

export const findPodTypePreset = (value, podType) => {
	let data = []
	if (podType === 'note') {
		data = NOTE_VALUES;
	}
	else if (podType === 'interval') {
		data = INTERVAL_VALUES;
	}
	return data.find(d => PodUtils.areEqual(value, d.value)) || null;
}

export const getPreview = (value, podType, isList) => {
	if (podType === 'pod') {
		return JSON.stringify(value);
	}
	else if (isList) {
		return value.map(v => {
			const result = findPodTypePreset(v, podType);
			return result ? result.id : '?';
		}).join(', ');
	}
	else {
		const result = findPodTypePreset(value, podType);
		return result ? result.id : '?';
	}
}