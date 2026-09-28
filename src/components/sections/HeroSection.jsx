import React from 'react';
import { ArrowDownRight, Heart, Sparkles } from 'lucide-react';
import TypewriterText from '../TypewriterText.jsx';

function HeroSection({ hero, RevealSection }) {
	return (
		<RevealSection className="hero content-width" aria-labelledby="hero-title">
			<div className="hero-copy reveal-item reveal-delay-one">
				<h1 id="hero-title">{hero.headlineStart}<br /><TypewriterText text={hero.headlineMiddle} />{' '}<TypewriterText phrases={hero.headlineWords} className="hero-word-gradient" /></h1>
				<p className="hero-description">{hero.description}</p>
				<div className="hero-actions">
					<a className="button button-primary" href="#work">{hero.action} <ArrowDownRight size={16} /></a>
					<span className="hero-note"><Heart size={14} /> {hero.note}</span>
				</div>
			</div>
			<div className="hero-art reveal-item reveal-delay-two" aria-hidden="true">
				<div className="hero-world">
					<span className="world-sun" />
					<span className="world-cloud world-cloud-one" />
					<span className="world-cloud world-cloud-two" />
					<span className="world-hill world-hill-back" />
					<span className="world-hill world-hill-front" />
					<span className="world-location">{hero.worldLabel}</span>
					<div className="avatar-tile"><span className="avatar-hair" /><span className="avatar-face"><i /><i /><b /></span><span className="avatar-body" /></div>
					<span className="world-prompt"><b>E</b> {hero.prompt}</span>
				</div>
				<div className="hero-toast"><span className="toast-icon"><Sparkles size={17} /></span><span><strong>{hero.toastTitle}</strong><small>{hero.toastBody}</small></span><span className="toast-check">+</span></div>
				<div className="hero-label"><span>{hero.studioLabel}</span><strong>UI made for play</strong></div>
				<div className="art-caption"><span>01</span> {hero.artCaption}</div>
			</div>
		</RevealSection>
	);
}

export default HeroSection;