// eslint-disable-next-line no-unused-vars
import React from 'react';
import Toggle from './Toggle';
import { BLOCK_CATEGORIES, PRO_BLOCKS } from './data';

export default function StepBlocks({ blockStatuses, onChange }) {
	const allNames = BLOCK_CATEGORIES.flatMap((c) =>
		c.blocks.map((b) => b.name)
	);
	const enabledCount = allNames.filter((n) => blockStatuses[n]).length;
	const total = allNames.length;

	const setAll = (status) => {
		const next = { ...blockStatuses };
		allNames.forEach((n) => (next[n] = status));
		onChange(next);
	};

	return (
		<div className="ub-wiz-step-blocks">
			<div className="ub-wiz-step-blocks__toolbar">
				<span className="ub-wiz-step-blocks__count">
					Enabled: <strong>{enabledCount}</strong> of {total}
				</span>
				<div className="ub-wiz-step-blocks__toolbar-actions">
					<button
						type="button"
						className="ub-wiz-btn ub-wiz-btn--outline"
						onClick={() => setAll(true)}
					>
						Select all
					</button>
					<button
						type="button"
						className="ub-wiz-btn ub-wiz-btn--outline"
						onClick={() => setAll(false)}
					>
						Deselect all
					</button>
				</div>
			</div>

			{BLOCK_CATEGORIES.map((cat) => (
				<div key={cat.id} className="ub-wiz-block-category">
					<div className="ub-wiz-block-category__label">
						{cat.label}
					</div>
					<div className="ub-wiz-block-category__grid">
						{cat.blocks.map((block) => (
							<div
								key={block.name}
								className="ub-wiz-block-card"
							>
								<span className="ub-wiz-block-card__name">
									{block.label}
								</span>
								<Toggle
									enabled={!!blockStatuses[block.name]}
									onChange={(val) =>
										onChange({
											...blockStatuses,
											[block.name]: val,
										})
									}
								/>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="ub-wiz-block-category">
				<div className="ub-wiz-block-category__label">Pro Blocks</div>
				<div className="ub-wiz-block-category__grid">
					{PRO_BLOCKS.map((block) => (
						<div
							key={block.name}
							className="ub-wiz-block-card ub-wiz-block-card--pro"
						>
							<span className="ub-wiz-block-card__name">
								{block.label}
							</span>
							<span className="ub-wiz-badge ub-wiz-badge--pro">
								PRO
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
