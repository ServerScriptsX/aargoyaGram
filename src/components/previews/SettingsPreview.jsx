import React, { useState } from 'react';
import { RotateCcw, SlidersHorizontal, X } from 'lucide-react';

function SettingsPreview({ data }) {
	const [settings, setSettings] = useState(data.defaults);
	const [displayName, setDisplayName] = useState(data.defaultName);
	const [isOpen, setIsOpen] = useState(true);
	const [message, setMessage] = useState(data.defaultMessage);

	function updateSetting(key, value) {
		setSettings((current) => ({ ...current, [key]: value }));
		setMessage(data.changedLabel);
	}

	function cycleQuality(key, direction) {
		const currentIndex = data.qualityOptions.indexOf(settings[key]);
		const nextIndex = (currentIndex + direction + data.qualityOptions.length) % data.qualityOptions.length;
		updateSetting(key, data.qualityOptions[nextIndex]);
	}

	function resetSettings() {
		setSettings(data.defaults);
		setDisplayName(data.defaultName);
		setMessage(data.resetMessage);
	}

	if (!isOpen) {
		return (
			<div className="mock-window settings-window settings-closed">
				<span className="settings-closed-icon"><SlidersHorizontal size={24} /></span>
				<strong>{data.closedLabel}</strong>
				<button className="settings-reopen" type="button" onClick={() => setIsOpen(true)}>{data.reopenLabel}</button>
			</div>
		);
	}

	return (
		<div className="mock-window settings-window">
			<div className="settings-header">
				<h4>{data.title}</h4>
				<button className="settings-close" type="button" onClick={() => setIsOpen(false)} aria-label={data.closeLabel}><X size={14} /></button>
			</div>
			<div className="settings-list">
				<div className="settings-row">
					<label className="settings-label" htmlFor="preview-music"><strong>{data.musicLabel}</strong><small>{data.musicHint}</small></label>
					<div className="settings-control music-control"><input id="preview-music" aria-label={data.musicLabel} type="range" min="0" max="10" value={settings.music} onChange={(event) => updateSetting('music', Number(event.target.value))} /><output htmlFor="preview-music">{settings.music}</output></div>
				</div>
				<SettingToggle label={data.fastModeLabel} hint={data.fastModeHint} value={settings.fastMode} onChange={() => updateSetting('fastMode', !settings.fastMode)} />
				<SettingToggle label={data.petVisibilityLabel} hint={data.petVisibilityHint} value={settings.petVisibility} onChange={() => updateSetting('petVisibility', !settings.petVisibility)} />
				<div className="settings-row">
					<label className="settings-label" htmlFor="preview-name"><strong>{data.nameLabel}</strong><small>{data.nameHint}</small></label>
					<div className="settings-control name-control">
						<button type="button" className="settings-icon-button" onClick={() => { setDisplayName(data.defaultName); setMessage(data.changedLabel); }} aria-label="Reset display name"><RotateCcw size={12} /></button>
						<input id="preview-name" aria-label={data.nameLabel} maxLength="14" value={displayName} onChange={(event) => { setDisplayName(event.target.value); setMessage(data.changedLabel); }} />
					</div>
				</div>
				<SettingQuality label={data.graphicsLabel} value={settings.graphics} onChange={(direction) => cycleQuality('graphics', direction)} />
				<SettingQuality label={data.effectsLabel} value={settings.effects} onChange={(direction) => cycleQuality('effects', direction)} />
			</div>
			<div className="settings-footer">
				<span className="settings-message" aria-live="polite">{message}</span>
				<button className="settings-reset" type="button" onClick={resetSettings}>{data.resetLabel}</button>
			</div>
		</div>
	);
}

function SettingToggle({ label, hint, value, onChange }) {
	return (
		<div className="settings-row">
			<div className="settings-label"><strong>{label}</strong><small>{hint}</small></div>
			<button className={`settings-toggle${value ? ' is-on' : ''}`} type="button" onClick={onChange} aria-pressed={value} aria-label={`${label}: ${value ? 'On' : 'Off'}`}>
				<span aria-hidden="true">‹</span><strong>{value ? 'On' : 'Off'}</strong><span aria-hidden="true">›</span>
			</button>
		</div>
	);
}

function SettingQuality({ label, value, onChange }) {
	return (
		<div className="settings-row quality-row">
			<div className="settings-label"><strong>{label}</strong><small>Adjust visual detail</small></div>
			<div className="quality-control">
				<button type="button" onClick={() => onChange(-1)} aria-label={`Lower ${label}`}>‹</button>
				<strong aria-live="polite">{value}</strong>
				<button type="button" onClick={() => onChange(1)} aria-label={`Raise ${label}`}>›</button>
			</div>
		</div>
	);
}

export default SettingsPreview;