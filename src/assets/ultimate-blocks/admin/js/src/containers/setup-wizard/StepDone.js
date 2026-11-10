// eslint-disable-next-line no-unused-vars
import React from 'react';
import { RECOMMENDED_PLUGINS, OPTIONAL_PLUGINS, DONE_CARDS } from './data';

export default function StepDone({ installedPlugins }) {
	const settingsUrl =
		window.ubSetupWizardData?.settingsUrl ||
		'/wp-admin/admin.php?page=ultimate-blocks-settings';

	const installedNames = installedPlugins
		.map((slug) => {
			const all = [...RECOMMENDED_PLUGINS, ...OPTIONAL_PLUGINS];
			const found = all.find((p) => p.slug === slug);
			return found ? found.name : null;
		})
		.filter(Boolean);

	return (
		<div className="ub-wiz-step-done">
			<div className="ub-wiz-step-done__icon">
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7 16l7 7 11-11"
						stroke="#22C55E"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<h2 className="ub-wiz-step-done__title">You're ready to build.</h2>
			<p className="ub-wiz-step-done__subtitle">
				Ultimate Blocks is configured. Your selected plugins are
				installing in the background.
			</p>

			<div className="ub-wiz-step-done__cards">
				{DONE_CARDS.map((card) => (
					<div key={card.title} className="ub-wiz-done-card">
						<div className="ub-wiz-done-card__icon">
							{card.icon}
						</div>
						<h3 className="ub-wiz-done-card__title">
							{card.title}
						</h3>
						<p className="ub-wiz-done-card__desc">
							{card.description}
						</p>
						<a
							href={card.linkHref}
							className="ub-wiz-done-card__link"
						>
							{card.linkLabel}
						</a>
					</div>
				))}
			</div>

			{installedNames.length > 0 && (
				<div className="ub-wiz-step-done__status-bar">
					{installedNames.join(', ')}{' '}
					{installedNames.length > 1 ? 'are' : 'is'} installing. You
					can start using Ultimate Blocks now.
				</div>
			)}

			<div className="ub-wiz-step-done__cta">
				<a
					href={settingsUrl}
					className="ub-wiz-btn ub-wiz-btn--primary"
				>
					Go to Ultimate Blocks Settings
				</a>
			</div>
		</div>
	);
}
