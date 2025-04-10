// api/order.js

// Для работы с файловой системой
const fs = require('fs');
const path = require('path');

// Путь для сохранения заявок (создаем или обновляем файл с заявками)
const logFilePath = path.join(process.cwd(), 'orders-log.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hero, skin, pose, comment, contact } = req.body;

    // Создаем объект заявки
    const order = {
      hero,
      skin,
      pose,
      comment,
      contact,
      date: new Date().toISOString(),
    };

    // Читаем текущие заявки, если они есть
    let orders = [];
    if (fs.existsSync(logFilePath)) {
      const logData = fs.readFileSync(logFilePath, 'utf-8');
      orders = JSON.parse(logData);
    }

    // Добавляем новую заявку
    orders.push(order);

    // Записываем обновленный список заявок в файл
    fs.writeFileSync(logFilePath, JSON.stringify(orders, null, 2));

    // Отправляем успешный ответ
    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена' });
  } else {
    // Обрабатываем запросы, отличные от POST
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
