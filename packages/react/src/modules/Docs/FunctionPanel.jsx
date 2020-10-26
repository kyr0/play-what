import React, { useEffect, useState } from "react";
import "./Docs.css";
import ModelPanel from "./ModelPanel";

const getProps = propDefs => propDefs.reduce((prev, cur, i) => {
	return {
		...prev,
		[cur.name]: cur.value
	};
}, {});

const FunctionPanel = ({ fnDef }) => {

	const fnProps = getProps(fnDef.propDefs);
	const fnResult = fnDef.fn(fnProps);

	console.log('dpb - fn', fnDef, fnProps, fnResult)

	if (!fnProps || !fnResult) return null;

	return (
		<>
			{
				fnDef.propDefs.map((v, i) => {
					const setProp = p => setFnProps({ ...fnProps, [v.name]: p });
					return (
						<ModelPanel
							key={i}
							label={v.name}
							modelType={v.modelType}
							podType={v.podType}
							theoryType={v.theoryType}
							value={fnProps[v.name]}
							setValue={setProp}
						/>
					);
				})
			}
			<ModelPanel
				label={fnDef.outDef.name}
				modelType={fnDef.outDef.modelType}
				podType={fnDef.outDef.podType}
				theoryType={fnDef.outDef.theoryType}
				value={fnResult.notes || fnResult}
				setValue={null}
			/>
		</>
	);
}

export default FunctionPanel;