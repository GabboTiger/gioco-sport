import React, { useMemo } from 'react';
import { HexCell, Player, Entity } from '../engine/types';
import { axialToPixel, getHexagonPolygonPoints, getAdjacentCells } from '../engine/hexGrid';
import { calculateConquestImpact } from '../engine/gameEngine';

interface HexGridSVGProps {
  board: HexCell[];
  players: Player[];
  selectedHexId: string | null;
  onSelectHex: (hexId: string) => void;
  previewEntity: Entity | null;
  activePlayer: Player;
  chainConquestMode?: 'direct' | 'flood_fill';
  hoveredLegendCatId?: string | null;
  isBotThinking?: boolean;
  showDebugConnections?: boolean;
  connectionCounts?: Record<string, number>;
}

export const HexGridSVG: React.FC<HexGridSVGProps> = ({
  board,
  players,
  selectedHexId,
  onSelectHex,
  previewEntity,
  activePlayer,
  chainConquestMode = 'flood_fill',
  hoveredLegendCatId,
  isBotThinking,
  showDebugConnections = false,
  connectionCounts = {},
}) => {
  const hexRadius = 56;
  const viewBoxWidth = 860;
  const viewBoxHeight = 780;
  const originX = viewBoxWidth / 2;
  const originY = viewBoxHeight / 2;

  const playerMap = useMemo(() => {
    const map = new Map<string, Player>();
    for (const p of players) map.set(p.id, p);
    return map;
  }, [players]);

  // Compute which hexes will be conquered or stolen if previewEntity is confirmed on selectedHexId
  const previewImpact = useMemo(() => {
    if (!previewEntity || !selectedHexId) {
      return { conqueredIds: new Set<string>(), stolenIds: new Set<string>() };
    }

    const { conqueredHexIds, stolenHexIds } = calculateConquestImpact(
      selectedHexId,
      previewEntity,
      board,
      activePlayer.id,
      chainConquestMode
    );

    return {
      conqueredIds: new Set(conqueredHexIds),
      stolenIds: new Set(stolenHexIds),
    };
  }, [previewEntity, selectedHexId, board, activePlayer.id, chainConquestMode]);

  // Helper to split labels into 1-2 short, readable lines that fit cleanly inside the hexagon
  const formatLabel = (category: { shortLabel?: string; label: string }): string[] => {
    const text = category.shortLabel || category.label;
    const words = text.split(' ');

    if (words.length === 1) {
      return [words[0]];
    }

    if (words.length === 2) {
      // e.g. "R. Madrid", "Man. Utd", "Italia 🇮🇹", "UCL 🏆"
      return [words[0], words[1]];
    }

    // 3 or more words: e.g. "BVB Dortmund", "Pall. d'Oro 🥇"
    if (words.length === 3) {
      return [`${words[0]} ${words[1]}`, words[2]];
    }

    return [`${words[0]} ${words[1]}`, words.slice(2).join(' ')];
  };

  // Precompute unique adjacent edges for debug mode
  const adjacentEdges = useMemo(() => {
    if (!showDebugConnections) return [];

    const edges: Array<{
      key: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      midX: number;
      midY: number;
      count: number;
      cellAId: string;
      cellBId: string;
    }> = [];
    const seen = new Set<string>();

    for (const cellA of board) {
      const posA = axialToPixel(cellA, hexRadius, originX, originY);
      const neighbors = getAdjacentCells(cellA.id, board);

      for (const cellB of neighbors) {
        const pairKey = [cellA.id, cellB.id].sort().join(' <-> ');
        if (seen.has(pairKey)) continue;
        seen.add(pairKey);

        const posB = axialToPixel(cellB, hexRadius, originX, originY);
        const count = connectionCounts[pairKey] ?? 0;

        edges.push({
          key: pairKey,
          x1: posA.x,
          y1: posA.y,
          x2: posB.x,
          y2: posB.y,
          midX: (posA.x + posB.x) / 2,
          midY: (posA.y + posB.y) / 2,
          count,
          cellAId: cellA.id,
          cellBId: cellB.id,
        });
      }
    }
    return edges;
  }, [board, showDebugConnections, connectionCounts, hexRadius, originX, originY]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{
          width: '100%',
          height: 'auto',
          filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6))',
          touchAction: 'manipulation',
        }}
      >
        <defs>
          <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
          </filter>
          <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.9" />
          </filter>
          <filter id="stealGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f43f5e" floodOpacity="0.9" />
          </filter>
        </defs>

        {board.map((cell) => {
          const { x, y } = axialToPixel(cell, hexRadius, originX, originY);
          const points = getHexagonPolygonPoints(x, y, hexRadius - 2.5);

          const isSelected = selectedHexId === cell.id;
          const isNeutral = cell.ownerId === null;
          const owner = cell.ownerId ? playerMap.get(cell.ownerId) : null;

          const isPreviewConquered = previewImpact.conqueredIds.has(cell.id);
          const isPreviewStolen = previewImpact.stolenIds.has(cell.id);

          // Dynamic colors
          let fillColor = '#161f30';
          let strokeColor = '#2d3b55';
          let strokeWidth = 2;
          let filter = 'url(#hexShadow)';

          if (owner) {
            fillColor = owner.color;
            strokeColor = '#ffffff';
            strokeWidth = 2.5;
          }

          if (isNeutral && isSelected) {
            strokeColor = '#38bdf8';
            strokeWidth = 4;
            filter = 'url(#activeGlow)';
          }

          if (isPreviewStolen) {
            strokeColor = '#f43f5e';
            strokeWidth = 4;
            filter = 'url(#stealGlow)';
          } else if (isPreviewConquered && !isSelected) {
            strokeColor = '#34d399';
            strokeWidth = 3.5;
          }

          const isHoveredFromLegend = hoveredLegendCatId === cell.category.id;

          if (isHoveredFromLegend) {
            strokeColor = '#fbbf24';
            strokeWidth = 3.5;
            filter = 'url(#activeGlow)';
          }

          const lines = formatLabel(cell.category);
          const maxLineLen = Math.max(...lines.map((l) => l.length));
          const fontSize = maxLineLen > 11 ? 9.5 : maxLineLen > 8 ? 11 : 12;
          const lineHeight = fontSize + 4;

          return (
            <g
              key={cell.id}
              onClick={() => {
                if (isNeutral && !isBotThinking) {
                  onSelectHex(cell.id);
                }
              }}
              style={{
                cursor: isNeutral && !isBotThinking ? 'pointer' : 'default',
                transition: 'transform 0.15s ease',
              }}
              className="hex-cell-group"
            >
              <title>{cell.category.label} {cell.category.description ? `— ${cell.category.description}` : ''}</title>

              {/* Outer selection pulse circle if active */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={hexRadius + 4}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.8"
                />
              )}

              {/* Main Hexagon Polygon */}
              <polygon
                points={points}
                fill={fillColor}
                fillOpacity={owner ? 0.88 : 0.95}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                filter={filter}
                style={{
                  transition: 'fill 0.3s ease, stroke 0.2s ease',
                }}
              />

              {/* Owner / Preview Pill Indicator */}
              {owner && (
                <circle
                  cx={x}
                  cy={y - hexRadius + 14}
                  r={5}
                  fill="#ffffff"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                />
              )}

              {isPreviewStolen && (
                <g transform={`translate(${x - 22}, ${y - hexRadius + 6})`}>
                  <rect width="44" height="15" rx="7" fill="#f43f5e" />
                  <text
                    x="22"
                    y="11"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="800"
                  >
                    RUBA!
                  </text>
                </g>
              )}

              {/* Category Label Text */}
              <text
                x={x}
                y={y - (lines.length > 1 ? (lines.length - 1) * (lineHeight / 2) : 0)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={owner ? '#ffffff' : '#f1f5f9'}
                fontSize={fontSize}
                fontWeight="700"
                style={{
                  pointerEvents: 'none',
                  textShadow: '0 2px 4px rgba(0,0,0,0.9)',
                  letterSpacing: '-0.2px',
                }}
              >
                {lines.map((line, idx) => (
                  <tspan
                    key={idx}
                    x={x}
                    dy={idx === 0 ? 0 : lineHeight}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Debug Mode: Show Connection Counts and Links between All Adjacent Hexes */}
        {showDebugConnections &&
          adjacentEdges.map((edge) => {
            const isHighlighted =
              selectedHexId === edge.cellAId || selectedHexId === edge.cellBId;
            const isZero = edge.count === 0;

            return (
              <g key={edge.key} style={{ pointerEvents: 'none' }}>
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={isZero ? '#ef4444' : isHighlighted ? '#38bdf8' : '#334155'}
                  strokeWidth={isZero ? 2.5 : isHighlighted ? 2.5 : 1}
                  strokeDasharray={isZero ? 'none' : isHighlighted ? 'none' : '3 3'}
                  opacity={isHighlighted ? 0.95 : isZero ? 0.9 : 0.45}
                />
                <circle
                  cx={edge.midX}
                  cy={edge.midY}
                  r={isHighlighted ? 12 : 9.5}
                  fill="#0b0f19"
                  stroke={isZero ? '#ef4444' : isHighlighted ? '#38bdf8' : '#10b981'}
                  strokeWidth={isHighlighted ? 2 : 1.2}
                />
                <text
                  x={edge.midX}
                  y={edge.midY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isZero ? '#f87171' : isHighlighted ? '#ffffff' : '#34d399'}
                  fontSize={isHighlighted ? '10.5' : '8.5'}
                  fontWeight="800"
                >
                  {edge.count}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
};
