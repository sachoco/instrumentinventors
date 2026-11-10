import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { desktop, mobile } from "@wordpress/icons";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";

/**
 * Tablet icon SVG
 * Fallback icon for older WordPress versions that don't have the tablet icon
 */
const tabletIcon = (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6ZM6 6H18V18H6V6Z"
			fill="currentColor"
		/>
		<circle cx="12" cy="16" r="1" fill="currentColor" />
	</svg>
);

/**
 * DeviceControlSwitcher Component
 *
 * A reusable component for switching between device preview modes (Desktop, Tablet, Mobile)
 * Syncs with WordPress Gutenberg's device preview functionality
 *
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Callback function when device changes (optional)
 * @param {string} props.label - Label text above the device buttons (optional)
 * @param {Object} props.style - Custom styles for the container (optional)
 * @param {string} props.textDomain - Text domain for translations (default: "ultimate-blocks")
 *
 * @returns {JSX.Element} Device control switcher UI
 *
 * @example
 * // Basic usage
 * <DeviceControlSwitcher />
 *
 * @example
 * // With custom label and onChange handler
 * <DeviceControlSwitcher
 *   label="Responsive Controls"
 *   onChange={(device) => console.log('Device changed to:', device)}
 * />
 */
function DeviceControlSwitcher({
	onChange = null,
	label = null,
	style = {},
	textDomain = "ultimate-blocks",
}) {
	const [selectedDevice, setSelectedDevice] = useState("desktop");
	// Get device type from Gutenberg's responsive preview
	const { deviceType } = useSelect((select) => {
		const { getDeviceType } = select(editorStore);
		return {
			deviceType: getDeviceType ? getDeviceType() : "Desktop",
		};
	}, []);

	// Sync with Gutenberg preview
	useEffect(() => {
		if (deviceType) {
			const device = deviceType.toLowerCase();
			setSelectedDevice(device);

			// Trigger onChange callback if provided
			if (onChange) {
				onChange(device);
			}
		}
	}, [deviceType, onChange]);

	// Dispatch to change device type in Gutenberg
	const { setDeviceType } = useDispatch(editorStore);

	/**
	 * Handle device change
	 * @param {string} device - Device name (Desktop, Tablet, Mobile)
	 */
	const handleDeviceChange = (device) => {
		setDeviceType(device);

		// Trigger onChange callback if provided
		if (onChange) {
			onChange(deviceLower);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: "12px",
				...style,
			}}
		>
			{label && (
				<label
					style={{
						fontSize: "11px",
						fontWeight: "500",
						textTransform: "uppercase",
						color: "#1e1e1e",
					}}
				>
					{label}
				</label>
			)}
			<div style={{ display: "flex", gap: "4px" }}>
				<Button
					icon={desktop}
					isPressed={selectedDevice === "desktop"}
					onClick={() => handleDeviceChange("Desktop")}
					label={__("Desktop", textDomain)}
					size="small"
				/>
				<Button
					icon={tabletIcon}
					isPressed={selectedDevice === "tablet"}
					onClick={() => handleDeviceChange("Tablet")}
					label={__("Tablet", textDomain)}
					size="small"
				/>
				<Button
					icon={mobile}
					isPressed={selectedDevice === "mobile"}
					onClick={() => handleDeviceChange("Mobile")}
					label={__("Mobile", textDomain)}
					size="small"
				/>
			</div>
		</div>
	);
}

export default DeviceControlSwitcher;
