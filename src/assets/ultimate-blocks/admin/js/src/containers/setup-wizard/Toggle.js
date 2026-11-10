// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function Toggle({ enabled, onChange }) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={enabled}
			onClick={() => onChange(!enabled)}
			className={`ub-wiz-toggle${enabled ? ' ub-wiz-toggle--on' : ''}`}
		>
			<span className="ub-wiz-toggle__knob" />
		</button>
	);
}
