import React from "react";
import useEditContext from "../../../../other/EditContext";
import useOutputContext from "../../../../other/OutputContext";
import DropdownInput from "../../../../ui/DropdownInput/DropdownInput";
import { VIEWER_VALUES } from "../../../../viewers/viewers";
import Subpanel from "../Subpanel";

const ViewerBar = () => {
	const { viewerDef, setViewerDef } = useOutputContext();
	const { isEditing } = useEditContext();

	return (
		<div className='input-bar'>
			<div>Component</div>
			{isEditing ?
				<DropdownInput options={VIEWER_VALUES} value={viewerDef} setValue={setViewerDef} />
				: viewerDef.name}
		</div>
	);
};

const ViewerInputBar = () => {
	const { viewerProps, setViewerProps, inputs, viewerInput, setViewerInput, viewerDef } = useOutputContext();
	const { isEditing } = useEditContext();

	const setHelper = v => {
		if (v.value) {
			setViewerProps({
				...viewerProps,
				...v.value
			});
			setViewerInput(v);
		}
		else {
			setViewerProps({
				...viewerProps,
				pods: viewerDef.defaultProps.pods,
				podType: viewerDef.defaultProps.podType
			});
			setViewerInput(null);
		}
	};
	const unknown = { id: 'default', name: 'Default' };
	const selectedInput = viewerInput || unknown;
	const options = [unknown, ...inputs];

	return (
		<div className='input-bar'>
			<div>Input</div>
			{isEditing ?
				<DropdownInput options={options} value={selectedInput} setValue={setHelper} />
				: selectedInput.name}
		</div>
	);
};

const ViewerBox = () => {

	const { viewerDef, viewerProps } = useOutputContext()
	const ViewerComponent = viewerDef.component;
	const PanelComponent = viewerDef.panelComponent;

	return (
		<>
			<ViewerBar />
			<ViewerInputBar />
			{PanelComponent && <PanelComponent />}
			<div className="viewer-box">
				<ViewerComponent {...viewerProps} />
			</div>
		</>
	);
};


const ViewerSubpanel = () => {
	return (
		<Subpanel name="Viewer"  >
			<ViewerBox />
		</Subpanel>
	);
};

export default ViewerSubpanel;
