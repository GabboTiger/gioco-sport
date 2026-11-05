/**
 * Core Data Models & Game Types
 * Pure TypeScript definitions with zero DOM/UI dependencies.
 */

export type EntityType = 'player' | 'coach';

export interface EntityAttributes {
  teams?: string[];
  managedTeams?: string[];
  nationalities?: string[];
  honours?: string[];
  positions?: string[];
  leagues?: string[];
  [key: string]: unknown;
}

export interface Entity {
  id: string;
  name: string;
  aliases?: string[];
  type: EntityType;
  sport: string;
  attributes: EntityAttributes;
  popularity: number; // 1 to 100
  metadata?: {
    displayClub?: string;
    displayNationality?: string;
    displayRole?: string;
    era?: string;
  };
}

export type CategoryType = 'team' | 'nationality' | 'honour' | 'position' | 'league' | 'role' | 'custom';

export interface Category {
  id: string;
  label: string;
  shortLabel?: string;
  sport: string;
  type: CategoryType;
  description?: string;
  attributeKey: string;
  expectedValue: string | string[];
  matchRule?: 'any' | 'all' | 'exact';
}

export interface Dataset {
  sport: string;
  name: string;
  entities: Entity[];
  categories: Category[];
}

/**
 * Hexagonal Grid Coordinates (Axial coordinate system: q, r)
 * In axial coordinates:
 * - q = column axis (diagonal southeast)
 * - r = row axis (vertical south)
 * The third cube coordinate is s = -q - r.
 * Distance from origin (0,0) is max(|q|, |r|, |q+r|).
 */
export interface AxialCoord {
  q: number;
  r: number;
}

export interface HexCell extends AxialCoord {
  id: string;
  category: Category;
  ownerId: string | null; // null = neutral
  conqueredOnTurn?: number;
}

export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  color: string;
  timeRemainingMs: number;
  isBot: boolean;
  botDifficulty?: BotDifficulty;
}

export type GamePhase = 'setup' | 'playing' | 'game_over';

export interface GameMove {
  playerId: string;
  hexId: string;
  entityId: string;
  timestamp?: number;
}

export interface MoveResult {
  move: GameMove;
  conqueredHexIds: string[]; // Newly conquered or stolen hexes
  stolenHexIds: string[];    // Specifically stolen from opponents
}

export interface GameConfig {
  sport: string;
  timerDurationSec: number;
  chainConquestMode?: 'direct' | 'flood_fill'; // 'flood_fill' connects chained matching hexes even if not directly touching origin
  players: Array<{
    name: string;
    color: string;
    isBot: boolean;
    botDifficulty?: BotDifficulty;
  }>;
  seed: number;
  minAnswersPerHex?: number;
}

export interface GameState {
  config: GameConfig;
  board: HexCell[];
  players: Player[];
  activePlayerIndex: number;
  usedEntityIds: string[]; // Serialized as array for clean JSON
  turnCount: number;
  phase: GamePhase;
  winnerId: string | 'tie' | null;
  history: MoveResult[];
}
