// Types
import { Order } from '../typings/data.js';

export const getBiggerQuantityRecord = (data: Order[]) =>
  data.reduce((a, b) => {
    if (b.quantity > a.quantity) return b;

    return a;
  }, data[0]);
