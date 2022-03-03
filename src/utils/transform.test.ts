
import createTransform, {getPriority} from "./transform";
/* eslint-disable @typescript-eslint/no-unused-vars */

// Here are some dummy positions you might find useful for writing unit tests
import { AAPL, AMZN, DIS, WMT, createNamedPosition } from '../__test__/fixtures';
import { PRIORITY } from "../enums";
import { Position } from "../types";


// You can also create custom positions using the `createNamedPosition` helper
const GME = createNamedPosition('GME', 'GameStop Corp.');

/* eslint-enable @typescript-eslint/no-unused-vars */

test('exports a createTransform function', () => {
  expect(createTransform).toBeInstanceOf(Function);
});

// Write your tests here
test('createTransform returns all the positions when search string is empty', () => {
  const positions: Position[] = [AAPL, AMZN, DIS, WMT];
  let searchString: any
  let transform = createTransform(searchString)
  let filteredPositions = transform(positions)
  expect(filteredPositions).toHaveLength(4)
  expect(filteredPositions).toEqual(positions)

  searchString = null
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toHaveLength(4)
  expect(filteredPositions).toEqual(positions)

  searchString = ''
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toHaveLength(4)
  expect(filteredPositions).toEqual(positions)
})

test('createTransform applies filtering rules to ticker correctly', () => {
  const positions: Position[] = [AAPL, AMZN, DIS, WMT];
  let searchString: string = 'aap'
  let transform = createTransform(searchString)
  let filteredPositions: Position[] = transform(positions)
  let filteredTickers: string[] = filteredPositions.map(position => position.ticker)

  expect(filteredTickers).toContain('AAPL');
  expect(filteredTickers).not.toContain('AMZN');
  expect(filteredTickers).not.toContain('DIS');
  expect(filteredTickers).not.toContain('WMT');

  searchString = 'apl'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  filteredTickers = filteredPositions.map(position => position.ticker)

  expect(filteredTickers).not.toContain('APPL')
  expect(filteredTickers).not.toContain('AMZN');
  expect(filteredTickers).not.toContain('DIS');
  expect(filteredTickers).not.toContain('WMT');
});

test('createTransform applies filtering rules to name correctly', () => {
  const positions: Position[] = [AAPL, AMZN, DIS, WMT];
  let searchString: string = 'aapl'
  let transform = createTransform(searchString)
  let filteredPositions: Position[] = transform(positions)
  let filteredNames: string[] = filteredPositions.map(position => position.name)

  expect(filteredNames).toContain('Apple Inc');
  expect(filteredNames).not.toContain('Amazon.com Inc');
  expect(filteredNames).not.toContain('Walt Disney Co');
  expect(filteredNames).not.toContain('Walmart Inc');

  searchString = 'ppl'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  filteredNames = filteredPositions.map(position => position.name)

  expect(filteredNames).toContain('Apple Inc')
  expect(filteredNames).not.toContain('Amazon.com Inc');
  expect(filteredNames).not.toContain('Walt Disney Co');
  expect(filteredNames).not.toContain('Walmart Inc');
})

test('getPriority applies sorting priority rules correctly to APPL', () => {
  let searchString: string = 'aapl'
  let priority: PRIORITY = getPriority(searchString, AAPL.ticker, AAPL.name)
  expect(priority).toBe(PRIORITY.FIRST)

  searchString = 'aap'
  priority = getPriority(searchString, AAPL.ticker, AAPL.name)
  expect(priority).toBe(PRIORITY.SECOND)

  searchString = 'appl'
  priority = getPriority(searchString, AAPL.ticker, AAPL.name)
  expect(priority).toBe(PRIORITY.THIRD)

  searchString = 'ppl'
  priority = getPriority(searchString, AAPL.ticker, AAPL.name)
  expect(priority).toBe(PRIORITY.FOURTH)

  searchString = 'xyz'
  priority = getPriority(searchString, AAPL.ticker, AAPL.name)
  expect(priority).toBe(PRIORITY.UNMATCHED)
})

test('getPriority applies sorting priority rules correctly to AMZN', () => {
  let searchString: string = 'azon'
  let priority: PRIORITY = getPriority(searchString, AMZN.ticker, AMZN.name)
  expect(priority).toBe(PRIORITY.FOURTH)

  searchString = 'amaz'
  priority = getPriority(searchString, AMZN.ticker, AMZN.name)
  expect(priority).toBe(PRIORITY.THIRD)

  searchString = 'amz'
  priority = getPriority(searchString, AMZN.ticker, AMZN.name)
  expect(priority).toBe(PRIORITY.SECOND)

  searchString = 'amzn'
  priority = getPriority(searchString, AMZN.ticker, AMZN.name)
  expect(priority).toBe(PRIORITY.FIRST)

  searchString = 'xyz'
  priority = getPriority(searchString, AMZN.ticker, AMZN.name)
  expect(priority).toBe(PRIORITY.UNMATCHED)
})

test('getPriority applies sorting priority rules correctly to DIS', () => {
  let searchString: string = 'disn'
  let priority: PRIORITY = getPriority(searchString, DIS.ticker, DIS.name)
  expect(priority).toBe(PRIORITY.FOURTH)

  searchString = 'walt'
  priority = getPriority(searchString, DIS.ticker, DIS.name)
  expect(priority).toBe(PRIORITY.THIRD)

  searchString = 'di'
  priority = getPriority(searchString, DIS.ticker, DIS.name)
  expect(priority).toBe(PRIORITY.SECOND)

  searchString = 'dis'
  priority = getPriority(searchString, DIS.ticker, DIS.name)
  expect(priority).toBe(PRIORITY.FIRST)

  searchString = 'xyz'
  priority = getPriority(searchString, DIS.ticker, DIS.name)
  expect(priority).toBe(PRIORITY.UNMATCHED)
})

test('getPriority applies sorting priority rules correctly to WMT', () => {
  let searchString: string = 'wmt'
  let priority: PRIORITY = getPriority(searchString, WMT.ticker, WMT.name)
  expect(priority).toBe(PRIORITY.FIRST)

  searchString = 'wm'
  priority = getPriority(searchString, WMT.ticker, WMT.name)
  expect(priority).toBe(PRIORITY.SECOND)

  searchString = 'wal'
  priority = getPriority(searchString, WMT.ticker, WMT.name)
  expect(priority).toBe(PRIORITY.THIRD)

  searchString = 'mart'
  priority = getPriority(searchString, WMT.ticker, WMT.name)
  expect(priority).toBe(PRIORITY.FOURTH)

  searchString = 'xyz'
  priority = getPriority(searchString, WMT.ticker, WMT.name)
  expect(priority).toBe(PRIORITY.UNMATCHED)
})

test('createTransform applies sorting rules correctly', () => {
  const positions: Position[] = [AMZN, DIS, AAPL, WMT];
  let searchString: string = 'wal'
  let transform = createTransform(searchString)
  let filteredPositions: Position[] = transform(positions)
  expect(filteredPositions).not.toEqual([WMT, DIS])
  expect(filteredPositions).toEqual([DIS, WMT])

  searchString = 'a'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).not.toEqual([AMZN, DIS, AAPL, WMT])
  expect(filteredPositions).toEqual([AMZN, AAPL, DIS, WMT])

  searchString = 'aapl'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toEqual([AAPL])

  searchString = 'w'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toEqual([WMT, DIS])

  searchString = 'inc'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toEqual([AMZN, AAPL, WMT])

  searchString = 'i'
  transform = createTransform(searchString)
  filteredPositions = transform(positions)
  expect(filteredPositions).toEqual(positions)
})

