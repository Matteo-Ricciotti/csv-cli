#!/usr/bin/env node

// Visuals
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

// Prompt
import inquirer from 'inquirer';

// Utilities
import { sleep } from './utilities/sleep.js';
import { formatCsvData } from './utilities/format-csv-data.js';
import { getChoiceResult } from './utilities/get-choice-result.js';

// Types
import { ResultChoice } from './typings/data.js';
import { ExitChoice, ResultChoiceID } from './typings/enums.js';

// Global constants
let csvPath: string = '';
let isFirstCicle = true;

// Constants
const resultChoices: ResultChoice[] = [
  {
    id: ResultChoiceID.TOT,
    label: 'Bigger amount',
  },
  {
    id: ResultChoiceID.QNT,
    label: 'Bigger quantity',
  },
  {
    id: ResultChoiceID.DIFF,
    label: 'Bigger discount difference',
  },
];

// Core Functions
const start = async () => {
  chalkAnimation.rainbow('Welcome to csv-cli');

  (await sleep(1200, 'Starting...')).success({ text: 'Started!' });

  console.log(chalk.blueBright('Isert the path of a .csv file'));
};

const promptCsvPath = async () => {
  const prompt = await inquirer.prompt({
    name: 'csvFile',
    type: 'input',
    message: 'What is the path of the file?',
    default: () => './data/table.csv',
  });

  csvPath = prompt.csvFile;
};

const promptResult = async () => {
  const prompt = await inquirer.prompt({
    name: 'result',
    type: 'list',
    message: 'What is the result you want to achieve?',
    choices: resultChoices.map((c) => c.label),
  });

  return prompt.result;
};

const promptExit = async (): Promise<ExitChoice> => {
  const prompt = await inquirer.prompt({
    name: 'exit',
    type: 'list',
    message: 'Do you want to exit?',
    choices: [ExitChoice.YES, ExitChoice.NO],
  });

  return prompt.exit;
};

// Lifecycle
const initProgram = async () => {
  await start();

  await promptCsvPath();

  const data = await formatCsvData(csvPath);

  while (true) {
    if (!isFirstCicle) {
      (await sleep(500)).success();
    }

    const selectedChoice = await promptResult();

    (await sleep(1200, 'Retreiving informations...')).success({
      text: 'Success!',
    });

    const choiceRsult = getChoiceResult(
      data,
      resultChoices.find((c) => c.label === selectedChoice)!,
    );

    console.log(choiceRsult);

    const wantsExit = await promptExit();

    if (wantsExit === ExitChoice.YES) {
      await sleep(1200, 'Exiting...');

      process.exit(0);
    }

    isFirstCicle = false;
  }
};

initProgram();
