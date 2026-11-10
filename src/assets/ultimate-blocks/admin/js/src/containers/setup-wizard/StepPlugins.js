// eslint-disable-next-line no-unused-vars
import React from 'react';
import { RECOMMENDED_PLUGINS, OPTIONAL_PLUGINS } from './data';
import LoadingSpinner from './LoadingSpinner';

function PluginCard({ plugin, selected, onToggle, status }) {
	const isInstalling = status === 'installing';
	const isInstalled = status === 'installed';
	const isError = status === 'error';
	const isBusy = isInstalling;

	const handleToggle = () => {
		if (isBusy) return;
		onToggle();
	};

	const showCheck =
		!isInstalling && !isError && (isInstalled || selected);

	return (
		<div
			className={`ub-wiz-plugin-card${selected ? ' ub-wiz-plugin-card--selected' : ''}${isInstalling ? ' ub-wiz-plugin-card--installing' : ''}${isInstalled ? ' ub-wiz-plugin-card--installed' : ''}${isError ? ' ub-wiz-plugin-card--error' : ''}`}
			onClick={handleToggle}
			role="checkbox"
			aria-checked={selected}
			aria-busy={isInstalling}
			tabIndex={isBusy ? -1 : 0}
			onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
		>
			<div className="ub-wiz-plugin-card__check">
				{isInstalling && <LoadingSpinner size={14} />}
				{showCheck && (
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M2 7l4 4 6-6"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
				{isError && !isInstalling && (
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M4 4l6 6M10 4l-6 6"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				)}
			</div>
			<div className="ub-wiz-plugin-card__content">
				<div className="ub-wiz-plugin-card__title">
					<strong>{plugin.name}</strong>
					<span className={`ub-wiz-badge ${plugin.badgeClass}`}>
						{plugin.badge}
					</span>
				</div>
				<p className="ub-wiz-plugin-card__desc">{plugin.description}</p>
			</div>
		</div>
	);
}

export default function StepPlugins({ selectedPlugins, onChange, pluginStatuses }) {
	const toggle = (slug) => {
		const next = selectedPlugins.includes(slug)
			? selectedPlugins.filter((s) => s !== slug)
			: [...selectedPlugins, slug];
		onChange(next);
	};

	return (
		<div className="ub-wiz-step-plugins">
			<div className="ub-wiz-step-plugins__section-label">
				Recommended — Selected by default
			</div>
			<div className="ub-wiz-step-plugins__grid ub-wiz-step-plugins__grid--recommended">
				{RECOMMENDED_PLUGINS.map((p) => (
					<PluginCard
						key={p.slug}
						plugin={p}
						selected={selectedPlugins.includes(p.slug)}
						onToggle={() => toggle(p.slug)}
						status={pluginStatuses[p.slug]}
					/>
				))}
			</div>

			<div className="ub-wiz-step-plugins__section-label">
				Optional — Marketing & Engagement
			</div>
			<div className="ub-wiz-step-plugins__grid">
				{OPTIONAL_PLUGINS.map((p) => (
					<PluginCard
						key={p.slug}
						plugin={p}
						selected={selectedPlugins.includes(p.slug)}
						onToggle={() => toggle(p.slug)}
						status={pluginStatuses[p.slug]}
					/>
				))}
			</div>

			<p className="ub-wiz-step-plugins__footnote">
				All free. No account required. Remove anytime from Plugins →
				Installed Plugins.
			</p>
		</div>
	);
}
