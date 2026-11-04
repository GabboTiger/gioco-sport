import React, { useState, useEffect, useRef } from 'react';
import { GameConfig, GameState, MoveResult, Entity, Dataset } from './engine/types';
import { initGameState, applyMove, tick } from './engine/gameEngine';
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

  // Timer reference
  const lastTickTimeRef = useRef<number>(Date.now());

  // Determine current dataset based on config
  const currentDataset: Dataset =
    gameState?.config.sport === 'basketball' ? BASKETBALL_DATASET : FOOTBALL_DATASET;

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
      />

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
