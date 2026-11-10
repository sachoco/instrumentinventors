// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from '@wordpress/element';
import SetupWizard from './containers/SetupWizard';
import '$Styles/setup-wizard.scss';

const mountPoint = document.querySelector('#ub-setup-wizard');

if (mountPoint) {
	// Remove WP admin chrome padding so the wizard fills the viewport.
	const wpContent = document.querySelector('#wpcontent');
	const wpBody = document.querySelector('#wpbody');
	const adminBar = document.querySelector('#wpadminbar');

	if (wpBody) {
		const adminBarHeight = adminBar ? adminBar.offsetHeight : 0;
		wpBody.style.height = `calc(100vh - ${adminBarHeight}px)`;
		wpContent.style.padding = '0';
		wpContent.style.marginLeft = '0';
	}

	// Hide the sidebar for a clean full-screen experience.
	const adminMenu = document.querySelector('#adminmenuwrap');
	const adminMenuBack = document.querySelector('#adminmenuback');
	if (adminMenu) adminMenu.style.display = 'none';
	if (adminMenuBack) adminMenuBack.style.display = 'none';

	const root = createRoot(mountPoint);
	root.render(<SetupWizard />);
}
