import React, { useState } from 'react';
import ShowcaseCard from '../ShowcaseCard.jsx';

function ProductsSection({ gallery, showcases, RevealSection }) {
	const [activeStyle, setActiveStyle] = useState('all');
	const filteredShowcases = activeStyle === 'all'
		? showcases
		: showcases.filter((showcase) => showcase.style === activeStyle);

	return (
		<RevealSection className="work-section" id="work" aria-labelledby="work-title">
			<div className="content-width">
				<div className="section-heading reveal-item reveal-delay-one">
					<div>
						<p className="eyebrow">{gallery.eyebrow}</p>
						<h2 id="work-title">{gallery.heading}<br /><span>{gallery.headingAccent}</span></h2>
					</div>
					<p className="section-intro">{gallery.description}</p>
				</div>
				<div className="gallery-toolbar reveal-item reveal-delay-two">
					<div className="style-filters" role="group" aria-label={gallery.filterLabel}>
						{gallery.filters.map((filter) => (
							<button className={`filter-button${activeStyle === filter.value ? ' is-active' : ''}`} type="button" key={filter.value} onClick={() => setActiveStyle(filter.value)} aria-pressed={activeStyle === filter.value}>
								{filter.label}
							</button>
						))}
					</div>
					<span className="study-count" aria-live="polite">{filteredShowcases.length} {filteredShowcases.length === 1 ? gallery.itemLabel : gallery.itemLabelPlural}</span>
				</div>
				<div className="showcase-grid" id="study-gallery" aria-live="polite">
					{filteredShowcases.map((showcase) => <ShowcaseCard key={showcase.id} showcase={showcase} />)}
				</div>
			</div>
		</RevealSection>
	);
}

export default ProductsSection;