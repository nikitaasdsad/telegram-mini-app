import React, { useState } from 'react';
import './App.css'; // Импортируем файл с CSS для стилизации

function App() {
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);  // Новый state для предотвращения повторных заявок

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Если заявка уже отправлена, не выполняем повторный запрос
    if (isSubmitted) {
      return;
    }

    setLoading(true);
    setIsSubmitted(true); // Блокируем отправку заявок

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Отправить заявку</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Герой</label>
          <input
            type="text"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Скин</label>
          <input
            type="text"
            value={skin}
            onChange={(e) => setSkin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Поза</label>
          <input
            type="text"
            value={pose}
            onChange={(e) => setPose(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Комментарий</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Контакт</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default App;
