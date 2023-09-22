import { ResultChoiceID } from './enums.js';

export type Order = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  percentage_discount: number;
  buyer: string;
};

export type ResultChoice = {
  id: ResultChoiceID;
  label: string;
};
