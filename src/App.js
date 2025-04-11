import React, { useState, useEffect } from 'react';

const heroes = [
  'Abaddon', 'Alchemist', 'Ancient Apparition', 'Anti-Mage', 'Arc Warden', 'Axe',
  'Bane', 'Batrider', 'Beastmaster', 'Bloodseeker', 'Bounty Hunter', 'Brewmaster', 'Bristleback', 'Broodmother',
  'Centaur Warrunner', 'Chaos Knight', 'Chen', 'Clinkz', 'Clockwerk', 'Crystal Maiden',
  'Dark Seer', 'Dark Willow', 'Dawnbreaker', 'Dazzle', 'Death Prophet', 'Disruptor', 'Doom', 'Dragon Knight', 'Drow Ranger',
  'Earth Spirit', 'Earthshaker', 'Elder Titan', 'Ember Spirit', 'Enchantress', 'Enigma',
  'Faceless Void', 'Grimstroke', 'Gyrocopter', 'Hoodwink', 'Huskar',
  'Invoker', 'Io', 'Jakiro', 'Juggernaut', 'Keeper of the Light', 'Kunkka',
  'Legion Commander', 'Leshrac', 'Lich', 'Lifestealer', 'Lina', 'Lion', 'Lone Druid', 'Luna', 'Lycan',
  'Magnus', 'Marci', 'Mars', 'Medusa', 'Meepo', 'Mirana', 'Monkey King', 'Morphling',
  'Muerta', 'Naga Siren', 'Nature\'s Prophet', 'Necrophos', 'Night Stalker', 'Nyx Assassin',
  'Ogre Magi', 'Omniknight', 'Oracle', 'Outworld Destroyer',
  'Pangolier', 'Phantom Assassin', 'Phantom Lancer', 'Phoenix', 'Primal Beast', 'Puck', 'Pudge', 'Pugna', 'Queen of Pain',
  'Razor', 'Riki', 'Rubick',
  'Sand King', 'Shadow Demon', 'Shadow Fiend', 'Shadow Shaman', 'Silencer', 'Skywrath Mage', 'Slardar', 'Slark', 'Snapfire', 'Sniper', 'Spectre', 'Spirit Breaker', 'Storm Spirit', 'Sven',
  'Techies', 'Templar Assassin', 'Terrorblade', 'Tidehunter', 'Timbersaw', 'Tinker', 'Tiny', 'Treant Protector', 'Troll Warlord', 'Tusk',
  'Underlord', 'Undying', 'Ursa',
  'Vengeful Spirit', 'Venomancer', 'Viper', 'Visage', 'Void Spirit',
  'Warlock', 'Weaver', 'Windranger', 'Winter Wyvern', 'Witch Doctor', 'Wraith King',
  'Zeus'
];

function App() {
  const [heroSearch, setHeroSearch] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState(heroes);
  const [selectedHero, setSelectedHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter(hero =>
        hero.toLowerCase().includes(heroSearch.toLowerCase())
      )
    );
  }, [heroSearch]);

  const handleSubmit = async () => {
    if (!selectedHero || !skin || !pose || !contact) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const order = {
      hero: selectedHero,
      skin,
      pose,
      comment,
      contact
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Произошла ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения');
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>🎉 Заявка успешно отправлена!</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>Создание заказа</h2>

      <label>Поиск героя</label>
      <input
        type="text"
        value={heroSearch}
        onChange={e => setHeroSearch(e.target.value)}
        placeholder="Введите имя героя"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label>Выберите героя</label>
      <select
        value={selectedHero}
        onChange={e => setSelectedHero(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      >
        <option value="">-- Выберите героя --</option>
        {filteredHeroes.map(hero => (
          <option key={hero} value={hero}>{hero}</option>
        ))}
      </select>

      <input
        type="text"
        value={skin}
        onChange={e => setSkin(e.target.value)}
        placeholder="Название или описание скина"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <input
        type="text"
        value={pose}
        onChange={e => setPose(e.target.value)}
        placeholder="Поза героя (например, атакующая, расслабленная)"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Комментарий к заказу (опционально)"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <input
        type="text"
        value={contact}
        onChange={e => setContact(e.target.value)}
        placeholder="@your_tg"
        style={{ width: '100%', padding: 8, marginBottom: 20 }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: 16
        }}
      >
        Отправить заявку
      </button>
    </div>
  );
}

export default App;
