// Types
import { Order } from '../typings/data.js';

export const getPriceWithDiscount = (order: Order) =>
  order.unit_price - (order.unit_price / 100) * order.percentage_discount;
