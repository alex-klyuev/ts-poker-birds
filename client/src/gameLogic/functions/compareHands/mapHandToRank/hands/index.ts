// Note on hand functions:
// While refactoring to TS, I've done some hacky things with types in these functions
// to make the old JS code work. Eventually, the meticulous thing to do would be to
// refactor the functions themselves to be more in line with good TS code

// main hacky things: arrays init as empty, rankObj properties init as empty,
// using "as" in the return arrays

export * from './highCard';
export * from './pair';
export * from './twoPair';
export * from './threeOfAKind';
export * from './straight';
export * from './flush';
export * from './fullHouse';
export * from './fourOfAKind';
export * from './straightFlush';
