import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
import DashboardApp from './DashboardApp';


// document.addEventListener('DOMContentLoaded', () => {
	const entry = document.querySelector('#root');
	render(<DashboardApp />, entry);

	// render(<BrowserRouter basename={'/member'}><ViewProfileApp /></BrowserRouter>, entry);
// });
