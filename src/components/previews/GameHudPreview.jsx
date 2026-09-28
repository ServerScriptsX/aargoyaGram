import React, { useEffect, useRef, useState } from 'react';
import { Backpack, BookOpen, Check, Gift, Medal, Settings, ShoppingCart, Trophy, Twitter, X } from 'lucide-react';

const menuIcons = { store: ShoppingCart, index: BookOpen, inventory: Backpack, rewards: Gift, codes: Twitter, settings: Settings };

function GameHudPreview({ data }) {
	const [activeSlot, setActiveSlot] = useState(data.slots[0]);
	const [activeMenu, setActiveMenu] = useState(null);
	const [code, setCode] = useState('');
	const [codeMessage, setCodeMessage] = useState('');
	const [codeClaimed, setCodeClaimed] = useState(false);
	const [settings, setSettings] = useState({ music: true, effects: true });

	function openMenu(menu) {
		setCodeMessage('');
		setActiveMenu(menu);
	}

	function redeemCode(event) {
		event.preventDefault();
		if (code.trim().toUpperCase() !== data.correctCode || codeClaimed) {
			setCodeMessage(data.codeFailure);
			return;
		}
		setCodeClaimed(true);
		setCodeMessage(data.codeSuccess);
	}

	return (
		<div className="mock-window game-hud-window">
			<div className="hud-backdrop" aria-hidden="true"><span className="hud-backdrop-glow" /><span className="hud-starfield" /></div>
			<div className="hud-boss-bar">
				<strong>{data.bossName}</strong>
				<span>{data.bossHealthText}</span>
				<div className="boss-health-track"><i style={{ width: `${data.bossHealth}%` }} /></div>
			</div>
			<div className="hud-currency-list">
				<div className="hud-currency hud-trophy"><Trophy size={13} /><strong>{data.trophies}</strong></div>
				<div className="hud-currency hud-medal"><Medal size={13} /><strong>{data.medals}</strong></div>
				<div className="hud-menu-group">
					{data.menus.slice(0, 4).map((menu) => <HudMenuButton key={menu.id} menu={menu} onClick={() => openMenu(menu)} />)}
				</div>
			</div>
			<div className="hud-right-menu">
				{data.menus.slice(4).map((menu) => <HudMenuButton key={menu.id} menu={menu} onClick={() => openMenu(menu)} />)}
			</div>
			<div className="hud-avatar" aria-hidden="true"><span className="hud-avatar-head" /><span className="hud-avatar-body" /><span className="hud-avatar-leg" /></div>
			<div className="hud-xp-labels"><strong>Lv {data.level}</strong><span>{data.xp}</span><strong>Lv {data.nextLevel}</strong></div>
			<div className="hud-xp-track"><i /></div>
			<div className="hud-hotbar" role="group" aria-label="Action hotbar">
				{data.slots.map((slot, index) => <button className={`hud-hotbar-slot${activeSlot.id === slot.id ? ' is-active' : ''}`} type="button" key={slot.id} onClick={() => setActiveSlot(slot)} aria-label={`Select ${slot.label}`} aria-pressed={activeSlot.id === slot.id}><span>{slot.symbol}</span><kbd>{index + 1}</kbd></button>)}
			</div>
			<div className="hud-selected-action" aria-live="polite"><span>SELECTED</span> {activeSlot.label}</div>
			{activeMenu && <HudMenuPanel menu={activeMenu} data={data} code={code} codeMessage={codeMessage} codeClaimed={codeClaimed} settings={settings} onClose={() => setActiveMenu(null)} onCodeChange={setCode} onRedeem={redeemCode} onSettingChange={(key) => setSettings((current) => ({ ...current, [key]: !current[key] }))} />}
		</div>
	);
}

function HudMenuButton({ menu, onClick }) {
	const Icon = menuIcons[menu.icon];
	return <button className={`hud-menu-button hud-menu-${menu.id}`} type="button" onClick={onClick} aria-label={`Open ${menu.label}`}><Icon size={16} /><span>{menu.label}</span></button>;
}

function HudMenuPanel({ menu, data, code, codeMessage, codeClaimed, settings, onClose, onCodeChange, onRedeem, onSettingChange }) {
	const Icon = menuIcons[menu.icon];
	const panelRef = useRef(null);
	const closeRef = useRef(onClose);
	closeRef.current = onClose;

	useEffect(() => {
		const panel = panelRef.current;
		if (!panel) return undefined;

		const previousFocus = document.activeElement;
		const initialFocus = menu.id === 'codes' ? panel.querySelector('input') : panel.querySelector('button');
		initialFocus?.focus();

		function handleKeyDown(event) {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeRef.current();
				return;
			}
			if (event.key !== 'Tab') return;

			const focusable = [...panel.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			previousFocus?.focus?.();
		};
	}, [menu.id]);

	return (
		<div className="hud-panel-backdrop" role="presentation" onClick={onClose}>
			<section ref={panelRef} className="hud-menu-panel" role="dialog" aria-modal="true" aria-label={`${menu.label} menu`} onClick={(event) => event.stopPropagation()}>
				<header><span><Icon size={14} />{menu.label}</span><button type="button" onClick={onClose} aria-label={`Close ${menu.label}`}><X size={14} /></button></header>
				{menu.id === 'codes' ? (
					<form className="hud-code-form" onSubmit={onRedeem}>
						<label htmlFor="hud-code">{data.codeLabel}</label>
						<div><input id="hud-code" value={code} onChange={(event) => onCodeChange(event.target.value)} placeholder={data.codePlaceholder} /><button type="submit" disabled={codeClaimed}>{codeClaimed ? <Check size={13} /> : data.redeemLabel}</button></div>
						<p aria-live="polite">{codeMessage || `Try ${data.codeHint}`}</p>
					</form>
				) : menu.id === 'settings' ? (
					<div className="hud-mini-settings">{Object.entries(settings).map(([key, value]) => <button type="button" key={key} aria-pressed={value} onClick={() => onSettingChange(key)}><span>{key === 'music' ? 'Music' : 'Effects'}</span><strong>{value ? 'On' : 'Off'}</strong></button>)}</div>
				) : (
					<div className="hud-menu-summary"><span className="hud-menu-summary-icon"><Icon size={22} /></span><strong>{menu.label} is ready</strong><p>Pick an option and get back to the adventure.</p><button type="button" onClick={onClose}>Back to game</button></div>
				)}
			</section>
		</div>
	);
}

export default GameHudPreview;