// Functions
import { getBiggerQuantityRecord } from './get-bigger-quantity-record.js';
import { getBiggerTotalAmountRecord } from './get-bigger-total-amount-record.js';
import { getBiggerDiscountDiffRecord } from './get-bigger-discount-diff-record.js';

// Types
import { ResultChoiceID } from '../typings/enums.js';
import { Order, ResultChoice } from '../typings/data.js';

export const getChoiceResult = (
  data: Order[],
  selectedChoice: ResultChoice,
) => {
  switch (selectedChoice.id) {
    case ResultChoiceID.TOT:
      return getBiggerTotalAmountRecord(data);
    case ResultChoiceID.QNT:
      return getBiggerQuantityRecord(data);
    case ResultChoiceID.DIFF:
      return getBiggerDiscountDiffRecord(data);
  }
};
