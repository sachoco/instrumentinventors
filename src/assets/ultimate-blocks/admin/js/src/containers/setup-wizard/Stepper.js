// eslint-disable-next-line no-unused-vars
import React from 'react';
import { WIZARD_STEPS } from './data';

export default function Stepper({ current, completed }) {
	return (
		<div className="ub-wiz-stepper">
			{WIZARD_STEPS.map((step, index) => {
				const isDone = completed.has(step.id);
				const isActive = step.id === current;
				const stepClass = [
					'ub-wiz-stepper__step',
					isActive ? 'ub-wiz-stepper__step--active' : '',
					isDone ? 'ub-wiz-stepper__step--done' : '',
				]
					.filter(Boolean)
					.join(' ');

				return (
					<React.Fragment key={step.id}>
						{index > 0 && (
							<div
								className={`ub-wiz-stepper__line${isDone || completed.has(WIZARD_STEPS[index - 1].id) ? ' ub-wiz-stepper__line--done' : ''}`}
							/>
						)}
						<div className={stepClass}>
							<div className="ub-wiz-stepper__circle">
								{isDone ? (
									<svg
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
									>
										<path
											d="M2 6l3 3 5-5"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								) : (
									step.id
								)}
							</div>
							<span className="ub-wiz-stepper__label">
								{step.label}
							</span>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
}
