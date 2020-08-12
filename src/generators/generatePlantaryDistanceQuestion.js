import { sampleSize, sortBy } from 'lodash';

import data from './planets';

const PROPERTY = 'distanceFromSun';

const generatePlanetaryDistanceQuestion  = () => {
  const selections =  sampleSize(data, 2)
  const sortedSelections = sortBy(selections, [PROPERTY]);
  const largerSelection = sortedSelections[1];
  const smallerSelection = sortedSelections[0];
  const answer = largerSelection[PROPERTY] / smallerSelection[PROPERTY];

  return `Planetary Distance from the Sun | How many times further is ${largerSelection.name} than ${smallerSelection.name}? | ${answer.toFixed(1)}`;
};

export default generatePlanetaryDistanceQuestion;