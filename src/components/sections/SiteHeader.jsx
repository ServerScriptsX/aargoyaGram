import React from 'react';
import { ArrowUpRight, Gamepad2 } from 'lucide-react';

function SiteHeader({ brand, navigation }) {
	return (
		<header className="site-header">
			<a className="wordmark" href="#top" aria-label={`${brand.name} ${brand.descriptor} home`}>
				<span className="wordmark-mark" aria-hidden="true"><Gamepad2 size={19} /></span>
				<span className="brand-copy"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
			</a>
			<nav className="main-nav" aria-label="Main navigation">
				{navigation.map((item, index) => (
					<a className={index === navigation.length - 1 ? 'nav-contact' : undefined} href={item.href} key={item.href}>
						{item.label}{index === navigation.length - 1 && <ArrowUpRight size={14} />}
					</a>
				))}
			</nav>
		</header>
	);
}

export default SiteHeader;