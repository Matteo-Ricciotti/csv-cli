// Visuals
import nanospinner from 'nanospinner';

export const sleep = async (ms = 1000, label = '') => {
  const spinner = nanospinner.createSpinner(label).start();

  await new Promise((r) => setTimeout(r, ms));

  return spinner;
};
