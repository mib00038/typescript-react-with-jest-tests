import { PRIORITY } from "./enums";

export interface Position {
  id: string;
  ticker: string;
  name: string;
  exposure: number;
}

export interface PriorityPosition {
  position : Position
  priority: PRIORITY
}