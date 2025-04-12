import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const heroes = [
  'Anti-Mage', 'Axe', 'Bane', 'Bloodseeker', 'Crystal Maiden', 'Drow Ranger', 'Earthshaker', 'Juggernaut', 'Mirana',
  'Morphling', 'Shadow Fiend', 'Phantom Lancer', 'Puck', 'Pudge', 'Razor', 'Sand King', 'Storm Spirit', 'Sven',
  'Tiny', 'Vengeful Spirit', 'Windranger', 'Zeus', 'Kunkka', 'Lina', 'Lion', 'Slardar', 'Witch Doctor', 'Lich',
  'Riki', 'Enigma', 'Tinker', 'Sniper', 'Necrophos', 'Warlock', 'Queen of Pain', 'Venomancer', 'Faceless Void',
  'Wraith King', 'Death Prophet', 'Phantom Assassin', 'Pugna', 'Templar Assassin', 'Viper', 'Luna', 'Dragon Knight',
  'Dazzle', 'Clockwerk', 'Leshrac', 'Nature\'s Prophet', 'Lifestealer', 'Dark Seer', 'Clinkz', 'Omniknight',
  'Enchantress', 'Huskar', 'Night Stalker', 'Broodmother', 'Bounty Hunter', 'Weaver', 'Jakiro', 'Batrider',
  'Chen', 'Spectre', 'Ancient Apparition', 'Doom', 'Ursa', 'Spirit Breaker', 'Gyrocopter', 'Alchemist',
  'Invoker', 'Silencer', 'Outworld Devourer', 'Lycan', 'Brewmaster', 'Shadow Demon', 'Lone Druid', 'Chaos Knight',
  'Meepo', 'Treant Protector', 'Ogre Magi', 'Undying', 'Rubick', 'Disruptor', 'Nyx Assassin', 'Naga Siren',
  'Keeper of the Light', 'Io', 'Visage', 'Slark', 'Medusa', 'Troll Warlord', 'Centaur Warrunner', 'Magnus',
  'Timbersaw', 'Bristleback', 'Tusk', 'Skywrath Mage', 'Abaddon', 'Elder Titan', 'Legion Commander',
  'Techies', 'Ember Spirit', 'Earth Spirit', 'Underlord', 'Terrorblade', 'Phoenix', 'Oracle', 'Winter Wyvern',
  'Arc Warden', 'Monkey King', 'Dark Willow', 'Pangolier', 'Grimstroke', 'Hoodwink', 'Void Spirit',
  'Snapfire', 'Mars', 'Dawnbreaker', 'Marci', 'Primal Beast', 'Muerta'
];

function App() {
  const [selectedHero, setSelectedHero] = useState('');
  const [skinName, setSkinName] = useState('');
  const [skinPose, setSkinPose] = useState('');
  const [skinComment, setSkinComment] = useState('');
  const [contact, setContact] = useState('@');
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasEditedContact, setHasEditedContact] = useState(false);

  const filteredHeroes = heroes.filter(hero =>
    hero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/order', {
        hero: selectedHero,
        skin: skinName,
        pose: skinPose,
        comment: skinComment,
        contact
      });
      setSubmitted(true);
    } catch (err) {
      alert('Ошибка при отправке заявки');
    }
  };

  const handleHeroChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedHero(e.target.value);
    setShowDropdown(true);
  };

  const handleContactFocus = () => {
    if (!hasEditedContact) {
      setContact('@');
    }
  };

  const handleContactChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('@')) {
      value = '@' + value;
    }
    setHasEditedContact(true);
    setContact(value);
  };

  return (
    <div className="app">
      <h1 className="title">Оформление заявки</h1>
      {submitted ? (
        <div className="success">✅ Заявка успешно отправлена!</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              className="input"
              value={searchTerm}
              onChange={handleHeroChange}
              onFocus={() => setShowDropdown(true)}
              placeholder="Выберите героя"
            />
            {showDropdown && filteredHeroes.length > 0 && (
              <ul className="dropdown">
                {filteredHeroes.map(hero => (
                  <li
                    key={hero}
                    onClick={() => {
                      setSelectedHero(hero);
                      setSearchTerm(hero);
                      setShowDropdown(false);
                    }}
                  >
                    {hero}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            className="input"
            placeholder="Название скина"
            value={skinName}
            onChange={e => setSkinName(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Описание позы или поза"
            value={skinPose}
            onChange={e => setSkinPose(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Комментарий"
            value={skinComment}
            onChange={e => setSkinComment(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="@your_tg"
            value={contact}
            onChange={handleContactChange}
            onFocus={handleContactFocus}
          />
          <button className="button" type="submit">Отправить</button>
        </form>
      )}
    </div>
  );
}

export default App;
