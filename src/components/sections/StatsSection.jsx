import React from 'react';

function StatsSection({ stats, RevealSection }) {
	return (
		<RevealSection className="stats-section content-width" aria-label="PlayState Studio statistics">
			<p className="eyebrow stats-eyebrow reveal-item reveal-delay-one">{stats.eyebrow}</p>
			<ul className="stats-grid">
				{stats.items.map((item, index) => (
					<li className={`stats-item reveal-item reveal-delay-${index + 1}`} key={item.label}>
						<span className="stats-index">0{index + 1}</span>
						<p className="stats-value">{item.value}{item.suffix && <span>{item.suffix}</span>}</p>
						<p className="stats-label">{item.label}</p>
					</li>
				))}
			</ul>
		</RevealSection>
	);
}

export default StatsSection;