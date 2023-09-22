// Utilities
import { getPriceWithDiscount } from './get-price-with-discount.js';

// Types
import { Order } from '../typings/data.js';

export const getBiggerTotalAmountRecord = (data: Order[]) =>
  data.reduce((a, b) => {
    const orderPriceWithDiscount = getPriceWithDiscount(b);
    const currentBiggerPriceWithDiscount = getPriceWithDiscount(a);

    if (
      orderPriceWithDiscount * b.quantity >
      currentBiggerPriceWithDiscount * a.quantity
    )
      return b;

    return a;
  }, data[0]);
