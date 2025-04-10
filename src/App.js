// src/App.js

import React, { useState } from 'react';

function App() {
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const order = { hero, skin, pose, comment, contact };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Заявка успешно отправлена');
      } else {
        setResponseMessage('Ошибка при отправке заявки');
      }
    } catch (error) {
      setResponseMessage('Ошибка при отправке заявки');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <h1>Отправить заявку</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Герой</label>
          <input
            type="text"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Скин</label>
          <input
            type="text"
            value={skin}
            onChange={(e) => setSkin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Поза</label>
          <input
            type="text"
            value={pose}
            onChange={(e) => setPose(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Комментарий</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Контакт</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Отправить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
