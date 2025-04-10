// api/order.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hero, skin, pose, comment, contact } = req.body;

    // Тут вы можете обрабатывать заявок, например, отправлять их в Telegram
    // Для начала просто выводим данные в консоль
    console.log('Новая заявка:', { hero, skin, pose, comment, contact });

    return res.status(200).json({ success: true, message: 'Заявка принята' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
