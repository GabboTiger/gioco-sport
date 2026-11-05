import { Entity } from './types';
import { normalizeString } from './matching';

/**
 * Normalizes string removing accents and punctuation for robust matching.
 */
export function cleanSearchString(str: string): string {
  return normalizeString(str)
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes Levenshtein distance between two cleaned strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const dp: number[][] = [];

  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[a.length][b.length];
}

/**
 * Calculates max allowable Levenshtein distance based on query length.
 */
function getMaxAllowedDistance(queryLength: number): number {
  if (queryLength <= 3) return 0;
  if (queryLength <= 6) return 1;
  return 2;
}

export interface SearchResult {
  entity: Entity;
  score: number;
  matchedBy: 'full_name' | 'surname' | 'alias' | 'fuzzy';
  matchedTerm?: string;
}

export interface SearchOptions {
  limit?: number;
  minScore?: number;
}

/**
 * Searches entities by name, surname, aliases and fuzzy matching.
 */
export function searchEntities(
  query: string,
  entities: Entity[],
  options: SearchOptions = {}
): SearchResult[] {
  const { limit = 8, minScore = 20 } = options;

  const rawQuery = query.trim();
  if (!rawQuery) return [];

  const cleanQuery = cleanSearchString(rawQuery);
  const queryWords = cleanQuery.split(' ').filter(Boolean);
  if (queryWords.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entity of entities) {
    const cleanName = cleanSearchString(entity.name);
    const nameWords = cleanName.split(' ').filter(Boolean);
    const surname = nameWords.length > 1 ? nameWords[nameWords.length - 1] : '';

    const aliases = (entity.aliases || []).map((a) => cleanSearchString(a));

    let bestScore = 0;
    let matchedBy: SearchResult['matchedBy'] = 'full_name';
    let matchedTerm: string | undefined;

    // 1. Exact match on full name
    if (cleanName === cleanQuery) {
      bestScore = 100;
      matchedBy = 'full_name';
    }

    // 2. Exact match on alias
    if (bestScore < 95) {
      for (const alias of aliases) {
        if (alias === cleanQuery) {
          bestScore = 95;
          matchedBy = 'alias';
          matchedTerm = alias;
          break;
        }
      }
    }

    // 3. Exact match on surname (e.g. "Ronaldo", "Mourinho", "Ancelotti")
    if (bestScore < 90 && surname && surname === cleanQuery) {
      bestScore = 90;
      matchedBy = 'surname';
      matchedTerm = surname;
    }

    // 4. Starts with full name
    if (bestScore < 85 && cleanName.startsWith(cleanQuery)) {
      bestScore = 85;
      matchedBy = 'full_name';
    }

    // 5. Starts with surname or alias
    if (bestScore < 80) {
      if (surname && surname.startsWith(cleanQuery)) {
        bestScore = 80;
        matchedBy = 'surname';
        matchedTerm = surname;
      } else {
        for (const alias of aliases) {
          if (alias.startsWith(cleanQuery)) {
            bestScore = 80;
            matchedBy = 'alias';
            matchedTerm = alias;
            break;
          }
        }
      }
    }

    // 6. Substring match anywhere
    if (bestScore < 70) {
      if (cleanName.includes(cleanQuery)) {
        bestScore = 70;
        matchedBy = 'full_name';
      } else {
        for (const alias of aliases) {
          if (alias.includes(cleanQuery)) {
            bestScore = 65;
            matchedBy = 'alias';
            matchedTerm = alias;
            break;
          }
        }
      }
    }

    // 7. Multi-word intersection (e.g. "Pippo Inzaghi" -> "Pippo" alias + "Inzaghi" surname)
    if (bestScore < 65 && queryWords.length > 1) {
      const allTokens = [cleanName, ...aliases].join(' ');
      const matchAll = queryWords.every((qw) => allTokens.includes(qw));
      if (matchAll) {
        bestScore = 65;
        matchedBy = 'alias';
      }
    }

    // 8. Fuzzy matching (Levenshtein) on words if still no strong match
    if (bestScore < 50) {
      const maxDist = getMaxAllowedDistance(cleanQuery.length);

      if (maxDist > 0) {
        // Compare with full name
        const distFullName = levenshteinDistance(cleanQuery, cleanName);
        if (distFullName <= maxDist) {
          const score = 50 - distFullName * 10;
          if (score > bestScore) {
            bestScore = score;
            matchedBy = 'fuzzy';
            matchedTerm = entity.name;
          }
        }

        // Compare query with each word in the entity name (especially surname)
        for (const word of nameWords) {
          const distWord = levenshteinDistance(cleanQuery, word);
          const wordMaxDist = getMaxAllowedDistance(cleanQuery.length);
          if (distWord <= wordMaxDist) {
            const score = 45 - distWord * 10;
            if (score > bestScore) {
              bestScore = score;
              matchedBy = 'fuzzy';
              matchedTerm = word;
            }
          }
        }

        // Compare query with aliases
        for (const alias of aliases) {
          const distAlias = levenshteinDistance(cleanQuery, alias);
          if (distAlias <= maxDist) {
            const score = 42 - distAlias * 10;
            if (score > bestScore) {
              bestScore = score;
              matchedBy = 'fuzzy';
              matchedTerm = alias;
            }
          }
        }
      }
    }

    if (bestScore >= minScore) {
      // Small bonus for popularity to rank famous entities first in ties
      const finalScore = bestScore + (entity.popularity || 50) * 0.1;
      results.push({
        entity,
        score: finalScore,
        matchedBy,
        matchedTerm,
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}
