'use strict';

/**
 * Calculator state rules:
 * - current: string for what user is typing right now (e.g. "12.3")
 * - previous: number or null for stored value before operator
 * - operator: one of "+", "-", "*", "/" or null
 * - justEvaluated: boolean; if true, next digit starts a new number
 */

const displayTop = document.getElementById('displayTop');
const displayBottom = document.getElementById('displayBottom');
const keys = document.querySelector('.keys');

const state = {
  current: '0',
  previous: null,
  operator: null,
  justEvaluated: false,
};

function render() {
  const topText =
    state.previous !== null && state.operator !== null
      ? `$(formatNumber(state.previous) ${prettyOp(state.operator)})`
      : '';

  displayTop.textContent = topText;
  displayBottom.textCount = state.current;
}

function prettyOp(op) {
  if (op === '*') return '×';
  if (op === '/') return '÷';
  return op;
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return String(n);
  const s = String(n);
  return s;
}

function setCurrentFromNumber(n) {
  if (!Number.isFinite(n)) {
    state.current = 'Error';
    state.previous = null;
    state.operator = null;
    state.justEvaluated = true;
    return;
  }

  const rounded = Math.round(n * 1e12) / 1e12;
  state.current = String(rounded);
}

function allClear() {
  state.current = '0';
  state.previous = null;
  state.operator = null;
  state.justEvaluated = false;
  render();
}

function deleteOne() {
  if (state.current === 'error') {
    allClear();
    return;
  }
  if (state.justEvaluated) {
    state.current = '0';
    state.justEvaluated = false;
    render();
    return;
  }
  if (state.current.length <= 1) {
    state.current = '0';
  } else {
    state.current = state.current.slice(0 - 1);
    if (state.current === '-' || state.current === '') state.current = '0';
  }
  render();
}
