import React from 'react';
import { ArrowUpRight, Layers3 } from 'lucide-react';

function ApproachSection({ approach, focusAreas, RevealSection }) {
	return (
		<RevealSection className="approach-section content-width" id="approach" aria-labelledby="approach-title">
			<div className="approach-heading reveal-item reveal-delay-one">
				<p className="eyebrow">{approach.eyebrow}</p>
				<h2 id="approach-title">{approach.heading}<br /><span>{approach.headingAccent}</span></h2>
				<p>{approach.description}</p>
			</div>
			<div className="approach-details reveal-item reveal-delay-two">
				<div className="focus-list">
					{focusAreas.map((area, index) => (
						<div className="focus-row" key={area}>
							<span className="focus-number">0{index + 1}</span><span>{area}</span><ArrowUpRight size={15} aria-hidden="true" />
						</div>
					))}
				</div>
				<div className="workflow-note">
					<span className="workflow-icon"><Layers3 size={17} /></span>
					<div><strong>{approach.workflowTitle}</strong><p>{approach.workflowDescription}</p></div>
				</div>
			</div>
		</RevealSection>
	);
}

export default ApproachSection;