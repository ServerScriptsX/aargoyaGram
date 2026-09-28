import React, { useEffect, useRef, useState } from 'react';
import useReducedMotionSafe from '../lib/useReducedMotionSafe.js';

function RevealSection({ as: Element = 'section', className = '', children, ...props }) {
	const sectionRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const prefersReducedMotion = useReducedMotionSafe();

	useEffect(() => {
		const section = sectionRef.current;
		if (prefersReducedMotion || !section || !('IntersectionObserver' in window)) {
			setIsVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(section);
			}
		}, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

		observer.observe(section);
		return () => observer.disconnect();
	}, [prefersReducedMotion]);

	return (
		<Element ref={sectionRef} className={`reveal-section${isVisible ? ' is-visible' : ''} ${className}`.trim()} {...props}>
			{children}
		</Element>
	);
}

export default RevealSection;