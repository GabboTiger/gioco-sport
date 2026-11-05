import React, { useMemo, useState, useRef, useCallback } from 'react';
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
  const viewBoxWidth = 920;
  const viewBoxHeight = 820;
  const originX = viewBoxWidth / 2;
  const originY = viewBoxHeight / 2;

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef<boolean>(false);
  const initialTouchDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(1.0);

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

  // Helper to split labels into short, readable lines that fit cleanly inside the hexagon
  const formatLabel = (category: { shortLabel?: string; label: string }): string[] => {
    const text = category.shortLabel || category.label;
    const words = text.split(' ');

    if (words.length === 1) {
      return [words[0]];
    }

    if (words.length === 2) {
      return [words[0], words[1]];
    }

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

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(2.5, +(prev + 0.2).toFixed(2)));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.6, +(prev - 0.2).toFixed(2)));
  const handleResetView = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((prev) => Math.max(0.6, Math.min(2.5, +(prev * factor).toFixed(2))));
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with primary left button
    if (e.button !== 0) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasDraggedRef.current = true;
      }
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    },
    [isDragging, panStartRef]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch handlers (Pan & Pinch-to-zoom)
  const getTouchDist = (e: React.TouchEvent): number | null => {
    if (e.touches.length < 2) return null;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialTouchDistRef.current = getTouchDist(e);
      initialZoomRef.current = zoom;
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDistRef.current !== null) {
      const dist = getTouchDist(e);
      if (dist) {
        const factor = dist / initialTouchDistRef.current;
        setZoom(Math.max(0.6, Math.min(2.5, +(initialZoomRef.current * factor).toFixed(2))));
      }
    } else if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasDraggedRef.current = true;
      }
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialTouchDistRef.current = null;
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: '20px',
        backgroundColor: '#0a0e17',
        border: '1px solid #1a2538',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating Zoom & Pan Controls Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(10px)',
          padding: '6px 10px',
          borderRadius: '12px',
          border: '1px solid #1e293b',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        <button
          type="button"
          onClick={handleZoomIn}
          title="Ingrandisci"
          style={{
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          ➕
        </button>

        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#94a3b8',
            minWidth: '42px',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={handleZoomOut}
          title="Riduci"
          style={{
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          ➖
        </button>

        <button
          type="button"
          onClick={handleResetView}
          title="Ripristina Vista"
          style={{
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#38bdf8',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ↺ Ripristina
        </button>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{
          width: '100%',
          height: 'auto',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        <defs>
          <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
          <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.9" />
          </filter>
          <filter id="stealGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f43f5e" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Scaled and Panned World Group */}
        <g
          transform={`translate(${originX + pan.x}, ${originY + pan.y}) scale(${zoom}) translate(${-originX}, ${-originY})`}
          style={{ transition: isDragging ? 'none' : 'transform 0.15s ease-out' }}
        >
          {board.map((cell) => {
            const { x, y } = axialToPixel(cell, hexRadius, originX, originY);
            const points = getHexagonPolygonPoints(x, y, hexRadius - 2.5);

            const isSelected = selectedHexId === cell.id;
            const isNeutral = cell.ownerId === null;
            const owner = cell.ownerId ? playerMap.get(cell.ownerId) : null;

            const isPreviewConquered = previewImpact.conqueredIds.has(cell.id);
            const isPreviewStolen = previewImpact.stolenIds.has(cell.id);

            // Dynamic colors
            let fillColor = '#141c2c';
            let strokeColor = '#24344d';
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
                  if (!hasDraggedRef.current && isNeutral && !isBotThinking) {
                    onSelectHex(cell.id);
                  }
                }}
                style={{
                  cursor: isNeutral && !isBotThinking ? 'pointer' : 'default',
                  transition: 'transform 0.15s ease',
                }}
                className="hex-cell-group"
              >
                <title>
                  {cell.category.label}{' '}
                  {cell.category.description ? `— ${cell.category.description}` : ''}
                </title>

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
                  fillOpacity={owner ? 0.9 : 0.95}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter={filter}
                  style={{
                    transition: 'fill 0.3s ease, stroke 0.2s ease',
                  }}
                />

                {/* Owner Indicator Dot */}
                {owner && (
                  <circle
                    cx={x}
                    cy={y - hexRadius + 14}
                    r={5.5}
                    fill="#ffffff"
                    filter="drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
                  />
                )}

                {/* Steal Banner Pill */}
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

                {/* Category Label Text with dark stroke outline for 100% legibility */}
                <text
                  x={x}
                  y={y - (lines.length > 1 ? (lines.length - 1) * (lineHeight / 2) : 0)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={owner ? '#ffffff' : '#f8fafc'}
                  stroke="#070a12"
                  strokeWidth="2.5"
                  paintOrder="stroke fill"
                  fontSize={fontSize}
                  fontWeight="800"
                  style={{
                    pointerEvents: 'none',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {lines.map((line, idx) => (
                    <tspan key={idx} x={x} dy={idx === 0 ? 0 : lineHeight}>
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
        </g>
      </svg>
    </div>
  );
};
