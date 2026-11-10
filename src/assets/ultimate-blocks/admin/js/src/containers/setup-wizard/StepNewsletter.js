// eslint-disable-next-line no-unused-vars
import React from 'react';

/**
 * Hidden form that POSTs to freemius.com for new-user opt-in.
 * Freemius processes the params and redirects back to the wizard at step 4.
 */
function FreemiusNewUserForm({ optInParams, formAction }) {
	return (
		<form
			id="ub-wiz-fs-new-user-form"
			method="post"
			action={formAction}
			style={{ display: 'none' }}
		>
			{Object.entries(optInParams).map(([name, value]) => (
				<input
					key={name}
					type="hidden"
					name={name}
					value={String(value)}
				/>
			))}
			<input
				type="hidden"
				name="is_extensions_tracking_allowed"
				value="1"
			/>
			<input
				type="hidden"
				name="is_diagnostic_tracking_allowed"
				value="1"
			/>
		</form>
	);
}

/**
 * Hidden form that POSTs to the local admin page for returning Freemius users.
 */
function FreemiusExistingUserForm({ formAction, actionName, nonce }) {
	return (
		<form
			id="ub-wiz-fs-existing-user-form"
			method="post"
			action={formAction}
			style={{ display: 'none' }}
		>
			<input type="hidden" name="fs_action" value={actionName} />
			<input type="hidden" name="_wpnonce" value={nonce} />
			<input
				type="hidden"
				name="is_extensions_tracking_allowed"
				value="1"
			/>
			<input
				type="hidden"
				name="is_diagnostic_tracking_allowed"
				value="1"
			/>
		</form>
	);
}

export default function StepNewsletter({ onSkip, onAllow }) {
	const fs = window.ubSetupWizardData?.freemius ?? {};

	const {
		isConnected = false,
		activateWithCurrentUser = false,
		activateExistingNonce = '',
		activateExistingAction = '',
		activateFormUrl = '',
		optInFormAction = '',
		optInParams = {},
	} = fs;

	return (
		<div className="ub-wiz-step-newsletter">
			<div className="ub-wiz-step-newsletter__icon">
				<svg
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="2"
						y="6"
						width="24"
						height="16"
						rx="2"
						stroke="#E11B4C"
						strokeWidth="1.8"
					/>
					<path
						d="M2 9l12 8 12-8"
						stroke="#E11B4C"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<h2 className="ub-wiz-step-newsletter__title">
				Never miss an important update
			</h2>
			<p className="ub-wiz-step-newsletter__subtitle">
				Opt in to get email notifications for security &amp; feature
				updates, educational content, and occasional offers, and to
				share some basic WordPress environment info. This will help us
				make the plugin more compatible with your site and better at
				doing what you need it to do.
			</p>

			{isConnected ? (
				<p className="ub-wiz-step-newsletter__already-connected">
					You&apos;re already connected. Click Next to continue.
				</p>
			) : (
				<>
					<p className="ub-wiz-step-newsletter__privacy">
						This will allow{' '}
						<strong>Ultimate Blocks</strong> to&nbsp;→&nbsp;
						<a
							href="https://freemius.com/privacy/"
							target="_blank"
							rel="noreferrer"
						>
							freemius.com
						</a>
					</p>

					{activateWithCurrentUser ? (
						<FreemiusExistingUserForm
							formAction={activateFormUrl}
							actionName={activateExistingAction}
							nonce={activateExistingNonce}
						/>
					) : (
						<FreemiusNewUserForm
							optInParams={optInParams}
							formAction={optInFormAction}
						/>
					)}
				</>
			)}
		</div>
	);
}
