// services/telegramService.ts

export async function sendTelegramMessage(botToken: string, chatId: string, message: string): Promise<void> {
  if (!botToken || !chatId || !message) {
    console.warn('Telegram: Missing botToken, chatId, or message. Not sending.');
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML', // Allows for bold, italics, etc.
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${errorData.description || response.statusText}`);
    }
    console.log('Telegram message sent successfully.');
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}
