// for a given hand, maps the number of each card to the frequency it appears in the hand
// e.g., TT88K -> { 10: 2, 8: 2, 12: 1 }
export interface FreqMap {
  [index: number]: number;
}
