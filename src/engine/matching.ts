import { Category, Dataset, Entity } from './types';

/**
 * Normalizes text for case-insensitive and accent-agnostic matching.
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Checks if a single entity matches a category predicate.
 * Supports generic attributes across any sport or role (player/coach).
 */
export function matches(entity: Entity, category: Category): boolean {
  if (category.sport !== entity.sport && category.sport !== 'all') {
    return false;
  }

  const { attributeKey, expectedValue, matchRule = 'any' } = category;

  // Special check for entity role/type ('player' | 'coach')
  if (attributeKey === 'type') {
    if (typeof expectedValue === 'string') {
      return entity.type === expectedValue;
    }
    if (Array.isArray(expectedValue)) {
      return expectedValue.includes(entity.type);
    }
  }

  let rawAttr = entity.attributes[attributeKey];

  // For 'teams' attribute, if entity is a coach, also include managedTeams
  if (attributeKey === 'teams') {
    const teams = Array.isArray(rawAttr) ? rawAttr : (rawAttr ? [rawAttr] : []);
    const managed = Array.isArray(entity.attributes.managedTeams) ? entity.attributes.managedTeams : [];
    if (managed.length > 0) {
      rawAttr = Array.from(new Set([...teams, ...managed]));
    }
  }

  if (rawAttr === undefined || rawAttr === null) {
    return false;
  }

  // If attribute is a boolean
  if (typeof rawAttr === 'boolean') {
    return rawAttr === (expectedValue === 'true' || (expectedValue as unknown) === true);
  }

  // If attribute is an array of strings (e.g. teams, honours, nationalities)
  if (Array.isArray(rawAttr)) {
    const normalizedAttr = rawAttr.map((v) => normalizeString(String(v)));

    if (Array.isArray(expectedValue)) {
      const normalizedExp = expectedValue.map((v) => normalizeString(v));
      if (matchRule === 'all') {
        return normalizedExp.every((exp) => normalizedAttr.includes(exp));
      }
      // 'any'
      return normalizedExp.some((exp) => normalizedAttr.includes(exp));
    }

    const normExp = normalizeString(String(expectedValue));
    return normalizedAttr.includes(normExp);
  }

  // If attribute is a single string or number
  const normAttr = normalizeString(String(rawAttr));
  if (Array.isArray(expectedValue)) {
    const normalizedExp = expectedValue.map((v) => normalizeString(v));
    return normalizedExp.includes(normAttr);
  }

  return normAttr === normalizeString(String(expectedValue));
}

/**
 * Inverted Index for fast Category -> Entity lookups.
 * Maps categoryId -> Set of entity IDs that match.
 */
export interface InvertedIndex {
  categoryToEntities: Map<string, Set<string>>;
  entityToCategories: Map<string, Set<string>>;
  entityMap: Map<string, Entity>;
}

export function buildInvertedIndex(dataset: Dataset): InvertedIndex {
  const categoryToEntities = new Map<string, Set<string>>();
  const entityToCategories = new Map<string, Set<string>>();
  const entityMap = new Map<string, Entity>();

  for (const entity of dataset.entities) {
    entityMap.set(entity.id, entity);
    entityToCategories.set(entity.id, new Set());
  }

  for (const category of dataset.categories) {
    const matchingEntities = new Set<string>();

    for (const entity of dataset.entities) {
      if (matches(entity, category)) {
        matchingEntities.add(entity.id);
        entityToCategories.get(entity.id)!.add(category.id);
      }
    }

    categoryToEntities.set(category.id, matchingEntities);
  }

  return { categoryToEntities, entityToCategories, entityMap };
}

/**
 * Gets all entity IDs matching a category via index.
 */
export function getMatchingEntityIds(categoryId: string, index: InvertedIndex): Set<string> {
  return index.categoryToEntities.get(categoryId) ?? new Set();
}

/**
 * Computes the intersection of matching entity IDs between two categories.
 */
export function getCategoryIntersection(
  catAId: string,
  catBId: string,
  index: InvertedIndex
): string[] {
  const setA = index.categoryToEntities.get(catAId);
  const setB = index.categoryToEntities.get(catBId);
  if (!setA || !setB) return [];

  const intersection: string[] = [];
  for (const id of setA) {
    if (setB.has(id)) {
      intersection.push(id);
    }
  }
  return intersection;
}
