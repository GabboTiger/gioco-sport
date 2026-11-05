import React, { useState } from 'react';
import { GameConfig, BotDifficulty, GridSizeType } from '../engine/types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
}

type ModeType = 'vs_bot' | 'hotseat_2p' | 'hotseat_3p' | 'hotseat_4p' | 'bot_vs_bot';

// Universal, colorblind-friendly palette (Okabe-Ito / High Contrast)
const COLORBLIND_PALETTE = [
  { name: 'Blu Cielo', hex: '#0284c7' }, // Player 1
  { name: 'Ambra Solare', hex: '#f59e0b' }, // Player 2
  { name: 'Smeraldo', hex: '#10b981' }, // Player 3
  { name: 'Fucsia Brillante', hex: '#ec4899' }, // Player 4
];

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [mode, setMode] = useState<ModeType>('vs_bot');
  const [sport, setSport] = useState<string>('football');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [chainConquestMode, setChainConquestMode] = useState<'flood_fill' | 'direct'>('flood_fill');
  const [gridSize, setGridSize] = useState<GridSizeType>('standard_31');
  const [timerDurationSec, setTimerDurationSec] = useState<number>(60);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 900000) + 100000);

  // Player Names
  const [p1Name, setP1Name] = useState('Tu');
  const [p2Name, setP2Name] = useState('Bot AI');
  const [p3Name, setP3Name] = useState('Giocatore 3');
  const [p4Name, setP4Name] = useState('Giocatore 4');

  const handleModeChange = (newMode: ModeType) => {
    setMode(newMode);
    if (newMode === 'vs_bot') {
      setP1Name('Tu');
      setP2Name('Bot AI');
    } else if (newMode === 'hotseat_2p') {
      setP1Name('Giocatore 1');
      setP2Name('Giocatore 2');
    } else if (newMode === 'hotseat_3p') {
      setP1Name('Giocatore 1');
      setP2Name('Giocatore 2');
      setP3Name('Giocatore 3');
      // For 3-4 players, recommend expanded grid
      setGridSize('expanded_37');
    } else if (newMode === 'hotseat_4p') {
      setP1Name('Giocatore 1');
      setP2Name('Giocatore 2');
      setP3Name('Giocatore 3');
      setP4Name('Giocatore 4');
      setGridSize('expanded_37');
    } else if (newMode === 'bot_vs_bot') {
      setP1Name('Bot Alpha');
      setP2Name('Bot Beta');
    }
  };

  const handleStart = () => {
    let players: GameConfig['players'] = [];

    if (mode === 'vs_bot') {
      players = [
        { name: p1Name.trim() || 'Tu', color: COLORBLIND_PALETTE[0].hex, isBot: false },
        { name: p2Name.trim() || 'Bot AI', color: COLORBLIND_PALETTE[1].hex, isBot: true, botDifficulty },
      ];
    } else if (mode === 'hotseat_2p') {
      players = [
        { name: p1Name.trim() || 'Giocatore 1', color: COLORBLIND_PALETTE[0].hex, isBot: false },
        { name: p2Name.trim() || 'Giocatore 2', color: COLORBLIND_PALETTE[1].hex, isBot: false },
      ];
    } else if (mode === 'hotseat_3p') {
      players = [
        { name: p1Name.trim() || 'Giocatore 1', color: COLORBLIND_PALETTE[0].hex, isBot: false },
        { name: p2Name.trim() || 'Giocatore 2', color: COLORBLIND_PALETTE[1].hex, isBot: false },
        { name: p3Name.trim() || 'Giocatore 3', color: COLORBLIND_PALETTE[2].hex, isBot: false },
      ];
    } else if (mode === 'hotseat_4p') {
      players = [
        { name: p1Name.trim() || 'Giocatore 1', color: COLORBLIND_PALETTE[0].hex, isBot: false },
        { name: p2Name.trim() || 'Giocatore 2', color: COLORBLIND_PALETTE[1].hex, isBot: false },
        { name: p3Name.trim() || 'Giocatore 3', color: COLORBLIND_PALETTE[2].hex, isBot: false },
        { name: p4Name.trim() || 'Giocatore 4', color: COLORBLIND_PALETTE[3].hex, isBot: false },
      ];
    } else {
      // bot_vs_bot
      players = [
        { name: p1Name.trim() || 'Bot Alpha', color: COLORBLIND_PALETTE[0].hex, isBot: true, botDifficulty: 'medium' },
        { name: p2Name.trim() || 'Bot Beta', color: COLORBLIND_PALETTE[1].hex, isBot: true, botDifficulty: 'hard' },
      ];
    }

    const config: GameConfig = {
      sport,
      timerDurationSec,
      chainConquestMode,
      gridSize,
      seed,
      minAnswersPerHex: 5,
      players,
    };

    onStartGame(config);
  };

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '20px auto',
        padding: '30px 26px',
        backgroundColor: '#121929',
        border: '1px solid #1f2c42',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
      }}
      className="animate-pop-in"
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          Hex Possession Quiz
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Conquista territori a esagoni rispondendo alle categorie sportive. Fino a 4 giocatori!
        </p>
      </div>

      {/* Mode Selector */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
          Modalità di Gioco
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
          <button
            type="button"
            onClick={() => handleModeChange('vs_bot')}
            style={{
              padding: '12px 10px',
              borderRadius: '12px',
              border: mode === 'vs_bot' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'vs_bot' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px' }}>👤 1 Giocatore</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Tu vs Bot AI</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('hotseat_2p')}
            style={{
              padding: '12px 10px',
              borderRadius: '12px',
              border: mode === 'hotseat_2p' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'hotseat_2p' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px' }}>👥 2 Giocatori</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Sfida a 2 Hotseat</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('hotseat_3p')}
            style={{
              padding: '12px 10px',
              borderRadius: '12px',
              border: mode === 'hotseat_3p' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'hotseat_3p' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px' }}>👥 3 Giocatori</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Sfida a 3 Hotseat</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('hotseat_4p')}
            style={{
              padding: '12px 10px',
              borderRadius: '12px',
              border: mode === 'hotseat_4p' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'hotseat_4p' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px' }}>👥 4 Giocatori</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Tutti contro tutti</div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('bot_vs_bot')}
            style={{
              padding: '12px 10px',
              borderRadius: '12px',
              border: mode === 'bot_vs_bot' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: mode === 'bot_vs_bot' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px' }}>🤖 Bot vs Bot</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Spettatore AI</div>
          </button>
        </div>
      </div>

      {/* Customizable Players Panel */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
          Personalizza Giocatori (Colori ad Alto Contrasto & Daltonici)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'hotseat_4p' ? '1fr 1fr' : '1fr 1fr', gap: '10px' }}>
          {/* Player 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0c101a', padding: '8px 12px', borderRadius: '10px', border: `1px solid ${COLORBLIND_PALETTE[0].hex}` }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: COLORBLIND_PALETTE[0].hex, flexShrink: 0 }} />
            <input
              type="text"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="Nome Giocatore 1"
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontWeight: 700, fontSize: '13px', width: '100%', outline: 'none' }}
            />
          </div>

          {/* Player 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0c101a', padding: '8px 12px', borderRadius: '10px', border: `1px solid ${COLORBLIND_PALETTE[1].hex}` }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: COLORBLIND_PALETTE[1].hex, flexShrink: 0 }} />
            <input
              type="text"
              value={p2Name}
              onChange={(e) => setP2Name(e.target.value)}
              placeholder="Nome Giocatore 2"
              disabled={mode === 'vs_bot'}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontWeight: 700, fontSize: '13px', width: '100%', outline: 'none' }}
            />
          </div>

          {/* Player 3 (if 3p or 4p) */}
          {(mode === 'hotseat_3p' || mode === 'hotseat_4p') && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0c101a', padding: '8px 12px', borderRadius: '10px', border: `1px solid ${COLORBLIND_PALETTE[2].hex}` }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: COLORBLIND_PALETTE[2].hex, flexShrink: 0 }} />
              <input
                type="text"
                value={p3Name}
                onChange={(e) => setP3Name(e.target.value)}
                placeholder="Nome Giocatore 3"
                style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontWeight: 700, fontSize: '13px', width: '100%', outline: 'none' }}
              />
            </div>
          )}

          {/* Player 4 (if 4p) */}
          {mode === 'hotseat_4p' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0c101a', padding: '8px 12px', borderRadius: '10px', border: `1px solid ${COLORBLIND_PALETTE[3].hex}` }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: COLORBLIND_PALETTE[3].hex, flexShrink: 0 }} />
              <input
                type="text"
                value={p4Name}
                onChange={(e) => setP4Name(e.target.value)}
                placeholder="Nome Giocatore 4"
                style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontWeight: 700, fontSize: '13px', width: '100%', outline: 'none' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Grid Size Selection: 31 vs 37 Hexes */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
          Dimensione Griglia
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setGridSize('standard_31')}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: gridSize === 'standard_31' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: gridSize === 'standard_31' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '13px' }}>📐 31 Esagoni (Classica)</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              <strong>Veloce e densa:</strong> ~7.7 esagoni a testa per 4 giocatori, tanti furti continui.
            </div>
          </button>

          <button
            type="button"
            onClick={() => setGridSize('expanded_37')}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: gridSize === 'expanded_37' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: gridSize === 'expanded_37' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '13px' }}>⭐ 37 Esagoni (Espansa)</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '2px' }}>
              <strong>Consigliata per 3-4 giocatori:</strong> Più respiro, territori più ampi e maggiore tattica.
            </div>
          </button>
        </div>
      </div>

      {/* Sport Selector */}
      <div style={{ marginBottom: '22px' }}>
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
            ⚽ Calcio (273 Giocatori & Mister)
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
        <div style={{ marginBottom: '22px' }}>
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

      {/* Conquest Mode (Flood fill vs Direct) */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
          Regola di Conquista a Catena
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setChainConquestMode('flood_fill')}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: chainConquestMode === 'flood_fill' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: chainConquestMode === 'flood_fill' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '13px' }}>🔗 Catena Continua (Flood Fill)</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Conquista e ruba tutti gli esagoni connessi dal medesimo criterio (anche da più avversari).
            </div>
          </button>

          <button
            type="button"
            onClick={() => setChainConquestMode('direct')}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: chainConquestMode === 'direct' ? '2px solid #38bdf8' : '1px solid #1e293b',
              backgroundColor: chainConquestMode === 'direct' ? '#1a2740' : '#0c101a',
              color: '#ffffff',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '13px' }}>🎯 Adiacenza Diretta</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Conquista e ruba unicamente gli esagoni a contatto diretto con quello selezionato.
            </div>
          </button>
        </div>
      </div>

      {/* Timer and Seed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '26px' }}>
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
