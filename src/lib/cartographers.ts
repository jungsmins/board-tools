import {
  SCORING_RULES,
  EXPLORE_CARDS,
  AMBUSH_CARDS,
} from '@/constants/cartographers';
import { ScoringSlot } from '@/types/cartographers';

function getRandomInt(range: number): number {
  return Math.floor(Math.random() * range);
}

export function selectedScoringCard(): Record<ScoringSlot, string> {
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
