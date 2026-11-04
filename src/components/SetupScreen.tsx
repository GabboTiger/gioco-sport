import React, { useState } from 'react';
import { GameConfig, BotDifficulty } from '../engine/types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
}

type ModeType = 'vs_bot' | 'hotseat_2p' | 'hotseat_3p' | 'bot_vs_bot';

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [mode, setMode] = useState<ModeType>('vs_bot');
  const [sport, setSport] = useState<string>('football');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [timerDurationSec, setTimerDurationSec] = useState<number>(60);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 900000) + 100000);

  // Player Names & Colors
  const [p1Name, setP1Name] = useState('Giocatore 1');
  const [p2Name, setP2Name] = useState('Bot');
  const p3Name = 'Giocatore 3';

  const handleModeChange = (newMode: ModeType) => {
    setMode(newMode);
    if (newMode === 'vs_bot') {
      setP1Name('Tu');
      setP2Name('Bot AI');
    } else if (newMode === 'hotseat_2p') {
      setP1Name('Giocatore 1');
      setP2Name('Giocatore 2');
    } else if (newMode === 'bot_vs_bot') {
      setP1Name('Bot Alpha');
      setP2Name('Bot Beta');
    }
  };

  const handleStart = () => {
    let players: GameConfig['players'] = [];

    if (mode === 'vs_bot') {
      players = [
        { name: p1Name || 'Tu', color: '#10b981', isBot: false },
        { name: p2Name || 'Bot', color: '#f59e0b', isBot: true, botDifficulty },
      ];
    } else if (mode === 'hotseat_2p') {
      players = [
        { name: p1Name || 'Giocatore 1', color: '#10b981', isBot: false },
        { name: p2Name || 'Giocatore 2', color: '#f59e0b', isBot: false },
      ];
    } else if (mode === 'hotseat_3p') {
      players = [
        { name: p1Name || 'Giocatore 1', color: '#10b981', isBot: false },
        { name: p2Name || 'Giocatore 2', color: '#f59e0b', isBot: false },
        { name: p3Name, color: '#3b82f6', isBot: false },
      ];
    } else {
      // bot_vs_bot
      players = [
        { name: p1Name || 'Bot Alpha', color: '#3b82f6', isBot: true, botDifficulty: 'medium' },
        { name: p2Name || 'Bot Beta', color: '#ef4444', isBot: true, botDifficulty: 'hard' },
      ];
    }

    const config: GameConfig = {
      sport,
      timerDurationSec,
      seed,
      minAnswersPerHex: 5,
      players,
    };

    onStartGame(config);
  };

  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '30px auto',
        padding: '32px 28px',
        backgroundColor: '#121929',
        border: '1px solid #1f2c42',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
      }}
      className="animate-pop-in"
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            fontSize: '12px',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '8px',
          }}
        >
          Hex Territory Strategy
        </div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          Hex Possession Quiz
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>
          Scegli un esagono, nomina l'entità corretta, conquista e ruba i territori adiacenti!
        </p>
      </div>

      {/* Mode Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>
          Modalità di Gioco
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => handleModeChange('vs_bot')}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: mode === 'vs_bot' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'vs_bot' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '15px' }}>👤 Giocatore Singolo</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Tu contro il Bot AI</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('hotseat_2p')}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: mode === 'hotseat_2p' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'hotseat_2p' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '15px' }}>👥 In 2 (Hotseat)</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Sullo stesso schermo</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('hotseat_3p')}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: mode === 'hotseat_3p' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'hotseat_3p' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '15px' }}>👥 In 3 Giocatori</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Sfida a tre hotseat</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('bot_vs_bot')}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: mode === 'bot_vs_bot' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'bot_vs_bot' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '15px' }}>🤖 Bot vs Bot</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Spettatore / Test AI</div>
          </button>
        </div>
      </div>

      {/* Sport Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
          Sport / Disciplina
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setSport('football')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: sport === 'football' ? '2px solid #10b981' : '1px solid #1e293b',
              backgroundColor: sport === 'football' ? '#10352c' : '#0c101a',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ⚽ Calcio (150+ Giocatori & Mister)
          </button>

          <button
            type="button"
            onClick={() => setSport('basketball')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: sport === 'basketball' ? '2px solid #f59e0b' : '1px solid #1e293b',
              backgroundColor: sport === 'basketball' ? '#3d2b0e' : '#0c101a',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🏀 Basket NBA (Icone & Coach)
          </button>
        </div>
      </div>

      {/* Bot Difficulty (if vs_bot) */}
      {mode === 'vs_bot' && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Livello Difficoltà Bot
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {(['easy', 'medium', 'hard'] as BotDifficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setBotDifficulty(level)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: botDifficulty === level ? '2px solid #38bdf8' : '1px solid #1e293b',
                  backgroundColor: botDifficulty === level ? '#1a2740' : '#0c101a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {level === 'easy' ? '🟢 Facile' : level === 'medium' ? '🟡 Medio' : '🔴 Difficile'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timer and Seed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Timer Giocatore
          </label>
          <select
            value={timerDurationSec}
            onChange={(e) => setTimerDurationSec(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: '#0c101a',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            <option value={30}>⏱️ 30 Secondi (Blitz)</option>
            <option value={60}>⏱️ 60 Secondi (Standard)</option>
            <option value={90}>⏱️ 90 Secondi (Tattico)</option>
            <option value={999}>♾️ Senza Timer</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Seed Tabella
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '11px',
                backgroundColor: '#0c101a',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                color: '#ffffff',
                fontWeight: 600,
              }}
            />
            <button
              type="button"
              onClick={() => setSeed(Math.floor(Math.random() * 900000) + 100000)}
              style={{
                padding: '0 12px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '10px',
                color: '#cbd5e1',
                cursor: 'pointer',
              }}
              title="Genera nuovo seed"
            >
              🎲
            </button>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '14px',
          border: 'none',
          backgroundColor: '#38bdf8',
          color: '#0b1120',
          fontSize: '18px',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(56, 189, 248, 0.4)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
      >
        Inizia Partita
      </button>
    </div>
  );
};
