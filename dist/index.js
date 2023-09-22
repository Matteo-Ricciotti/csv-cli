#!/usr/bin/env node
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
import chalkAnimation from 'chalk-animation';
// Prompt
import inquirer from 'inquirer';
// Utilities
import { sleep } from './utilities/sleep.js';
import { formatCsvData } from './utilities/format-csv-data.js';
import { getChoiceResult } from './utilities/get-choice-result.js';
import { ExitChoice, ResultChoiceID } from './typings/enums.js';
// Global constants
let csvPath = '';
let isFirstCicle = true;
// Constants
const resultChoices = [
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
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    chalkAnimation.rainbow('Welcome to csv-cli');
    (yield sleep(1200, 'Starting...')).success({ text: 'Started!' });
    console.log(chalk.blueBright('Isert the path of a .csv file'));
});
const promptCsvPath = () => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = yield inquirer.prompt({
        name: 'csvFile',
        type: 'input',
        message: 'What is the path of the file?',
        default: () => './data/table.csv',
    });
    csvPath = prompt.csvFile;
});
const promptResult = () => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = yield inquirer.prompt({
        name: 'result',
        type: 'list',
        message: 'What is the result you want to achieve?',
        choices: resultChoices.map((c) => c.label),
    });
    return prompt.result;
});
const promptExit = () => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = yield inquirer.prompt({
        name: 'exit',
        type: 'list',
        message: 'Do you want to exit?',
        choices: [ExitChoice.YES, ExitChoice.NO],
    });
    return prompt.exit;
});
// Lifecycle
const initProgram = () => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
    yield promptCsvPath();
    const data = yield formatCsvData(csvPath);
    while (true) {
        if (!isFirstCicle) {
            (yield sleep(500)).success();
        }
        const selectedChoice = yield promptResult();
        (yield sleep(1200, 'Retreiving informations...')).success({
            text: 'Success!',
        });
        const choiceRsult = getChoiceResult(data, resultChoices.find((c) => c.label === selectedChoice));
        console.log(choiceRsult);
        const wantsExit = yield promptExit();
        if (wantsExit === ExitChoice.YES) {
            yield sleep(1200, 'Exiting...');
            process.exit(0);
        }
        isFirstCicle = false;
    }
});
initProgram();
