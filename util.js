const last = xs => xs[xs.length - 1];

export const range = n =>
  Array(n)
    .fill()
    .map((_, i) => i);

const pairs = xs => xs.slice(1).map((_, i) => [xs[i], xs[i + 1]]);

export const sample = xs => xs[Math.floor(Math.random() * xs.length)];

/**
 * default value weight is 1, override weight in `weightMap`. Weight `2` value
 * in `weightMap` is 2x more likely than 1, etc.
 */
export const randomWeighted = (xs, weightMap = {}) => {
  const probabilities = xs.map(value => ({
    value,
    weight: weightMap[value] || 1
  }));
  const totalWeight = probabilities.reduce(
    (totalWeight, { weight }) => totalWeight + weight,
    0
  );
  const normalizedProbabilities = probabilities
    .map(({ weight }) => weight / totalWeight)
    .reduce((normPs, np) => normPs.concat((last(normPs) || 0) + np), []);
  const roll = Math.random();
  for (let index in normalizedProbabilities) {
    if (roll < normalizedProbabilities[index])
      return {
        ...probabilities[index],
        percentage:
          normalizedProbabilities[index] -
          (normalizedProbabilities[index - 1] || 0)
      };
  }
  throw new Error("not implemented correctly");
};

export const randomBetween = ([low, high]) =>
  Math.floor((high - low) * Math.random() + low);

/**
 * @returns number [1, 100] weighted towards 1
 */
export const logRandomMax100 = () => {
  const maxN = 100;
  const n = 1.1;
  const t = n ** maxN;
  return Math.floor(1 + maxN - Math.log(1 + Math.random() * t) / Math.log(n));
};

// FOR TESTING, mostly

const bucket = (xs, idFn) =>
  xs.reduce(
    (acc, x) => ({
      ...acc,
      [idFn(x)]: (acc[idFn(x)] || []).concat(x)
    }),
    {}
  );

const counts = (xs, idFn = id => id) =>
  Object.values(bucket(xs, idFn))
    .map(x => [idFn(x[0]), x.length])
    .sort(([, lhs], [, rhs]) => rhs - lhs);
