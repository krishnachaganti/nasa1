// ------------------------------------
// Constants
// ------------------------------------
export const KUDOS_INCREMENT = 'KUDOS_INCREMENT';
export const KUDOS_DECREMENT = 'KUDOS_DECREMENT';

export function increment(count) {
  return {
    type: KUDOS_INCREMENT
  };
}

export function decrement(count) {
  return {
    type: KUDOS_DECREMENT
  };
}
