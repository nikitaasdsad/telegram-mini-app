import React, { useState } from 'react';
import './App.css';

const heroes = [
  'Invoker', 'Pudge', 'Phantom Assassin', 'Juggernaut', 'Anti-Mage', 'Lion', 'Tinker'
  // добавь сюда весь список героев, если ещё не добавил
];

function App() {
  const [order, setOrder] = useState({
    hero: '',
    skin: '',
    pose: '',
    comment: '',
    contact: '',
  });

  const [filteredHeroes, setFilteredHeroes] = useState(heroes);
  const [searchHero, setSearchHero] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
useEffect(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
}, []);
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchHero(value);
    setFilteredHeroes(heroes.filter(h => h.toLowerCase().includes(value)));
  };

  const handleHeroSelect = (hero) => {
    setOrder({ ...order, hero });
    setFilteredHeroes(heroes);
    setSearchHero(hero);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (data.success) {
        setIsSent(true);
      } else {
        alert('Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке заявки');
    }
  };

  const handleClose = () => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      alert('Мини-апп можно закрыть вручную');
    }
  };

  return (
    <div className="app">
      {!isSent ? (
        <form onSubmit={handleSubmit}>
          <h2>Оформить заявку</h2>

          <label>Выбор героя:</label>
          <input
            type="text"
            value={searchHero}
            onChange={handleSearch}
            placeholder="Введите имя героя"
            autoComplete="off"
          />
          <ul className="hero-list">
            {filteredHeroes.map((h) => (
              <li key={h} onClick={() => handleHeroSelect(h)}>{h}</li>
            ))}
          </ul>

          <label>Скин / Внешний вид:</label>
          <input
            type="text"
            name="skin"
            value={order.skin}
            onChange={handleChange}
            placeholder="Напишите название скина или описание"
            required
          />

          <label>Поза героя:</label>
          <input
            type="text"
            name="pose"
            value={order.pose}
            onChange={handleChange}
            placeholder="Например: атакующая поза"
            required
          />

          <label>Комментарий:</label>
          <input
            type="text"
            name="comment"
            value={order.comment}
            onChange={handleChange}
            placeholder="Дополнительные пожелания"
          />

          <label>Контакт для связи:</label>
          <input
            type="text"
            name="contact"
            value={order.contact}
            onChange={handleChange}
            placeholder="@your_tg"
            required
          />

          <button type="submit">Отправить заявку</button>
        </form>
      ) : (
        <div className="success-popup">
          <h3>🎉 Заявка успешно отправлена!</h3>
          <button
  onClick={() => {
    const isTelegramApp = () =>
      typeof window !== 'undefined' &&
      window.Telegram !== undefined &&
      window.Telegram.WebApp !== undefined &&
      window.Telegram.WebApp.platform !== undefined;

    if (isTelegramApp()) {
      window.Telegram.WebApp.close();
    } else {
      alert('Вы не в Telegram. Закрыть можно только внутри Telegram.');
    }
  }}
>
  Закрыть мини-приложение
</button>
        </div>
      )}
    </div>
  );
}

export default App;
