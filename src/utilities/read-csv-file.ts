// Dependencies
import { readFileSync } from 'fs';

export const readCsvFile = (filePath: string) => {
  if (!filePath.endsWith('.csv')) return undefined;

  try {
    return readFileSync(filePath).toString('utf-8');
  } catch {
    return undefined;
  }
};
