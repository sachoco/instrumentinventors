// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from 'react';
import Stepper from './setup-wizard/Stepper';
import WizardFooter from './setup-wizard/WizardFooter';
import StepBlocks from './setup-wizard/StepBlocks';
import StepPlugins from './setup-wizard/StepPlugins';
import StepNewsletter from './setup-wizard/StepNewsletter';
import StepUpgrade from './setup-wizard/StepUpgrade';
import StepDone from './setup-wizard/StepDone';
import { RECOMMENDED_PLUGINS, BLOCK_CATEGORIES } from './setup-wizard/data';

function buildInitialBlockStatuses() {
	const blocks = window.ubSetupWizardData?.blocks ?? [];
	const map = {};
	blocks.forEach((b) => {
		map[b.name] = b.active !== false;
	});
	// Default all wizard-displayed blocks to true if not in saved option.
	BLOCK_CATEGORIES.flatMap((c) => c.blocks).forEach((b) => {
		if (!(b.name in map)) map[b.name] = true;
	});
	return map;
}

function buildInitialSelectedPlugins() {
	return RECOMMENDED_PLUGINS.filter((p) => p.defaultSelected).map(
		(p) => p.slug
	);
}

export default function SetupWizard() {
	const data = window.ubSetupWizardData ?? {};
	const logoUrl = data.logoUrl ?? '';
	const ajaxUrl = data.ajaxUrl ?? '/wp-admin/admin-ajax.php';
	const nonces = data.nonces ?? {};
	const fsData = data.freemius ?? {};
	// Support resuming at a specific step after a Freemius redirect.
	const initialStep = Number(data.initialStep ?? 1);

	const [step, setStep] = useState(initialStep);
	const [completedSteps, setCompletedSteps] = useState(() => {
		const done = new Set();
		for (let i = 1; i < initialStep; i++) done.add(i);
		return done;
	});

	const [loadingText, setLoadingText] = useState('');

	// Step 1 state
	const [blockStatuses, setBlockStatuses] = useState(
		buildInitialBlockStatuses
	);

	// Step 2 state
	const [selectedPlugins, setSelectedPlugins] = useState(
		buildInitialSelectedPlugins
	);
	const [pluginStatuses, setPluginStatuses] = useState({});
	const [installingPlugins, setInstallingPlugins] = useState(false);
	const [installedPlugins, setInstalledPlugins] = useState([]);

	const markDone = (stepId) =>
		setCompletedSteps((prev) => new Set([...prev, stepId]));

	// ── Navigation helpers ────────────────────────────────────────

	const saveBlockStatuses = useCallback(async () => {
		const formData = new FormData();
		formData.append('action', 'ub_wizard_toggle_blocks');
		formData.append('nonce', nonces.toggleBlocks ?? '');
		Object.entries(blockStatuses).forEach(([name, active]) => {
			formData.append(`blocks[${name}]`, active ? '1' : '0');
		});
		setLoadingText('Saving blocks...');
		await fetch(ajaxUrl, { method: 'POST', body: formData });
		setLoadingText('');
	}, [blockStatuses, ajaxUrl, nonces.toggleBlocks]);

	const installSelectedPlugins = useCallback(async () => {
		const toInstall = selectedPlugins;
		if (!toInstall.length) return;
		setInstallingPlugins(true);
		
		setLoadingText(`Installing ${toInstall.length} plugins...`);
		for (const slug of toInstall) {
			const formData = new FormData();
			formData.append('action', 'ub_wizard_install_plugin');
			formData.append('nonce', nonces.installPlugin ?? '');
			formData.append('plugin_slug', slug);
			try {
				setPluginStatuses((prev) => ({ ...prev, [slug]: 'installing' }));
				await fetch(ajaxUrl, { method: 'POST', body: formData });
				setPluginStatuses((prev) => ({ ...prev, [slug]: 'installed' }));
			} catch (_) {
				// Non-blocking – continue with next plugin
				setPluginStatuses((prev) => ({ ...prev, [slug]: 'error' }));
			}
		}
		setLoadingText('');
		setInstallingPlugins(false);
	}, [selectedPlugins, ajaxUrl, nonces.installPlugin]);

	/**
	 * Complete the Freemius opt-in via AJAX (server calls Freemius::opt_in()).
	 */
	const submitFreemiusOptin = useCallback(async () => {
		const formData = new FormData();
		formData.append('action', 'ub_wizard_fs_optin');
		formData.append('nonce', nonces.fsOptin ?? '');
		const response = await fetch(ajaxUrl, { method: 'POST', body: formData });
		const json = await response.json();
		if (!json.success) {
			const message =
				typeof json.data === 'string'
					? json.data
					: json.data?.message ?? 'Failed to connect.';
			throw new Error(message);
		}
	}, [ajaxUrl, nonces.fsOptin]);

	/**
	 * Skip the Freemius opt-in via AJAX (calls skip_connection() server-side).
	 */
	const skipFreemiusOptin = useCallback(async () => {
		const formData = new FormData();
		formData.append('action', 'ub_wizard_fs_skip');
		formData.append('nonce', nonces.fsSkip ?? '');
		await fetch(ajaxUrl, { method: 'POST', body: formData });
	}, [ajaxUrl, nonces.fsSkip]);

	const completeWizard = useCallback(async () => {
		const formData = new FormData();
		formData.append('action', 'ub_wizard_complete');
		formData.append('nonce', nonces.complete ?? '');
		await fetch(ajaxUrl, { method: 'POST', body: formData });
	}, [ajaxUrl, nonces.complete]);

	const handleNext = async () => {
		if (step === 1) {
			await saveBlockStatuses();
			markDone(1);
			setStep(2);
		} else if (step === 2) {
			await installSelectedPlugins();
			setInstalledPlugins(selectedPlugins);
			markDone(2);
			setStep(3);
		} else if (step === 3) {
			if (fsData.isConnected) {
				// Already opted in / skipped – advance without any Freemius call.
				markDone(3);
				setStep(4);
			} else {
				setLoadingText('Connecting...');
				try {
					await submitFreemiusOptin();
					markDone(3);
					setStep(4);
				} catch (_) {
					// Non-blocking – user can retry or skip.
				} finally {
					setLoadingText('');
				}
			}
		} else if (step === 4) {
			markDone(4);
			setStep(5);
			completeWizard();
		}
	};

	const handleFreemiusSkip = async () => {
		await skipFreemiusOptin();
		markDone(3);
		setStep(4);
	};

	const handlePrev = () => {
		if (step > 1) setStep(step - 1);
	};

	// ── Title / description per step ─────────────────────────────

	const stepMeta = {
		1: {
			title: 'Choose your blocks',
			subtitle:
				'Enable only the blocks you need. This keeps the editor clean and your site fast. You can adjust anytime in Settings.',
		},
		2: {
			title: 'Complete your toolkit',
			subtitle:
				'These free DotCamp plugins work seamlessly alongside Ultimate Blocks. Install what you need — or skip and add them later.',
		},
		3: { title: null, subtitle: null },
		4: { title: null, subtitle: null },
		5: { title: null, subtitle: null },
	};

	const { title, subtitle } = stepMeta[step];

	// ── Render ───────────────────────────────────────────────────

	return (
		<div className="ub-wiz">
			{/* Header */}
			<div className="ub-wiz-header">
				<div className="ub-wiz-header__logo">
					{logoUrl ? (
						<img src={logoUrl} alt="Ultimate Blocks" height="36" />
					) : (
						<span className="ub-wiz-header__logo-text">
							Ultimate Blocks
						</span>
					)}
					<span className="ub-wiz-header__product-name">
						Ultimate Blocks
					</span>
				</div>
				<Stepper current={step} completed={completedSteps} />
				<div className="ub-wiz-header__right" />
			</div>

			{/* Body */}
			<div className="ub-wiz-body">
				<div className="ub-wiz-body__inner">
					{title && (
						<div className="ub-wiz-step-header">
							<h2 className="ub-wiz-step-header__title">
								{title}
							</h2>
							{subtitle && (
								<p className="ub-wiz-step-header__subtitle">
									{subtitle}
								</p>
							)}
						</div>
					)}

					{step === 1 && (
						<StepBlocks
							blockStatuses={blockStatuses}
							onChange={setBlockStatuses}
						/>
					)}
					{step === 2 && (
						<StepPlugins
							selectedPlugins={selectedPlugins}
							onChange={setSelectedPlugins}
							pluginStatuses={pluginStatuses}
						/>
					)}
					{step === 3 && (
						<StepNewsletter
							onSkip={handleFreemiusSkip}
							onAllow={handleNext}
						/>
					)}
					{step === 4 && <StepUpgrade />}
					{step === 5 && (
						<StepDone installedPlugins={installedPlugins} />
					)}
				</div>
			</div>

			{/* Footer */}
			{step < 5 && (
				<WizardFooter
					loadingText={loadingText}
					showPrev={step > 1}
					onPrev={handlePrev}
					onNext={handleNext}
					nextLabel={
						step === 4
							? 'Finish →'
							: step === 3 && !fsData.isConnected
								? 'Allow & Continue →'
								: 'Next →'
					}
					extras={
						step === 3 && !fsData.isConnected ? (
							<button
								type="button"
								className="ub-wiz-skip-link"
								onClick={handleFreemiusSkip}
							>
								Skip for now
							</button>
						) : null
					}
					nextDisabled={installingPlugins}
				/>
			)}
		</div>
	);
}
