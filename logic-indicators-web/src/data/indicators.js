// src/data/indicators.js
import indicators from './indicators.json';

export default indicators.map(ind => ({
  ...ind,
  image: new URL(ind.image, import.meta.url).href,
}));
