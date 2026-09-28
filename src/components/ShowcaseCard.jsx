import React, { useState } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import GameHudPreview from './previews/GameHudPreview.jsx';
import SettingsPreview from './previews/SettingsPreview.jsx';

function ShopPreview({ data }) {
  const [coins, setCoins] = useState(data.balance);
  const [ownedItems, setOwnedItems] = useState([]);
  const [feedback, setFeedback] = useState(data.defaultFeedback);
  const [isOpen, setIsOpen] = useState(true);
  const formattedCoins = new Intl.NumberFormat('en-US').format(coins);

  function buyItem(item) {
    if (ownedItems.includes(item.id) || coins < item.price) return;
    setCoins((currentCoins) => currentCoins - item.price);
    setOwnedItems((items) => [...items, item.id]);
    setFeedback(`${item.name} ${data.boughtMessage.toLowerCase()}`);
  }

  function addCoins() {
    setCoins((currentCoins) => currentCoins + data.bonusAmount);
    setFeedback(data.bonusMessage);
  }

  return (
    <div className={`mock-window shop-window${isOpen ? '' : ' is-closed'}`}>
      {isOpen ? (
        <>
          <div className="store-header">
            <div className="store-heading"><span className="store-mark" aria-hidden="true"><ShoppingBag size={15} /></span><strong>{data.gameName}</strong></div>
            <div className="store-wallet">
              <span className="store-coin" aria-hidden="true">{data.currency}</span>
              <span className="store-balance" aria-live="polite">{formattedCoins}</span>
              <button className="store-add" type="button" onClick={addCoins} aria-label="Add demo coins">+</button>
              <button className="store-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close cafe shop">×</button>
            </div>
          </div>
          <div className="shop-product-grid">
            {data.items.map((item) => {
              const isOwned = ownedItems.includes(item.id);
              const canAfford = coins >= item.price;

              return (
                <article className={`shop-product shop-tone-${item.tone}`} key={item.id}>
                  <h4>{item.name}</h4>
                  <span className="shop-product-art" aria-hidden="true">{item.icon}</span>
                  <span className="shop-benefit">{item.benefit}</span>
                  <button className="shop-buy" type="button" onClick={() => buyItem(item)} disabled={isOwned || !canAfford} aria-label={`${isOwned ? 'Purchased' : 'Buy'} ${item.name} for ${item.price} coins`}>
                    <span className="shop-buy-price"><span className="shop-price-coin">{data.currency}</span>{item.price}</span>
                    <span>{isOwned ? data.boughtLabel : canAfford ? data.actionLabel : 'Need coins'}</span>
                  </button>
                </article>
              );
            })}
          </div>
          <p className="store-feedback" aria-live="polite">{feedback}</p>
        </>
      ) : (
        <div className="shop-closed-panel">
          <span className="shop-closed-icon" aria-hidden="true">☕</span>
          <strong>{data.closedMessage}</strong>
          <button className="shop-reopen" type="button" onClick={() => setIsOpen(true)}>{data.reopenLabel}</button>
        </div>
      )}
    </div>
  );
}

const previews = { shop: ShopPreview, settings: SettingsPreview, gameHud: GameHudPreview };

function ShowcaseCard({ showcase }) {
  const Preview = previews[showcase.preview];

  return (
    <article className={`showcase-card reveal-item accent-${showcase.accent}`}>
      <div className={`preview-stage preview-${showcase.preview}`}>
        <Preview data={showcase.demo} />
      </div>
      <div className="showcase-info">
        <div className="showcase-meta"><span className="style-label">{showcase.style}</span><span>{showcase.system}</span></div>
        <h3>{showcase.title}</h3>
        <p>{showcase.description}</p>
        <span className="concept-label"><Sparkles size={12} /> UI PRODUCT</span>
      </div>
    </article>
  );
}

export default ShowcaseCard;