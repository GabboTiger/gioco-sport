import React from 'react';
import { GameState, MoveResult } from '../engine/types';
import { getScoreSummary } from '../engine/gameEngine';

interface ScoreboardHeaderProps {
  state: GameState;
  lastMoveResult: MoveResult | null;
  onNewGameClick: () => void;
  isBotThinking?: boolean;
  isDebugActive?: boolean;
  onToggleDebug?: () => void;
}

export const ScoreboardHeader: React.FC<ScoreboardHeaderProps> = ({
  state,
  lastMoveResult,
  onNewGameClick,
  isBotThinking,
  isDebugActive = false,
  onToggleDebug,
}) => {
  const { scores, neutralCount } = getScoreSummary(state);
  const activePlayer = state.players[state.activePlayerIndex];

  // Format milliseconds into MM:SS
  const formatTimer = (ms: number): string => {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header
      style={{
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto 16px auto',
        padding: '16px 20px',
        backgroundColor: '#121929',
        border: '1px solid #1e2c44',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top row: Title, Active Turn, and New Game Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8',
            }}
          />
          <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            HEX TERRITORY QUIZ
          </h1>
        </div>

        {/* Turn & Clock Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#0c101a',
            padding: '6px 16px',
            borderRadius: '30px',
            border: `2px solid ${activePlayer.color}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>TURNO:</span>
            <span style={{ fontWeight: 800, color: activePlayer.color, fontSize: '15px' }}>
              {activePlayer.name} {activePlayer.isBot ? '🤖' : ''}
            </span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 700,
              color: activePlayer.timeRemainingMs < 10000 ? '#f43f5e' : '#f8fafc',
            }}
          >
            ⏱️ {formatTimer(activePlayer.timeRemainingMs)}
          </div>

          {isBotThinking && (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#38bdf8',
                animation: 'pulseGlow 1.5s infinite',
              }}
            >
              Il bot sta pensando...
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {onToggleDebug && (
            <button
              onClick={onToggleDebug}
              title="Mostra numero di entità condivise tra caselle adiacenti"
              style={{
                padding: '8px 12px',
                backgroundColor: isDebugActive ? '#1e3a8a' : '#1e293b',
                border: isDebugActive ? '1px solid #38bdf8' : '1px solid #334155',
                color: isDebugActive ? '#38bdf8' : '#94a3b8',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🛠️ Debug {isDebugActive ? 'ON' : 'OFF'}
            </button>
          )}

          <button
            onClick={onNewGameClick}
            style={{
              padding: '8px 14px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#cbd5e1',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            ⚙️ Nuova Partita
          </button>
        </div>
      </div>

      {/* Middle row: Live Scoreboard Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${state.players.length + 1}, 1fr)`,
          gap: '10px',
        }}
      >
        {state.players.map((p, idx) => {
          const isActive = idx === state.activePlayerIndex;
          const score = scores[p.id] ?? 0;
          const pct = Math.round((score / 31) * 100);

          return (
            <div
              key={p.id}
              style={{
                backgroundColor: isActive ? '#1a2438' : '#0e1422',
                border: isActive ? `2px solid ${p.color}` : '1px solid #1a2538',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'border-color 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: p.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: p.color,
                  }}
                />
                {p.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 800 }}>{score}</span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  {pct}% (31)
                </span>
              </div>
            </div>
          );
        })}

        {/* Neutral Hexes Count */}
        <div
          style={{
            backgroundColor: '#0e1422',
            border: '1px solid #1a2538',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
            ⚪ Esagoni Neutri
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#94a3b8' }}>
              {neutralCount}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
              rimasti
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: Last Action Ticker */}
      {lastMoveResult && (
        <div
          style={{
            backgroundColor: '#0c101a',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>⚡</span>
          <span>
            Ultima mossa: Giocatore{' '}
            <strong style={{ color: '#f8fafc' }}>{lastMoveResult.move.entityId}</strong> ha
            conquistato <strong>{lastMoveResult.conqueredHexIds.length}</strong> esagoni
            {lastMoveResult.stolenHexIds.length > 0 && (
              <span style={{ color: '#f43f5e', fontWeight: 800 }}>
                {' '}
                (di cui {lastMoveResult.stolenHexIds.length} rubati agli avversari!)
              </span>
            )}
            .
          </span>
        </div>
      )}
    </header>
  );
};
