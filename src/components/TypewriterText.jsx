import React, { useEffect, useState } from 'react';
import useReducedMotionSafe from '../lib/useReducedMotionSafe.js';

function TypewriterText({ text, phrases, className = '' }) {
	const prefersReducedMotion = useReducedMotionSafe();
	const shouldCycle = Boolean(phrases);
	const words = phrases || [text];
	const phraseSignature = words.join('\u0000');
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [characterCount, setCharacterCount] = useState(0);
	const fullText = words.join(', ');
	const activeWord = words[phraseIndex];

	useEffect(() => {
		if (prefersReducedMotion) {
			setPhraseIndex(0);
			setCharacterCount(words[0].length);
			return undefined;
		}

		let currentPhrase = 0;
		let count = 0;
		let isErasing = false;
		let pauseTicks = 0;
		setPhraseIndex(0);
		setCharacterCount(0);
		const typingInterval = window.setInterval(() => {
			const phrase = words[currentPhrase];
			if (isErasing) {
				if (pauseTicks > 0) {
					pauseTicks -= 1;
					return;
				}
				if (count > 0) {
					count -= 1;
				} else {
					currentPhrase = (currentPhrase + 1) % words.length;
					setPhraseIndex(currentPhrase);
					isErasing = false;
				}
			} else if (count < phrase.length) {
				count += 1;
			} else if (shouldCycle) {
				isErasing = true;
				pauseTicks = 12;
			} else {
				window.clearInterval(typingInterval);
			}
			setCharacterCount(count);
		}, shouldCycle ? 65 : 58);

		return () => window.clearInterval(typingInterval);
	}, [phraseSignature, prefersReducedMotion, shouldCycle]);

	const isTyping = !prefersReducedMotion && (shouldCycle || characterCount < activeWord.length);

	return (
		<>
			<span className={`typewriter-wrap ${className}`.trim()} aria-hidden="true">
				{words.map((word) => <span className="typewriter-measure" key={word}>{word}</span>)}
				<span className="typewriter-output">{activeWord.slice(0, characterCount)}{isTyping && <span className="typewriter-caret" />}</span>
			</span>
			<span className="visually-hidden">{fullText}</span>
		</>
	);
}

export default TypewriterText;