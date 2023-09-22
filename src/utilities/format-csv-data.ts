// Visuals
import chalk from 'chalk';

// Utilities
import { sleep } from './sleep.js';
import { readCsvFile } from './read-csv-file.js';

// Types
import { Order } from '../typings/data.js';

export const formatCsvData = async (csvPath: string) => {
  const readSpinner = await sleep(1200, 'Reading the file...');

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

  const formattedData: Order[] = [];

  for (let i = 0; i < dataRows.length; ++i) {
    const row = dataRows[i];
    const formattedRow = {} as Order;

    for (let j = 0; j < dataLabels.length; j++) {
      const label = dataLabels[j];
      const formattedLabel = label.toLowerCase().split(' ').join('_');

      //@ts-ignore - TO-FIX
      formattedRow[formattedLabel as keyof Order] = isNaN(Number(row[j]))
        ? row[j]
        : Number(row[j]);
    }

    formattedData.push(formattedRow);
  }

  return formattedData;
};
