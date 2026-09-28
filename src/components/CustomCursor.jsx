import React, { useEffect, useRef } from 'react';
import { MousePointer2 } from 'lucide-react';
import useReducedMotionSafe from '../lib/useReducedMotionSafe.js';

function CustomCursor() {
	const cursorRef = useRef(null);
	const animationFrame = useRef(0);
	const prefersReducedMotion = useReducedMotionSafe();

	useEffect(() => {
		const cursor = cursorRef.current;
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		if (!cursor || prefersReducedMotion) return undefined;

		const moveCursor = (event) => {
			if (!finePointer.matches) return;
			window.cancelAnimationFrame(animationFrame.current);
			animationFrame.current = window.requestAnimationFrame(() => {
				cursor.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 3}px, 0)`;
				cursor.classList.toggle('is-preview', Boolean(event.target.closest('.preview-stage')));
				cursor.classList.add('is-visible');
			});
		};
		const updateTarget = (event) => {
			cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, [role="button"]')));
		};
		const hideCursor = () => cursor.classList.remove('is-visible');
		const pressCursor = () => cursor.classList.add('is-pressed');
		const releaseCursor = () => cursor.classList.remove('is-pressed');

		document.addEventListener('pointermove', moveCursor);
		document.addEventListener('pointerover', updateTarget);
		document.addEventListener('pointerdown', pressCursor);
		document.addEventListener('pointerup', releaseCursor);
		document.addEventListener('pointerleave', hideCursor);

		return () => {
			window.cancelAnimationFrame(animationFrame.current);
			document.removeEventListener('pointermove', moveCursor);
			document.removeEventListener('pointerover', updateTarget);
			document.removeEventListener('pointerdown', pressCursor);
			document.removeEventListener('pointerup', releaseCursor);
			document.removeEventListener('pointerleave', hideCursor);
		};
	}, [prefersReducedMotion]);

	return (
		<div className="designer-cursor" ref={cursorRef} aria-hidden="true">
			<span className="designer-cursor-glyph">
				<MousePointer2 className="designer-cursor-icon" size={30} strokeWidth={1.8} />
				<span className="designer-cursor-label">PlayState</span>
			</span>
		</div>
	);
}

export default CustomCursor;