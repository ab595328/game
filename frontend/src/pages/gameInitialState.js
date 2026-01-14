export const initialGameState = {
  status: "BETTING", // BETTING | CLOSED | RESULT
  currentCardIndex: 0,
  timer: 10,

  cards: [1, 2, 3, 4, 5, 6], // abhi simple rakhe
  openCards: [],

  bets: {
    playerA: 0,
    playerB: 0,
  },

  odds: {
    playerA: 2,
    playerB: 2,
  },

  winner: null,
};
