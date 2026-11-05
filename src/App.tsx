import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GameConfig, GameState, MoveResult, Entity, Dataset } from './engine/types';
import { initGameState, applyMove, tick } from './engine/gameEngine';
import { validateBoard, BoardValidationResult } from './engine/boardValidation';
import { chooseBotMove } from './bot/botAgent';
import { FOOTBALL_DATASET } from './data/footballDataset';
import { BASKETBALL_DATASET } from './data/basketballDataset';

import { SetupScreen } from './components/SetupScreen';
import { ScoreboardHeader } from './components/ScoreboardHeader';
import { HexGridSVG } from './components/HexGridSVG';
import { AutocompleteSearch } from './components/AutocompleteSearch';
import { GameOverModal } from './components/GameOverModal';
import { CategoryLegend } from './components/CategoryLegend';

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null);
  const [previewEntity, setPreviewEntity] = useState<Entity | null>(null);
  const [lastMoveResult, setLastMoveResult] = useState<MoveResult | null>(null);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [hoveredLegendCatId, setHoveredLegendCatId] = useState<string | null>(null);
  const [showDebugConnections, setShowDebugConnections] = useState<boolean>(false);

  // Timer reference
  const lastTickTimeRef = useRef<number>(Date.now());

  // Determine current dataset based on config
  const currentDataset: Dataset =
    gameState?.config.sport === 'basketball' ? BASKETBALL_DATASET : FOOTBALL_DATASET;

  // Memoized Board Validation for runtime verification and debug inspection
  const boardValidation: BoardValidationResult | null = useMemo(() => {
    if (!gameState) return null;
    return validateBoard(gameState.board, currentDataset);
  }, [gameState?.board, currentDataset]);

  // Start a new game with configuration
  const handleStartGame = (config: GameConfig) => {
    const dataset = config.sport === 'basketball' ? BASKETBALL_DATASET : FOOTBALL_DATASET;
    const initial = initGameState(config, dataset);
    setGameState(initial);
    setSelectedHexId(null);
    setPreviewEntity(null);
    setLastMoveResult(null);
    setIsBotThinking(false);
  };

  // Rematch with incremented seed
  const handleRematch = () => {
    if (!gameState) return;
    const newConfig: GameConfig = {
      ...gameState.config,
      seed: Math.floor(gameState.config.seed + 1013),
    };
    handleStartGame(newConfig);
  };

  // Clock tick effect
  useEffect(() => {
    if (!gameState || gameState.phase !== 'playing') return;

    lastTickTimeRef.current = Date.now();
    const timerInterval = setInterval(() => {
      const now = Date.now();
      const dt = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;

      setGameState((prev) => {
        if (!prev || prev.phase !== 'playing') return prev;
        return tick(prev, dt);
      });
    }, 200);

    return () => clearInterval(timerInterval);
  }, [gameState?.phase]);

  // Bot Turn Effect
  useEffect(() => {
    if (!gameState || gameState.phase !== 'playing') return;

    const activePlayer = gameState.players[gameState.activePlayerIndex];
    if (activePlayer.isBot && !isBotThinking) {
      setIsBotThinking(true);
      setSelectedHexId(null);
      setPreviewEntity(null);

      // Realistic human-like thinking delay
      const thinkDelayMs = 1200 + Math.random() * 800;

      const timer = setTimeout(() => {
        try {
          const botMove = chooseBotMove(gameState, currentDataset);
          if (botMove) {
            const { nextState, result } = applyMove(gameState, botMove, currentDataset);
            setGameState(nextState);
            setLastMoveResult(result);
          }
        } catch (err) {
          console.error('Bot move error:', err);
        } finally {
          setIsBotThinking(false);
        }
      }, thinkDelayMs);

      return () => clearTimeout(timer);
    }
  }, [gameState, isBotThinking, currentDataset]);

  // Handle human move confirmation
  const handleConfirmHumanMove = (entityId: string) => {
    if (!gameState || !selectedHexId) return;

    const activePlayer = gameState.players[gameState.activePlayerIndex];
    try {
      const { nextState, result } = applyMove(
        gameState,
        {
          playerId: activePlayer.id,
          hexId: selectedHexId,
          entityId,
        },
        currentDataset
      );

      setGameState(nextState);
      setLastMoveResult(result);
      setSelectedHexId(null);
      setPreviewEntity(null);
    } catch (err) {
      console.error('Move failed:', err);
    }
  };

  // If in setup mode
  if (!gameState) {
    return (
      <main style={{ minHeight: '100vh', padding: '20px 16px' }}>
        <SetupScreen onStartGame={handleStartGame} />
      </main>
    );
  }

  const selectedHex = selectedHexId
    ? gameState.board.find((h) => h.id === selectedHexId)
    : null;

  const activePlayer = gameState.players[gameState.activePlayerIndex];

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Top Header & Scoreboard */}
      <ScoreboardHeader
        state={gameState}
        lastMoveResult={lastMoveResult}
        onNewGameClick={() => setGameState(null)}
        isBotThinking={isBotThinking}
        isDebugActive={showDebugConnections}
        onToggleDebug={() => setShowDebugConnections((prev) => !prev)}
      />

      {/* Debug Panel: Summary of Adjacency Connectivity */}
      {showDebugConnections && boardValidation && (
        <div
          style={{
            width: '100%',
            maxWidth: '1080px',
            margin: '0 auto 12px auto',
            padding: '12px 18px',
            backgroundColor: '#0f172a',
            border: '1px solid #1e3a8a',
            borderRadius: '12px',
            color: '#e2e8f0',
            fontSize: '13px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px' }}>{boardValidation.isValid ? '✅' : '❌'}</span>
              <strong style={{ color: '#f1f5f9' }}>Validazione Tabella:</strong>
              <span
                style={{
                  color: boardValidation.isValid ? '#34d399' : '#f87171',
                  fontWeight: 700,
                }}
              >
                {boardValidation.isValid
                  ? `100% VALIDA (${boardValidation.connectedPairs}/${boardValidation.totalAdjacentPairs} coppie adiacenti connesse)`
                  : `${boardValidation.disjointPairs.length} coppie senza collegamenti!`}
              </span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>
              Seed: <code>{gameState.config.seed}</code> | Min risposte per cella:{' '}
              <code>{gameState.config.minAnswersPerHex ?? 5}</code>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '12px',
              color: '#cbd5e1',
            }}
          >
            {(() => {
              const counts = Object.values(boardValidation.connectionCounts);
              const min = counts.length > 0 ? Math.min(...counts) : 0;
              const max = counts.length > 0 ? Math.max(...counts) : 0;
              const avg =
                counts.length > 0
                  ? (counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(1)
                  : '0';
              return (
                <>
                  <span>
                    Minimo per coppia:{' '}
                    <strong style={{ color: min >= 1 ? '#34d399' : '#f87171' }}>{min}</strong>
                  </span>
                  <span>
                    Massimo per coppia: <strong style={{ color: '#38bdf8' }}>{max}</strong>
                  </span>
                  <span>
                    Media collegamenti: <strong style={{ color: '#fbbf24' }}>{avg}</strong>
                  </span>
                  <span style={{ color: '#94a3b8' }}>
                    💡 I cerchietti con i numeri indicano quante entità collegano le due caselle
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Main Board Viewport */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <HexGridSVG
          board={gameState.board}
          players={gameState.players}
          selectedHexId={selectedHexId}
          onSelectHex={(hexId) => {
            if (!activePlayer.isBot) {
              setSelectedHexId(hexId);
              setPreviewEntity(null);
            }
          }}
          previewEntity={previewEntity}
          activePlayer={activePlayer}
          chainConquestMode={gameState.config.chainConquestMode}
          hoveredLegendCatId={hoveredLegendCatId}
          isBotThinking={isBotThinking}
          showDebugConnections={showDebugConnections}
          connectionCounts={boardValidation?.connectionCounts}
        />

        {/* Legend of abbreviations at the bottom of the board */}
        <CategoryLegend
          board={gameState.board}
          onHoverCategory={setHoveredLegendCatId}
        />

        {/* Search Modal / Tray when a neutral hex is clicked */}
        {selectedHex && !activePlayer.isBot && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92%',
              maxWidth: '520px',
              zIndex: 50,
            }}
          >
            <AutocompleteSearch
              entities={currentDataset.entities}
              usedEntityIds={gameState.usedEntityIds}
              selectedHex={selectedHex}
              activePlayer={activePlayer}
              onConfirmMove={handleConfirmHumanMove}
              onPreviewEntity={setPreviewEntity}
              onCancel={() => {
                setSelectedHexId(null);
                setPreviewEntity(null);
              }}
            />
          </div>
        )}
      </div>

      {/* Game Over Screen */}
      {gameState.phase === 'game_over' && (
        <GameOverModal
          state={gameState}
          onRematch={handleRematch}
          onNewSetup={() => setGameState(null)}
        />
      )}
    </main>
  );
};

export default App;
