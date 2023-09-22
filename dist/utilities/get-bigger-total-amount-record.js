import { getPriceWithDiscount } from './get-price-with-discount.js';
export const getBiggerTotalAmountRecord = (data) => data.reduce((a, b) => {
    const orderPriceWithDiscount = getPriceWithDiscount(b);
    const currentBiggerPriceWithDiscount = getPriceWithDiscount(a);
    if (orderPriceWithDiscount * b.quantity >
        currentBiggerPriceWithDiscount * a.quantity)
        return b;
    return a;
}, data[0]);
