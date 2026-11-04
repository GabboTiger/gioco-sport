import React from 'react';
import { GameState } from '../engine/types';
import { getScoreSummary } from '../engine/gameEngine';

interface GameOverModalProps {
  state: GameState;
  onRematch: () => void;
  onNewSetup: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ state, onRematch, onNewSetup }) => {
  const { scores } = getScoreSummary(state);
  const winner = state.winnerId === 'tie' ? null : state.players.find((p) => p.id === state.winnerId);

  // Compute total steals
  let totalSteals = 0;
  for (const h of state.history) {
    totalSteals += h.stolenHexIds.length;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#121929',
          border: '1px solid #273854',
          borderRadius: '24px',
          padding: '36px 30px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        }}
        className="animate-pop-in"
      >
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {winner ? '🏆' : '🤝'}
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          {winner ? `Vince ${winner.name}!` : 'Pareggio!'}
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px', marginBottom: '24px' }}>
          {winner
            ? `Ha conquistato il controllo della mappa di gioco!`
            : 'Nessun vincitore in tempo regolamentare.'}
        </p>

        {/* Score Breakdown */}
        <div
          style={{
            backgroundColor: '#0c101a',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {state.players.map((p) => {
            const count = scores[p.id] ?? 0;
            const isWinner = p.id === state.winnerId;

            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  backgroundColor: isWinner ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: p.color,
                    }}
                  />
                  <span style={{ fontWeight: 700, color: '#f8fafc' }}>{p.name}</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: p.color }}>
                  {count} esagoni
                </div>
              </div>
            );
          })}

          <div
            style={{
              borderTop: '1px solid #1e293b',
              paddingTop: '10px',
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#64748b',
            }}
          >
            <span>Mosse giocate: {state.turnCount}</span>
            <span>Totale furti: {totalSteals} 🔥</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onNewSetup}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid #334155',
              backgroundColor: 'transparent',
              color: '#cbd5e1',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Impostazioni
          </button>

          <button
            onClick={onRematch}
            style={{
              flex: 1.5,
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#38bdf8',
              color: '#0b1120',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(56, 189, 248, 0.35)',
            }}
          >
            🔄 Rivincita
          </button>
        </div>
      </div>
    </div>
  );
};
