import { each, map, sortBy } from 'lodash';
import multiWeightedRandom from 'multi-weighted-random';
import rawData from 'country-json/src/country-by-surface-area';

import abbreviateNum from '../utils/abbreviateNumber';

const PROPERTY = 'area';

const data = [];
each(rawData, (c) => {
  if (c[PROPERTY]) {
    data.push({
      name: c.country,
      [PROPERTY]: parseInt(c[PROPERTY]),
    });
  }
});
const weights = map(data, (c) => Math.sqrt(parseInt(c[PROPERTY])));

const generatePopulationQuestion = () => {
  const indices = multiWeightedRandom(weights, 2);
  const selections = map(indices, (i) => data[i]);
  const sortedSelections = sortBy(selections, [PROPERTY]);
  const largerSelection = sortedSelections[1];
  const smallerSelection = sortedSelections[0];
  const answer = largerSelection[PROPERTY] / smallerSelection[PROPERTY];

  return {
    category: 'National Surface Area',
    text: `How many times larger is ${largerSelection.name} than ${smallerSelection.name}?`,
    answer: answer.toFixed(1),
    answerNote: `${largerSelection.name} measures ${abbreviateNum(largerSelection[PROPERTY])} km², while ${smallerSelection.name} measures ${abbreviateNum(smallerSelection[PROPERTY])} km².`,
  };
};

export default generatePopulationQuestion;
