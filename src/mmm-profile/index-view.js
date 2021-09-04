import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
import ViewProfileApp from './ViewProfileApp';


// document.addEventListener('DOMContentLoaded', () => {
	const entry = document.querySelector('#root');
	render(<ViewProfileApp />, entry);

	// render(<BrowserRouter basename={'/member'}><ViewProfileApp /></BrowserRouter>, entry);
// });
