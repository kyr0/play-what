import React, { useState } from "react";
import './Docs.css';
import Fold from './Fold';
import ModelRow from './ModelRow';

const max = [12, 7];

export const GenericFunctionDocs = ({ config, level }) => {
	const { id, name, fn, props: propsIn, propDefs, outDef } = config;

	const [props, setProps] = useState(propsIn);
	const setProp = (pName, pValue) => {
		const newProps = {
			...props,
			[pName]: pValue
		}
		setProps(newProps);
	};

	const out = fn(props);

	return (
		<Fold label={name} level={level}>
			<div className="card">
				{propDefs.map((p, i) => {
					const { name, modelType, podType } = p;
					const value = props[name];
					const setValue = v => setProp(name, v);
					return <ModelRow key={i} value={value} setValue={setValue} max={max} label={name} modelType={modelType} podType={podType} />;
				})}
			</div>
			<div className="card">
				<ModelRow value={out} max={max} label={outDef.name} modelType={outDef.modelType} podType={outDef.podType} />
			</div>
		</Fold>
	);
}

export const GenericSubmoduleDocs = ({ config, level }) => {
	const { id, name, functions } = config;
	return (
		<Fold label={config.name} level={level}>
			{functions.map((c, i) => {
				return <GenericFunctionDocs config={c} key={i} level={level + 1}/>;
			})}
		</Fold>
	);
}

export const GenericModuleDocs = ({ config, level }) => {
	const { id, name, submodules } = config;
	return (
		<Fold label={config.name} level={level}>
			{submodules.map((c, i) => {
				return <GenericSubmoduleDocs config={c} key={i} level={level + 1}/>;
			})}
		</Fold>
	);
}