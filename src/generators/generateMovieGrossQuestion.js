import { sampleSize, sortBy } from 'lodash';

import abbreviateNum from '../utils/abbreviateNumber';
import data from './movies';

const PROPERTY = 'worldwideGross';

const generateMovieGrossQuestion = () => {
  const selections =  sampleSize(data, 2);
  const sortedSelections = sortBy(selections, [PROPERTY]);
  const largerSelection = sortedSelections[1];
  const smallerSelection = sortedSelections[0];
  const answer = largerSelection[PROPERTY] / smallerSelection[PROPERTY];

  return {
    category: 'Worldwide Movie Gross',
    text: `How many times more lucrative was ${largerSelection.name} than ${smallerSelection.name}?`,
    note: 'Original release, not adjusted for inflation.',
    answer: answer.toFixed(1),
    answerNote: `${largerSelection.name} earned $${abbreviateNum(largerSelection[PROPERTY])}, while ${smallerSelection.name} earned $${abbreviateNum(smallerSelection[PROPERTY])}.`,
  };
};

export default generateMovieGrossQuestion;
