// Dependencies
import { readFileSync } from 'fs';
export const readCsvFile = (filePath) => {
    if (!filePath.endsWith('.csv'))
        return undefined;
    try {
        return readFileSync(filePath).toString('utf-8');
    }
    catch (_a) {
        return undefined;
    }
};
