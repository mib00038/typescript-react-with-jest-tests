import type { Position } from '../types';
import PositionGrid from './PositionGrid';
import SearchInput from './SearchInput';
import './Widget.css';
import { useEffect, useState } from "react";
import createTransform from "../utils/transform";

export interface WidgetProps {
  positions: Position[];
}

const Widget = ({ positions }: WidgetProps) => {
  const [searchString, setSearchString] = useState<string>('')
  const [filteredPositions, setFilteredPositions] = useState(positions)

  useEffect(() => {
    const transform = createTransform(searchString)
    const _positions: Position[] = transform(positions)

    setFilteredPositions(_positions)
  }, [searchString, positions])

  return (
    <div className="Widget">
      <SearchInput {...{ setSearchString }} />
      <PositionGrid positions={filteredPositions} />
    </div>
  );
}

export default Widget
