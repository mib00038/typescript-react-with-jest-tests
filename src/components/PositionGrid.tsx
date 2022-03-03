import type { Position } from '../types';
import './PositionGrid.css';
import cx from 'classnames';
import { memo } from "react";

export interface PositionGridProps {
  positions: Position[]
}

const PositionGrid = ({ positions }: PositionGridProps) => (
  <table className='PositionGrid' cellSpacing={0}>
    <GridHeader />
    <tbody>
      <DividerHack keyName='first-divider' />
      {positions.map((position: Position) => <PositionRow key={position.id} {...position} />)}
      <DividerHack keyName='last-divider' />
    </tbody>
  </table>
);

const GridHeader = memo(() => (
  <thead>
  <tr className='header'>
    <th className='ticker'>Ticker</th>
    <th>Name</th>
    <th className='exposure'>Exposure</th>
  </tr>
  </thead>
));

const PositionRow = memo(({ ticker, name, exposure }: Position) => {
  const negative = exposure < 0;
  const positive = !negative;
  const exposureCx = cx('exposure', { negative }, { positive });

  return (
    <tr className='row'>
      <td className='white ticker'>{ticker}</td>
      <td className='name'>{name}</td>
      <td className={exposureCx}>
        {exposure.toLocaleString()}
      </td>
    </tr>
  );
});

interface IDividerHack {
  keyName: string
}

const DividerHack = memo(({ keyName }: IDividerHack ) => <tr key={keyName}><td/><td/><td/></tr>);

export default PositionGrid;