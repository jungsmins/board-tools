import {
  SCORING_RULES,
  EXPLORE_CARDS,
  AMBUSH_CARDS,
} from '@/constants/cartographers';
import {
  ScoringSlot,
  ScoringRule,
  DeckCard,
  Season,
} from '@/types/cartographers';

function getRandomInt(range: number): number {
  return Math.floor(Math.random() * range);
}

export function selectScoringRules(): Record<ScoringSlot, string> {
  return {
    A: SCORING_RULES[getRandomInt(4)].id,
    B: SCORING_RULES[getRandomInt(4) + 4].id,
    C: SCORING_RULES[getRandomInt(4) + 8].id,
    D: SCORING_RULES[getRandomInt(4) + 12].id,
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

export const CARD_BY_ID = new Map<string, DeckCard>(
  [...EXPLORE_CARDS, ...AMBUSH_CARDS].map((card) => [card.id, card]),
);

export function getCardById(id: string | null): DeckCard | null {
  if (!id) return null;
  return CARD_BY_ID.get(id) ?? null;
}

export function getNextSeason(season: Season) {
  switch (season) {
    case 'spring':
      return 'summer';
    case 'summer':
      return 'automn';
    case 'autumn':
      return 'winter';
    case 'winter':
      return false;
  }
}
