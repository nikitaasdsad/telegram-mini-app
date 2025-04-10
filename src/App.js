import React, { useState } from 'react';
import './App.css';

function App() {
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);  // Блокировка повторных заявок
  const [showForm, setShowForm] = useState(true); // Управление видимостью формы

  const heroes = ['Invoker', 'Pudge', 'Phantom Assassin', 'Juggernaut', 'Anti-Mage', 'Lion', 'Tinker'];

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Если заявка уже отправлена, не выполняем повторный запрос
  if (isSubmitted) {
    return;
  }

  setLoading(true);
  setIsSubmitted(true); // Блокируем повторную отправку заявки

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


  const handleClose = () => {
    setShowForm(false); // Скрыть форму
  };

  return (
    <div className="app-container">
      {showForm ? (
        <>
          <h1 className="title">Отправить заявку</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Герой</label>
              <input
                type="text"
                value={hero}
                onChange={(e) => setHero(e.target.value)}
                placeholder="Введите имя героя"
                list="hero-list"
                required
              />
              <datalist id="hero-list">
                {heroes.map((heroName, index) => (
                  <option key={index} value={heroName} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label>Скин</label>
              <input
                type="text"
                value={skin}
                onChange={(e) => setSkin(e.target.value)}
                placeholder="Напишите название скина или описание"
                required
              />
            </div>

            <div className="form-group">
              <label>Поза</label>
              <input
                type="text"
                value={pose}
                onChange={(e) => setPose(e.target.value)}
                placeholder="Укажите позу героя"
                required
              />
            </div>

            <div className="form-group">
              <label>Комментарий</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите комментарий"
                required
              />
            </div>

            <div className="form-group">
              <label>Контакт</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Введите ваш контакт (например, @your_tg)"
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </>
      ) : (
        <div className="response-container">
          <h2>{responseMessage}</h2>
          <button className="close-button" onClick={handleClose}>Закрыть мини-апп</button>
        </div>
      )}
    </div>
  );
}

export default App;
