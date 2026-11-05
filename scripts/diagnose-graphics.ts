import { generate31HexCoords, generate37HexCoords, axialToPixel } from '../src/engine/hexGrid';

console.log('--- DIAGNOSI DIMENSIONI SCACCHIERA E VIEWBOX ---');
const coords31 = generate31HexCoords();
const coords37 = generate37HexCoords();

function getBounds(coords: Array<{ q: number; r: number }>, radius: number) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const c of coords) {
    const { x, y } = axialToPixel(c, radius, 0, 0);
    minX = Math.min(minX, x - radius);
    maxX = Math.max(maxX, x + radius);
    minY = Math.min(minY, y - radius);
    maxY = Math.max(maxY, y + radius);
  }
  return {
    width: maxX - minX,
    height: maxY - minY,
    minX, maxX, minY, maxY
  };
}

const bounds31 = getBounds(coords31, 56);
const bounds37 = getBounds(coords37, 56);

console.log('31 Esagoni Bounds (r=56): width =', bounds31.width.toFixed(1), 'height =', bounds31.height.toFixed(1));
console.log('37 Esagoni Bounds (r=56): width =', bounds37.width.toFixed(1), 'height =', bounds37.height.toFixed(1));

// Test clamping dello zoom
function clampZoom(scale: number, min = 0.6, max = 2.5) {
  return Math.max(min, Math.min(max, scale));
}
console.log('Zoom clamp test: 0.4 ->', clampZoom(0.4), '3.0 ->', clampZoom(3.0), '1.2 ->', clampZoom(1.2));
