import React from 'react';
import CustomCursor from './components/CustomCursor.jsx';
import ApproachSection from './components/sections/ApproachSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ProductsSection from './components/sections/ProductsSection.jsx';
import SiteFooter from './components/sections/SiteFooter.jsx';
import SiteHeader from './components/sections/SiteHeader.jsx';
import StatsSection from './components/sections/StatsSection.jsx';
import RevealSection from './components/RevealSection.jsx';
import { studioProfile } from './data/profile.js';
import { showcases } from './data/showcases.js';

function App() {
	const { brand, navigation, hero, stats, gallery, approach, focusAreas, contact, footer } = studioProfile;

	return (
		<div className="site-shell">
			<CustomCursor />
			<SiteHeader brand={brand} navigation={navigation} />
			<main id="top">
				<HeroSection hero={hero} RevealSection={RevealSection} />
				<StatsSection stats={stats} RevealSection={RevealSection} />
				<ProductsSection gallery={gallery} showcases={showcases} RevealSection={RevealSection} />
				<ApproachSection approach={approach} focusAreas={focusAreas} RevealSection={RevealSection} />
				<ContactSection contact={contact} RevealSection={RevealSection} />
			</main>
			<SiteFooter brand={brand} footer={footer} />
		</div>
	);
}

export default App;
