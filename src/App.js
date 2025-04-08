import { useEffect, useState } from 'react';

const heroes = ['Invoker', 'Pudge', 'Phantom Assassin', 'Juggernaut'];

export default function App() {
  const [tg, setTg] = useState(null);
  const [hero, setHero] = useState('');
  const [skin, setSkin] = useState('');
  const [pose, setPose] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    const tgWindow = window?.Telegram?.WebApp;
    if (tgWindow) {
      tgWindow.ready();
      setTg(tgWindow);
    }
  }, []);

  const sendOrder = () => {
    const order = { hero, skin, pose, comment, contact };
    if (tg) tg.sendData(JSON.stringify(order));
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Pick Your Hero</h1>
      <p className="text-center text-sm text-gray-500">Сделай кастомную фигурку героя Dota 2</p>

      <div>
        <label className="font-semibold">1. Выбери героя:</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {heroes.map((h) => (
            <button key={h} className={`p-2 border ${hero === h ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setHero(h)}>
              {h}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold">2. Скин или внешний вид:</label>
        <input className="w-full p-2 border mt-2" placeholder="Название скина или описание" value={skin} onChange={(e) => setSkin(e.target.value)} />
      </div>

      <div>
        <label className="font-semibold">3. Поза героя:</label>
        <input className="w-full p-2 border mt-2" placeholder="Пример: атакует, стоит, сидит" value={pose} onChange={(e) => setPose(e.target.value)} />
      </div>

      <div>
        <label className="font-semibold">4. Комментарии:</label>
        <textarea className="w-full p-2 border mt-2" placeholder="Особые пожелания" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <div>
        <label className="font-semibold">5. Контакт:</label>
        <input className="w-full p-2 border mt-2" placeholder="@ник или номер телефона" value={contact} onChange={(e) => setContact(e.target.value)} />
      </div>

      <button className="w-full p-2 bg-blue-500 text-white mt-4" onClick={sendOrder} disabled={!hero || !contact}>
        📦 Отправить заказ
      </button>
    </div>
  );
}
