import nodemailer from 'nodemailer'

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  })

  const { order, email } = body

  const mailOptions = {
    from: '"Магазин" <shop@example.com>',
    to: email,
    subject: `Заказ #${order.id} оформлен`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2E7D32;">Спасибо за заказ!</h2>
        <p>Ваш заказ #${order.id} успешно оформлен.</p>
        
        <h3>Детали заказа:</h3>
        <ul style="list-style: none; padding: 0;">
          ${order.items.map((item: OrderItem) => `
            <li style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
              ${item.title}<br>
              <span style="color: #666;">Количество: ${item.quantity} шт.</span><br>
              <span style="color: #666;">Цена: ${item.price} ₽</span>
            </li>
          `).join('')}
        </ul>
        
        <p style="font-size: 18px; font-weight: bold; color: #2E7D32;">
          Итого: ${order.total} ₽
        </p>
        
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
          <h3>Информация о получателе:</h3>
          <p>Имя: ${order.customerInfo.name}</p>
          <p>Email: ${order.customerInfo.email}</p>
          <p>Телефон: ${order.customerInfo.phone}</p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}) 