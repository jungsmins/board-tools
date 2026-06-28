import {
  SCORING_RULES,
  EXPLORE_CARDS,
  AMBUSH_CARDS,
  SEASON_CONFIG,
} from '@/constants/cartographers';
import {
  ScoringSlot,
  ScoringRule,
  DeckCard,
  Season,
  SeasonConfig,
} from '@/types/cartographers';

function getRandomInt(range: number): number {
  return Math.floor(Math.random() * range);
}

function getRandomItem<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot select a random item from an empty list.');
  }

  return items[getRandomInt(items.length)];
}

function selectScoringRuleBySlot(slot: ScoringSlot): string {
  const rules = SCORING_RULES.filter((rule) => rule.slot === slot);
  return getRandomItem(rules).id;
}

export function selectScoringRules(): Record<ScoringSlot, string> {
  return {
    A: selectScoringRuleBySlot('A'),
    B: selectScoringRuleBySlot('B'),
    C: selectScoringRuleBySlot('C'),
    D: selectScoringRuleBySlot('D'),
  };
}

export function shuffleDeck(): string[] {
  const deck = EXPLORE_CARDS.map((card) => card.id);
  const ambush = AMBUSH_CARDS[getRandomInt(AMBUSH_CARDS.length)].id;

  for (let i = deck.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  deck.splice(getRandomInt(deck.length + 1), 0, ambush);

  return deck;
}

export const SCORING_RULE_BY_ID = new Map<string, ScoringRule>(
  SCORING_RULES.map((rule) => [rule.id, rule]),
);

export function getScoringRuleById(id: string | null): ScoringRule | null {
  if (!id) return null;
  return SCORING_RULE_BY_ID.get(id) ?? null;
}

export function getScoringRulesByIds(ids: string[]): ScoringRule[] {
  return ids
    .map(getScoringRuleById)
    .filter((rule): rule is ScoringRule => rule !== null);
}

export function getSeasonScoringRules(
  selectedScoringRules: Record<ScoringSlot, string>,
  seasonConfig: SeasonConfig,
): ScoringRule[] {
  const seasonSlots = new Set<ScoringSlot>(seasonConfig.scoringSlots);

  return getScoringRulesByIds(Object.values(selectedScoringRules)).filter(
    (rule) => seasonSlots.has(rule.slot),
  );
}

export const CARD_BY_ID = new Map<string, DeckCard>(
  [...EXPLORE_CARDS, ...AMBUSH_CARDS].map((card) => [card.id, card]),
);

export function getCardById(id: string | null): DeckCard | null {
  if (!id) return null;
  return CARD_BY_ID.get(id) ?? null;
}

export function getCardCost(card: DeckCard): number {
  return card.type === 'ambush' ? 0 : card.cost;
}

export function getSeasonConfig(season: Season): SeasonConfig {
  const config = SEASON_CONFIG.find((item) => item.season === season);

  if (!config) {
    throw new Error(`Unknown season: ${season}`);
  }

  return config;
}

export function getNextSeason(season: Season) {
  switch (season) {
    case 'spring':
      return 'summer';
    case 'summer':
      return 'autumn';
    case 'autumn':
      return 'winter';
    case 'winter':
      return false;
  }
}
