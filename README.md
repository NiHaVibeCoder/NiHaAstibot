<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Astibot — Crypto Trading Bot (Simulator)

Kurzbeschreibung
----------------
Astibot ist ein lokal ausführbarer Crypto-Trading-Bot-Simulator mit Live-Simulation, Backtesting, Optimierung und optionaler Telegram-Integration für Benachrichtigungen. Nur zu Demonstrations- und Testzwecken — keine Anlageberatung.

Schnellstart
------------
Voraussetzung: Node.js installiert.

1. Projektverzeichnis öffnen:
   - Terminal in VS Code: Ctrl+`  
   - Oder in PowerShell:
     ```powershell
     cd 'c:\VibedAstiBot\NiHaAstibot'
     ```

2. Abhängigkeiten installieren:
   ```powershell
   npm install
   ```

3. Optional: Umgebungsvariable setzen (z. B. Gemini API Key):
   - Datei `.env.local` anlegen und z. B. `GEMINI_API_KEY=dein_key` setzen.

4. Entwicklung starten:
   ```powershell
   npm run dev
   ```
   Vite startet standardmäßig auf http://localhost:5173 (UI öffnen im Browser).

5. Production-Build + einfacher Node-Server:
   ```powershell
   npm run build
   npm run server
   ```
   Der Server-Start nutzt `server.js`.

Wichtige Dateien
----------------
- App-Einstieg: `App.tsx`  
- Vite / Client: `index.html`, `vite.config.ts`  
- Server: `server.js`  
- Hooks: `hooks/useTradingSimulator.ts`, `hooks/useBackendTradingSimulator.ts`  
- Services: `services/telegramService.ts`, `services/backendService.ts`, `services/simulationService.ts`  
- Komponenten: `components/*` (UI, Einstellungen, Charts, Telegram-Tab)  
- Paket: `package.json`

Telegram-Integration
--------------------
1. Token und Chat-ID in der UI (Settings → Telegram) eintragen.  
2. "Verbindung testen" in der UI verwenden (ruft `testTelegramConnection` auf).  
3. Aktivierte Benachrichtigungen werden über `sendTelegramMessage` gesendet.

Backtesting & Optimierung
-------------------------
- Historische Daten über die UI laden oder eigene Daten verwenden.  
- Headless-Optimierung ist im Service (`runHeadlessSimulation`) implementiert.  
- Einstellungen und Ergebnisse werden über die UI exportierbar / anzeigbar gemacht.

Fehlerbehebung
--------------
- Dev-Server startet nicht: Port prüfen (5173) und Node-Version.  
- Telegram-Fehler: Token/Chat-ID prüfen, Bot muss vom Nutzer kontaktiert worden sein.  
- Server-Start: `server.js` erwartet einen gebauten `dist`-Ordner (nach `npm run build`).

Mitwirken
---------
Fork → Branch → PR. Nutze klare Commit-Messages. Siehe `.git/COMMIT_EDITMSG` für Hinweise.

Lizenz
------
Keine Lizenzdatei im Repo. Für öffentliche Veröffentlichung eine Lizenz (z. B. MIT) hinzufügen.

Haftungsausschluss
------------------
Nur zu Entwicklungs- und Demonstrationszwecken. Vor echtem Einsatz gründlich testen.