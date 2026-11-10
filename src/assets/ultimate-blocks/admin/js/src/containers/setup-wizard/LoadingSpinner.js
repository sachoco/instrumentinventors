// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function LoadingSpinner({
	size = 16,
	variant = 'default',
	className = '',
}) {
	return (
		<span
			className={`ub-wiz-spinner ub-wiz-spinner--${variant}${className ? ` ${className}` : ''}`}
			style={{ width: size, height: size }}
			role="status"
			aria-hidden="true"
		/>
	);
}
