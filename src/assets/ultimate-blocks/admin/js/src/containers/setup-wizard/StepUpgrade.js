// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BUNDLE_PLUGINS, LIFETIME_BENEFITS } from './data';

export default function StepUpgrade() {
	const upgradeUrl = 'https://ultimateblocks.com/wp-block-suite/';

	return (
		<div className="ub-wiz-step-upgrade">
			<h1 className="ub-wiz-step-upgrade__title">
				WP Block Suite – <span>Lifetime</span> Bundle
			</h1>
			<p className="ub-wiz-step-upgrade__subtitle">
				Everything you need to build world-class Gutenberg websites — in
				one powerful suite.
			</p>

			<div className="ub-wiz-step-upgrade__grid">
				{BUNDLE_PLUGINS.map((p) => (
					<div key={p.name} className="ub-wiz-upgrade-plugin-card">
						<div
							className="ub-wiz-upgrade-plugin-card__logo"
						>
							<img src={p.logo} alt={p.name} />
						</div>
						<strong>{p.name}</strong>
						<span>Unlimited Sites</span>
						<p>{p.tagline}</p>
					</div>
				))}

				<div className="ub-wiz-upgrade-price-card">
					<div className="ub-wiz-upgrade-price-card__label">
						Special Discounted Price
					</div>
					<div className="ub-wiz-upgrade-price-card__price">
						$299
					</div>
					<div className="ub-wiz-upgrade-price-card__regular">
						Regular Price: $896
					</div>
					<div className="ub-wiz-upgrade-price-card__saving">
						(You Save 67%)
					</div>
				</div>
			</div>

			<div className="ub-wiz-step-upgrade__benefits">
				<div className="ub-wiz-step-upgrade__benefits-title">
					Lifetime Benefits
				</div>
				<div className="ub-wiz-step-upgrade__benefits-grid">
					{LIFETIME_BENEFITS.map((b) => (
						<div
							key={b}
							className="ub-wiz-step-upgrade__benefit-item"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
							>
								<circle cx="9" cy="9" r="9" fill="#22C55E" />
								<path
									d="M5 9l3 3 5-5"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>{b}</span>
						</div>
					))}
				</div>
				<a
					href={upgradeUrl}
					target="_blank"
					rel="noreferrer"
					className="ub-wiz-btn ub-wiz-btn--upgrade"
				>
					Get WP Block Suite – Lifetime Access
				</a>
			</div>

			<p className="ub-wiz-step-upgrade__testimonial">
				<em>
					"From what I've seen so far, this bundle is one of the most
					noteworthy deals in WP land right now. Keep up the good
					work!"
				</em>
				<br />
				<strong>– Kostas Farkonas (WP Block Suite User)</strong>
			</p>
		</div>
	);
}
