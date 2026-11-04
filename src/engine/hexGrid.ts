import { AxialCoord, HexCell } from './types';

/**
 * Standard Axial Hex Directions (pointy-topped & flat-topped)
 * 6 adjacent directions in axial (q, r) space.
 */
export const AXIAL_DIRECTIONS: readonly AxialCoord[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
] as const;

export function axialDistance(a: AxialCoord, b: AxialCoord): number {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
}

export function areAxialEqual(a: AxialCoord, b: AxialCoord): number | boolean {
  return a.q === b.q && a.r === b.r;
}

export function getAxialNeighbors(coord: AxialCoord): AxialCoord[] {
  return AXIAL_DIRECTIONS.map((dir) => ({
    q: coord.q + dir.q,
    r: coord.r + dir.r,
  }));
}

/**
 * The 6 extreme corner coordinates of a radius-3 hexagonal grid.
 */
const RADIUS_3_CORNERS: AxialCoord[] = [
  { q: 3, r: 0 },
  { q: 0, r: 3 },
  { q: -3, r: 3 },
  { q: -3, r: 0 },
  { q: 0, r: -3 },
  { q: 3, r: -3 },
];

function isCornerRadius3(q: number, r: number): boolean {
  return RADIUS_3_CORNERS.some((c) => c.q === q && c.r === r);
}

/**
 * Generates the standard 31-hexagon board layout.
 * Derived from a radius-3 regular hexagonal grid (37 hexes) with the 6 extreme pointy corners removed.
 * Returns exactly 31 axial coordinates sorted deterministically.
 */
export function generate31HexCoords(): AxialCoord[] {
  const coords: AxialCoord[] = [];
  const radius = 3;

  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      if (!isCornerRadius3(q, r)) {
        coords.push({ q, r });
      }
    }
  }

  // Sort top-to-bottom, left-to-right for consistent rendering order
  coords.sort((a, b) => {
    if (a.r !== b.r) return a.r - b.r;
    return a.q - b.q;
  });

  return coords;
}

/**
 * Finds adjacent cells in a board for a given cell ID.
 */
export function getAdjacentCells(cellId: string, board: HexCell[]): HexCell[] {
  const cell = board.find((c) => c.id === cellId);
  if (!cell) return [];

  const neighborCoords = getAxialNeighbors(cell);
  return board.filter((candidate) =>
    neighborCoords.some((n) => n.q === candidate.q && n.r === candidate.r)
  );
}

/**
 * Converts axial coordinates to 2D pixel coordinates for SVG rendering.
 * Pointy-topped hexagon projection.
 */
export function axialToPixel(coord: AxialCoord, size: number, originX: number, originY: number): { x: number; y: number } {
  const x = originX + size * (Math.sqrt(3) * coord.q + (Math.sqrt(3) / 2) * coord.r);
  const y = originY + size * ((3 / 2) * coord.r);
  return { x, y };
}

/**
 * Returns the SVG polygon points string for a pointy-topped hexagon centered at (x, y) with given radius.
 */
export function getHexagonPolygonPoints(cx: number, cy: number, radius: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 30; // Pointy topped: -30, 30, 90, 150, 210, 270
    const angleRad = (Math.PI / 180) * angleDeg;
    const px = cx + radius * Math.cos(angleRad);
    const py = cy + radius * Math.sin(angleRad);
    points.push(`${px.toFixed(2)},${py.toFixed(2)}`);
  }
  return points.join(' ');
}
