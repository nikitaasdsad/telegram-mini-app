const axios = require('axios');

// Токен для Telegram-бота
const TELEGRAM_BOT_TOKEN = '7209885388:AAEOBty7DIXSgY_F0_05DhUntMy3jpCoPW0';
const ADMIN_ID = '744187097';  // ID администратора

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hero, skin, pose, comment, contact } = req.body;

    // Формируем сообщение для Telegram
    const message = `
      🦸‍♂️ **Новая заявка!**

      **Герой:** ${hero}
      **Скин/внешний вид:** ${skin}
      **Поза героя:** ${pose}
      **Комментарий:** ${comment}
      **Контакт:** ${contact}
    `;

    try {
      // Отправляем сообщение в Telegram
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: ADMIN_ID,
        text: message,
        parse_mode: 'Markdown',
      });

      // Отправляем успешный ответ
      return res.status(200).json({ success: true, message: 'Заявка отправлена' });
    } catch (error) {
      console.error('Ошибка при отправке заявки в Telegram:', error);
      return res.status(500).json({ success: false, message: 'Ошибка при отправке заявки' });
    }
  } else {
    // Обрабатываем запросы, отличные от POST
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
