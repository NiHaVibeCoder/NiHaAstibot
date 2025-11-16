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
    throw error;
  }
}

export async function testTelegramConnection(botToken: string, chatId: string): Promise<{ success: boolean; message: string }> {
  if (!botToken || !chatId) {
    return { success: false, message: 'Bot Token und Chat ID müssen ausgefüllt sein.' };
  }

  try {
    const testMessage = '<b>✅ Verbindungstest erfolgreich!</b>\n\nAstibot kann jetzt Nachrichten an diesen Chat senden.';
    await sendTelegramMessage(botToken, chatId, testMessage);
    return { success: true, message: 'Verbindungstest erfolgreich! Testnachricht wurde gesendet.' };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unbekannter Fehler';
    if (errorMessage.includes('chat not found') || errorMessage.includes('chat_id')) {
      return { success: false, message: 'Chat ID ist ungültig. Stelle sicher, dass du eine Nachricht an den Bot gesendet hast.' };
    } else if (errorMessage.includes('Unauthorized') || errorMessage.includes('invalid token')) {
      return { success: false, message: 'Bot Token ist ungültig. Überprüfe deinen Token von @BotFather.' };
    }
    return { success: false, message: `Fehler: ${errorMessage}` };
  }
}

export function getTestMessageForNotificationType(type: 'periodic' | 'error' | 'buy' | 'sell'): string {
  switch (type) {
    case 'periodic':
      return '<b>📊 Test: Regelmäßige Status-Nachrichten</b>\n\nDiese Nachricht bestätigt, dass regelmäßige Status-Nachrichten aktiviert sind.';
    case 'error':
      return '<b>🚨 Test: Fehlermeldungen</b>\n\nDiese Nachricht bestätigt, dass Fehlermeldungen aktiviert sind.';
    case 'buy':
      return '<b>💰 Test: Kauf-Benachrichtigungen</b>\n\nDiese Nachricht bestätigt, dass Kauf-Benachrichtigungen aktiviert sind.';
    case 'sell':
      return '<b>💸 Test: Verkauf-Benachrichtigungen</b>\n\nDiese Nachricht bestätigt, dass Verkauf-Benachrichtigungen aktiviert sind.';
    default:
      return '<b>✅ Testnachricht</b>\n\nDiese Nachricht bestätigt, dass die Telegram-Integration funktioniert.';
  }
}
