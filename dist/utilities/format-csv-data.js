var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Visuals
import chalk from 'chalk';
// Utilities
import { sleep } from './sleep.js';
import { readCsvFile } from './read-csv-file.js';
export const formatCsvData = (csvPath) => __awaiter(void 0, void 0, void 0, function* () {
    const readSpinner = yield sleep(1200, 'Reading the file...');
    const csvData = readCsvFile(csvPath);
    if (!csvData) {
        readSpinner.error({ text: 'Unable to read the file!' });
        console.log(chalk.red('The file does not exist or is not a csv file'));
        return process.exit(1);
    }
    readSpinner.success({ text: 'File read!' });
    const dataTable = csvData.split(/[\n\r]/).filter((r) => r !== '');
    const dataLabels = dataTable[0].split(',');
    const dataRows = dataTable.slice(1).map((row) => row.split(','));
    const formattedData = [];
    for (let i = 0; i < dataRows.length; ++i) {
        const row = dataRows[i];
        const formattedRow = {};
        for (let j = 0; j < dataLabels.length; j++) {
            const label = dataLabels[j];
            const formattedLabel = label.toLowerCase().split(' ').join('_');
            //@ts-ignore - TO-FIX
            formattedRow[formattedLabel] = isNaN(Number(row[j]))
                ? row[j]
                : Number(row[j]);
        }
        formattedData.push(formattedRow);
    }
    return formattedData;
});
