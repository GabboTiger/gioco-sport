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
  const totalHexes = state.board.length;

  // Determine next player in rotation who still has time
  const nextPlayer = (() => {
    let nextIdx = (state.activePlayerIndex + 1) % state.players.length;
    let checks = 0;
    while (state.players[nextIdx].timeRemainingMs <= 0 && checks < state.players.length) {
      nextIdx = (nextIdx + 1) % state.players.length;
      checks++;
    }
    return state.players[nextIdx];
  })();

  // Format milliseconds into MM:SS
  const formatTimer = (ms: number): string => {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isLowTime = activePlayer.timeRemainingMs < 10000 && activePlayer.timeRemainingMs > 0;

  return (
    <header
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto 16px auto',
        padding: '16px 22px',
        backgroundColor: 'rgba(18, 25, 41, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #1f2c42',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.55)',
        position: 'sticky',
        top: '8px',
        zIndex: 40,
      }}
    >
      {/* Top row: Brand Title, Turn & Clock Banner, and Controls */}
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
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: activePlayer.color,
              boxShadow: `0 0 12px ${activePlayer.color}`,
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
          />
          <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff' }}>
            HEX TERRITORY QUIZ
          </h1>
        </div>

        {/* Turn & Clock Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#0c101a',
            padding: '7px 18px',
            borderRadius: '30px',
            border: `2px solid ${activePlayer.color}`,
            boxShadow: `0 0 16px ${activePlayer.color}25`,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>TURNO:</span>
            <span style={{ fontWeight: 800, color: activePlayer.color, fontSize: '16px' }}>
              {activePlayer.name} {activePlayer.isBot ? '🤖' : ''}
            </span>
            {state.players.length > 2 && (
              <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '2px' }}>
                (poi {nextPlayer.name})
              </span>
            )}
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '20px',
              fontWeight: 800,
              color: isLowTime ? '#f43f5e' : '#f8fafc',
              animation: isLowTime ? 'pulseGlow 1s infinite' : 'none',
              minWidth: '70px',
              textAlign: 'center',
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
              Bot pensa...
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
            ⚙️ Setup
          </button>
        </div>
      </div>

      {/* Middle row: Live Scoreboard Cards with ScoreBump Animation */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(130px, 1fr))`,
          gap: '10px',
        }}
      >
        {state.players.map((p, idx) => {
          const isActive = idx === state.activePlayerIndex;
          const isTimedOut = p.timeRemainingMs <= 0;
          const isNext = p.id === nextPlayer.id && !isActive && !isTimedOut;
          const score = scores[p.id] ?? 0;
          const pct = Math.round((score / totalHexes) * 100);

          return (
            <div
              key={p.id}
              style={{
                backgroundColor: isActive ? 'rgba(26, 36, 56, 0.95)' : '#0e1422',
                border: isActive
                  ? `2px solid ${p.color}`
                  : isTimedOut
                  ? '1px solid #7f1d1d'
                  : '1px solid #1a2538',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                opacity: isTimedOut ? 0.55 : 1,
                boxShadow: isActive ? `0 0 16px ${p.color}33` : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: p.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor: p.color,
                      flexShrink: 0,
                    }}
                  />
                  <span>{p.name}</span>
                </div>

                {isTimedOut ? (
                  <span
                    style={{
                      fontSize: '9px',
                      color: '#f87171',
                      fontWeight: 800,
                      backgroundColor: '#450a0a',
                      padding: '1px 5px',
                      borderRadius: '4px',
                    }}
                  >
                    OUT
                  </span>
                ) : isActive ? (
                  <span
                    style={{
                      fontSize: '9px',
                      color: p.color,
                      fontWeight: 800,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                    }}
                  >
                    ▶ IN TURNO
                  </span>
                ) : isNext && state.players.length > 2 ? (
                  <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>
                    POI
                  </span>
                ) : null}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                {/* Score value with remount key to trigger scoreBump animation */}
                <span
                  key={score}
                  className="score-bump"
                  style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}
                >
                  {score}
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  {pct}% ({totalHexes})
                </span>
              </div>
            </div>
          );
        })}

        {/* Neutral Hexes Count Card */}
        <div
          style={{
            backgroundColor: '#0e1422',
            border: '1px solid #1a2538',
            borderRadius: '12px',
            padding: '10px 14px',
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
            <span
              key={neutralCount}
              className="score-bump"
              style={{ fontSize: '28px', fontWeight: 900, color: '#94a3b8' }}
            >
              {neutralCount}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
              liberi
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: Live Move Ticker */}
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
