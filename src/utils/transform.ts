import type { Position, PriorityPosition } from '../types';
import { PRIORITY } from "../enums";
import isEmpty from 'lodash/isEmpty';

const createTransform = (searchText: string = '') => (positions: Position[]): Position[] =>
  isEmpty(searchText)
  ? positions
  : positions
    .map(enrichWithPriority(searchText))
    .filter(({ priority }: PriorityPosition) => priority !== PRIORITY.UNMATCHED)
    .sort((posA: PriorityPosition, posB: PriorityPosition) => posA.priority - posB.priority)
    .map(({ position }: PriorityPosition) => position)

const enrichWithPriority = (searchText: string) => (position: Position) => {
  const { ticker, name } = position
  const priority: PRIORITY = getPriority(searchText, ticker, name)

  return { position, priority }
}

export const getPriority = (searchText: string, ticker: string, name: string): PRIORITY => {
  const _searchText: string = searchText.toLocaleLowerCase()
  const _ticker: string = ticker.toLocaleLowerCase()
  const _name: string = name.toLocaleLowerCase()

  if (_ticker === _searchText) return PRIORITY.FIRST;
  if (_ticker.startsWith(_searchText)) return PRIORITY.SECOND;
  if (_name.startsWith(_searchText)) return PRIORITY.THIRD;
  if (_name.includes(_searchText)) return PRIORITY.FOURTH;

  return PRIORITY.UNMATCHED;
}

export default createTransform
