// Utilities
import { getPriceWithDiscount } from './get-price-with-discount.js';
export const getBiggerDiscountDiffRecord = (data) => data.reduce((a, b) => {
    const orderPriceWithDiscount = getPriceWithDiscount(b);
    const currentPriceWithDiscount = getPriceWithDiscount(a);
    const orderDiffDiscountNoDiscount = b.unit_price * b.quantity - orderPriceWithDiscount * b.quantity;
    const currentDiffDiscountNoDiscount = a.unit_price * a.quantity - currentPriceWithDiscount * a.quantity;
    if (orderDiffDiscountNoDiscount > currentDiffDiscountNoDiscount)
        return b;
    return a;
}, data[0]);
