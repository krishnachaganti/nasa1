export const APPLY_FILTER = 'APPLY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_OPERATION = 'SET_OPERATION';
export const SET_INPUT = 'SET_INPUT';

export function applyFilter(name, operator, value) {
  return { type: APPLY_FILTER, name, operator, value };
}

export function clearFilter() {
  return { type: CLEAR_FILTER };
}

export function setProperty(property) {
  return { type: SET_PROPERTY, property };
}

export function setOperation(operation) {
  return { type: SET_OPERATION, operation };
}

export function setInput(input) {
  return { type: SET_INPUT, input };
}
