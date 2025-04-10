import { useEffect, useState } from 'react';

const allHeroes = ['Invoker', 'Pudge', 'Phantom Assassin', 'Juggernaut', 'Anti-Mage', 'Tinker', 'Lina', 'Crystal Maiden'];  // Пример расширенного списка героев

export default function App() {
  const [tg, setTg] = useState(null);
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState(allHeroes);

  useEffect(() => {
    const tgWindow = window?.Telegram?.WebApp;
    if (tgWindow) {
      tgWindow.ready();
      setTg(tgWindow);
    }
  }, []);

  // Функция для фильтрации героев на основе текста поиска
  useEffect(() => {
    setFilteredHeroes(
      allHeroes.filter((hero) => hero.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const sendOrder = async () => {
  const order = { hero, skin, pose, comment, contact };

  // Отправляем запрос на сервер для обработки
  const response = await fetch('https://your-server-url.com/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (response.ok) {
    // Отправка успешна, можем уведомить пользователя
    alert('Заявка отправлена!');
  } else {
    alert('Произошла ошибка при отправке заявки.');
  }

  // Отправляем данные в Telegram WebApp
  if (tg) tg.sendData(JSON.stringify(order));
};


  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Pick Your Hero</h1>
      <p className="text-center text-sm text-gray-500">Сделай кастомную фигурку героя Dota 2</p>

      <div>
        <label className="font-semibold">1. Выбери героя:</label>
        <input
          type="text"
          placeholder="Поиск героя..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border mt-2"
        />
        <div className="mt-2 max-h-60 overflow-auto">
          {filteredHeroes.length > 0 ? (
            filteredHeroes.map((h) => (
              <div
                key={h}
                onClick={() => setHero(h)}
                className={`p-2 cursor-pointer ${hero === h ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {h}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Ничего не найдено...</p>
          )}
        </div>
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

      <button
        className="w-full p-2 bg-blue-500 text-white mt-4"
        onClick={sendOrder}
        disabled={!hero || !contact}
      >
        📦 Отправить заказ
      </button>
    </div>
  );
}
