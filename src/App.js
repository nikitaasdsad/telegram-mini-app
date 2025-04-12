// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const heroes = [
  'Anti-Mage', 'Axe', 'Bane', 'Bloodseeker', 'Crystal Maiden', 'Drow Ranger',
  'Earthshaker', 'Juggernaut', 'Mirana', 'Morphling', 'Shadow Fiend', 'Phantom Lancer',
  'Puck', 'Pudge', 'Razor', 'Sand King', 'Storm Spirit', 'Sven', 'Tiny', 'Vengeful Spirit',
  'Windranger', 'Zeus', 'Kunkka', 'Lina', 'Lion', 'Shadow Shaman', 'Slardar', 'Tidehunter',
  'Witch Doctor', 'Lich', 'Riki', 'Enigma', 'Tinker', 'Sniper', 'Necrophos', 'Warlock',
  'Queen of Pain', 'Venomancer', 'Faceless Void', 'Wraith King', 'Death Prophet',
  'Phantom Assassin', 'Pugna', 'Templar Assassin', 'Viper', 'Luna', 'Dragon Knight',
  'Dazzle', 'Clockwerk', 'Leshrac', 'Nature's Prophet', 'Lifestealer', 'Dark Seer',
  'Clinkz', 'Omniknight', 'Huskar', 'Night Stalker', 'Broodmother', 'Bounty Hunter',
  'Weaver', 'Jakiro', 'Batrider', 'Chen', 'Spectre', 'Doom', 'Ancient Apparition',
  'Ursa', 'Spirit Breaker', 'Gyrocopter', 'Alchemist', 'Invoker', 'Silencer',
  'Outworld Destroyer', 'Lycan', 'Brewmaster', 'Shadow Demon', 'Lone Druid',
  'Chaos Knight', 'Meepo', 'Treant Protector', 'Ogre Magi', 'Undying', 'Rubick',
  'Disruptor', 'Nyx Assassin', 'Naga Siren', 'Keeper of the Light', 'Io',
  'Visage', 'Slark', 'Medusa', 'Troll Warlord', 'Centaur Warrunner',
  'Magnus', 'Timbersaw', 'Bristleback', 'Tusk', 'Skywrath Mage', 'Abaddon',
  'Elder Titan', 'Legion Commander', 'Techies', 'Ember Spirit', 'Earth Spirit',
  'Underlord', 'Terrorblade', 'Phoenix', 'Oracle', 'Winter Wyvern', 'Arc Warden',
  'Monkey King', 'Dark Willow', 'Pangolier', 'Grimstroke', 'Hoodwink', 'Void Spirit',
  'Snapfire', 'Mars', 'Dawnbreaker', 'Marci', 'Primal Beast', 'Muerta'
];

function App() {
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter(h => h.toLowerCase().includes(hero.toLowerCase()))
    );
  }, [hero]);

  const handleSubmit = async () => {
    if (blocked) return;
    setBlocked(true);
    setSubmitted(true);

    try {
      await axios.post('/api/order', {
        hero, skin, pose, comment, contact
      });
    } catch (e) {
      console.error('Ошибка при отправке:', e);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎮 Pick Your Hero</h1>
      {submitted ? (
        <div className="success">Заявка успешно отправлена!</div>
      ) : (
        <div className="form">
          <div className="field">
            <input
              type="text"
              placeholder="Введите имя героя..."
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              className="input"
            />
            {hero && filteredHeroes.length > 0 && (
              <ul className="dropdown">
                {filteredHeroes.map((h, i) => (
                  <li key={i} onClick={() => setHero(h)}>{h}</li>
                ))}
              </ul>
            )}
          </div>

          <input
            className="input"
            placeholder="Название или описание скина"
            value={skin}
            onChange={e => setSkin(e.target.value)}
          />
          <input
            className="input"
            placeholder="Поза персонажа (например: атакует, стоит, прыгает)"
            value={pose}
            onChange={e => setPose(e.target.value)}
          />
          <input
            className="input"
            placeholder="Комментарий"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <input
            className="input"
            placeholder="@your_tg"
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>Отправить</button>
        </div>
      )}
    </div>
  );
}

export default App;
