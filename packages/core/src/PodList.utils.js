import { INTERVAL_VALUES, NOTE_VALUES } from './Pod.presets';
import CoreUtils from './Core.utils';
import PodUtils from './Pod.utils';

const MAX = [12, 7];
const DEFAULT_POD = [0, 0];

class PodListUtils {

	static areEqual(A, B) {
		if (!A || !B || A.length !== B.length) return false;
		for (let i = 0; i < A.length; i++) {
			const a = A[i];
			const b = B[i];
			if (!PodUtils.areEqual(a, b)) return false;
		}
		return true;
	}

	static reduce(A, max = MAX) {
		return A.map((a) => PodUtils.reduce(a, max));
	}

	static findPodWithPitch(A, p) {
		return A.find((n) => n[0] === p) || null;
	};

	static findIndexOfPodWithPitch(A, p, options) {
		return A.findIndex((n) => n[0] === p);
	};

	static getPreview(pods, options = {}) {
		if (!pods || !pods.length) return '';
		return pods.map(v => PodUtils.getName(v, options)).join(', ');
	}

}

export default PodListUtils;
