import React, { useState } from "react";
import usePodContext from "../../../other/PodContext";
import ButtonInput from "../../../ui/ButtonInput/ButtonInput";
import DropdownInput from "../../../ui/DropdownInput/DropdownInput";
import EditDash from '../../EditDash';
import Value from "./Value";

const ValueSubpanel = () => {
	const podContext = usePodContext();
	const { value, setValue } = podContext;

	const [isEditing, setIsEditing] = useState(false);
	const [isLoadingPreset, setIsLoadingPreset] = useState(false);

	return (
		<div className='subpanel'>
			<EditDash name="Value" isEditing={isEditing} setIsEditing={setIsEditing} />
			<Value isEditing={isEditing} />
			{isEditing && (
				<div className='preset-box' >
					<ButtonInput onClick={() => setIsLoadingPreset(!isLoadingPreset)}>Load Preset</ButtonInput>
				</div>
			)}
			{isLoadingPreset && (
				<div>
					<DropdownInput
						options={getPresetOptions()}
						value={value}
						setValue={v => setValue(v.value)}
					/>
				</div>
			)}
		</div>
	);
};

export default ValueSubpanel;
