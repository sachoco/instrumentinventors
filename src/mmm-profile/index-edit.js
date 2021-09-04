import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
import EditProfileApp from './EditProfileApp';


// document.addEventListener('DOMContentLoaded', () => {
	const entry = document.querySelector('#root');
	render(<EditProfileApp />, entry);

	// render(<BrowserRouter basename={'/member'}><ViewProfileApp /></BrowserRouter>, entry);
// });
