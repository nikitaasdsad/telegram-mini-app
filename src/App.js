import React from 'react';
import { useEffect, useState } from 'react'; // Один раз импортируем useState и useEffect

const heroes = ['Invoker', 'Pudge', 'Phantom Assassin', 'Juggernaut'];
export default function App() {
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendOrder = async () => {
    const order = { hero, skin, pose, comment, contact };

    try {
      const response = await fetch('https://telegram-mini-app-bjen.vercel.app/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Произошла ошибка');
      }

      alert('Заявка успешно отправлена!');
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      setErrorMessage('Произошла ошибка при отправке заявки');
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Pick Your Hero</h1>

      <div>
        <label className="font-semibold">1. Выбери героя:</label>
        <select className="w-full p-2 border mt-2" value={hero} onChange={(e) => setHero(e.target.value)}>
          <option value="">Выберите героя</option>
          {heroes.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold">2. Скин или внешний вид:</label>
        <input
          className="w-full p-2 border mt-2"
          placeholder="Название скина или описание"
          value={skin}
          onChange={(e) => setSkin(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">3. Поза героя:</label>
        <input
          className="w-full p-2 border mt-2"
          placeholder="Пример: атакует, стоит, сидит"
          value={pose}
          onChange={(e) => setPose(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">4. Комментарии:</label>
        <textarea
          className="w-full p-2 border mt-2"
          placeholder="Особые пожелания"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">5. Контакт:</label>
        <input
          className="w-full p-2 border mt-2"
          placeholder="@ник или номер телефона"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      <button className="w-full p-2 bg-blue-500 text-white mt-4" onClick={sendOrder} disabled={!hero || !contact}>
        📦 Отправить заказ
      </button>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
}
