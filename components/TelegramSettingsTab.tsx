import React from 'react';
import type { TelegramSettings } from '../types';

interface TelegramSettingsTabProps {
  telegramSettings: TelegramSettings;
  onTelegramSettingsChange: (newSettings: Partial<TelegramSettings>) => void;
}

const TelegramSettingsTab: React.FC<TelegramSettingsTabProps> = ({ telegramSettings, onTelegramSettingsChange }) => {
  const handleToggle = (key: keyof TelegramSettings) => {
    onTelegramSettingsChange({ [key]: !telegramSettings[key] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onTelegramSettingsChange({ [e.target.id]: e.target.value });
  };

  const IntervalOptions = [
    { value: '30m', label: '30 Minuten' },
    { value: '1h', label: '1 Stunde' },
    { value: '12h', label: '12 Stunden' },
    { value: '24h', label: '24 Stunden' },
    { value: '48h', label: '48 Stunden' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Telegram Bot Integration</h3>
      <p className="text-sm text-slate-400 mb-6">
        Verbinde Astibot mit deinem Telegram-Bot, um Echtzeit-Benachrichtigungen über den Handelsstatus, Fehler und Trades zu erhalten.
      </p>

      <div className="space-y-6 mb-8 pb-6 border-b border-slate-700">
        <h4 className="text-lg font-semibold text-white">Bot-Verbindung</h4>
        <div>
          <label htmlFor="botToken" className="block text-sm font-medium text-slate-300 mb-1">
            Telegram Bot Token
          </label>
          <input
            type="text"
            id="botToken"
            value={telegramSettings.botToken}
            onChange={handleInputChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Dein Bot-Token von BotFather"
          />
          <p className="text-xs text-slate-500 mt-1">
            Erhalte deinen Bot-Token von <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@BotFather</a> auf Telegram.
          </p>
        </div>
        <div>
          <label htmlFor="chatId" className="block text-sm font-medium text-slate-300 mb-1">
            Telegram Chat ID
          </label>
          <input
            type="text"
            id="chatId"
            value={telegramSettings.chatId}
            onChange={handleInputChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Die Chat ID für Benachrichtigungen"
          />
          <p className="text-xs text-slate-500 mt-1">
            Um deine Chat ID zu finden, sende eine Nachricht an deinen Bot und verwende dann einen Service wie <a href="https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getUpdates" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">getUpdates</a>.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-white mb-4">Nachrichten-Einstellungen</h4>

        {/* Periodic Status Messages */}
        <div className="flex items-center justify-between">
          <label htmlFor="enablePeriodicMessages" className="text-sm font-medium text-slate-300 flex-1">
            Regelmäßige Status-Nachrichten
          </label>
          <input
            type="checkbox"
            id="enablePeriodicMessages"
            checked={telegramSettings.enablePeriodicMessages}
            onChange={() => handleToggle('enablePeriodicMessages')}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </div>
        {telegramSettings.enablePeriodicMessages && (
          <div className="ml-6 mt-2">
            <label htmlFor="periodicMessageInterval" className="block text-sm font-medium text-slate-300 mb-1">
              Sendeintervall
            </label>
            <select
              id="periodicMessageInterval"
              value={telegramSettings.periodicMessageInterval}
              onChange={handleInputChange}
              className="w-full sm:w-1/2 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {IntervalOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Eine Nachricht, die bestätigt, dass die Simulation/der Handel läuft und die Verbindung besteht.
            </p>
          </div>
        )}

        {/* Error Notifications */}
        <div className="flex items-center justify-between mt-4">
          <label htmlFor="enableErrorNotifications" className="text-sm font-medium text-slate-300 flex-1">
            Fehlermeldungen senden
          </label>
          <input
            type="checkbox"
            id="enableErrorNotifications"
            checked={telegramSettings.enableErrorNotifications}
            onChange={() => handleToggle('enableErrorNotifications')}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-6">
            Erhalte Benachrichtigungen bei Verbindungsabbrüchen oder anderen kritischen Fehlern.
        </p>

        {/* Buy Notifications */}
        <div className="flex items-center justify-between mt-4">
          <label htmlFor="enableBuyNotifications" className="text-sm font-medium text-slate-300 flex-1">
            Kauf-Benachrichtigungen senden
          </label>
          <input
            type="checkbox"
            id="enableBuyNotifications"
            checked={telegramSettings.enableBuyNotifications}
            onChange={() => handleToggle('enableBuyNotifications')}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-6">
            Erhalte eine Nachricht, wenn der Bot eine Kauforder ausführt (inkl. Details).
        </p>

        {/* Sell Notifications */}
        <div className="flex items-center justify-between mt-4">
          <label htmlFor="enableSellNotifications" className="text-sm font-medium text-slate-300 flex-1">
            Verkauf-Benachrichtigungen senden
          </label>
          <input
            type="checkbox"
            id="enableSellNotifications"
            checked={telegramSettings.enableSellNotifications}
            onChange={() => handleToggle('enableSellNotifications')}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-6">
            Erhalte eine Nachricht, wenn der Bot eine Verkauforder ausführt (inkl. Details).
        </p>
      </div>
    </div>
  );
};

export default TelegramSettingsTab;