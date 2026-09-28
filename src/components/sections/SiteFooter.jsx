import React from 'react';
import { Gamepad2 } from 'lucide-react';

function SiteFooter({ brand, footer }) {
	return (
		<footer className="site-footer content-width">
			<a className="wordmark footer-wordmark" href="#top" aria-label={`${brand.name} ${brand.descriptor} home`}>
				<span className="wordmark-mark" aria-hidden="true"><Gamepad2 size={17} /></span>
				<span className="brand-copy"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
			</a>
			<p>{footer.note}</p>
			<a className="footer-top" href="#top">{footer.backToTop} ↑</a>
		</footer>
	);
}

export default SiteFooter;