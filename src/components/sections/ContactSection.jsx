import React from 'react';
import { ArrowUpRight, MousePointer2 } from 'lucide-react';

function ContactSection({ contact, RevealSection }) {
	return (
		<RevealSection className="contact-section content-width" id="contact" aria-labelledby="contact-title">
			<div className="contact-mark reveal-item reveal-delay-one"><MousePointer2 size={19} /></div>
			<div className="contact-copy reveal-item reveal-delay-two">
				<p className="eyebrow">{contact.eyebrow}</p>
				<h2 id="contact-title">{contact.heading}<br /><span>{contact.headingAccent}</span></h2>
				<p>{contact.description}</p>
			</div>
			<a className="button button-light reveal-item reveal-delay-three" href={`mailto:${contact.email}?subject=Roblox%20UI%20project`}>{contact.action} <ArrowUpRight size={16} /></a>
		</RevealSection>
	);
}

export default ContactSection;