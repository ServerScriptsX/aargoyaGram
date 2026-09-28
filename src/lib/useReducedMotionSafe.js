import { useEffect, useState } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function getPreference() {
	return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

function useReducedMotionSafe() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPreference);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const updatePreference = (event) => setPrefersReducedMotion(event.matches);

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', updatePreference);
			return () => mediaQuery.removeEventListener('change', updatePreference);
		}

		mediaQuery.addListener(updatePreference);
		return () => mediaQuery.removeListener(updatePreference);
	}, []);

	return prefersReducedMotion;
}

export default useReducedMotionSafe;
