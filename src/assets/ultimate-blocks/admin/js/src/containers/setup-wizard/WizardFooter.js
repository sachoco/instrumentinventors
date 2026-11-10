// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function WizardFooter({
	onPrev,
	onNext,
	nextLabel = 'Next →',
	prevLabel = '← Previous',
	showPrev = true,
	nextDisabled = false,
	extras = null,
	loadingText = '',
}) {
	const isLoading = !!loadingText;

	return (
		<div className="ub-wiz-footer">
			<div className="ub-wiz-footer__left">
				{showPrev && !isLoading && (
					<button
						type="button"
						className="ub-wiz-btn ub-wiz-btn--ghost"
						onClick={onPrev}
					>
						{prevLabel}
					</button>
				)}
			</div>
			<div className="ub-wiz-footer__center">{extras}</div>
			<div className="ub-wiz-footer__right">
				<button
					type="button"
					className={`ub-wiz-btn ub-wiz-btn--primary${isLoading ? ' ub-wiz-btn--loading' : ''}`}
					onClick={onNext}
					disabled={nextDisabled || isLoading}
					aria-busy={isLoading}
				>
					{isLoading ? (
						<>
							<LoadingSpinner size={14} variant="light" />
							<span>{loadingText}</span>
						</>
					) : (
						nextLabel
					)}
				</button>
			</div>
		</div>
	);
}
