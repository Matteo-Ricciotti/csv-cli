export const getPriceWithDiscount = (order) => order.unit_price - (order.unit_price / 100) * order.percentage_discount;
