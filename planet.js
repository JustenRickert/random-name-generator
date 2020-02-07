import {
  sample,
  logRandomMax100,
  randomWeighted,
  range,
  randomBetween
} from "./util.js";

const PLANET_NAME_PART = [
  "Cancri",
  "Gliese",
  "Iota Horologii",
  "Kapteyn",
  "Beta Pictoris",
  "Chi Virginis",
  "Kepler",
  "Epsilon Eridani",
  "Pegasi",
  "Piscium",
  "Proxima Centauri",
  "Chamaeleontis",
  "Ross",
  "Tau Boötis",
  "Upsilon Andromedae",
  "Andromedae",
  "Herculis",
  "Delphini",
  "Arietis",
  "Lyncis",
  "Virginis",
  "Comae Berenices",
  "Ursae Minoris"
];

const PLANET_NAME_ABBR = [
  "BD",
  "PSR",
  "CHXR",
  "COROT",
  "HAT",
  "HD",
  "HIP",
  "HR",
  "K2",
  "KELT",
  "LHS",
  "PH",
  "PSR",
  "SWEEPS",
  "TRAPPIST",
  "WASP"
];

const randomPost = () =>
  randomWeighted(["a", "b", "c", "d", "Bb", "Ab", undefined], {
    [undefined]: 5
  }).value;

const maybeSignedN = () => {
  const sign = sample(["+", "-", undefined]);
  const signN = sign && sign + logRandomMax100();
  return signN;
};

const planetName = () => {
  const type = sample(["prefix", "abbr"]);
  switch (type) {
    case "prefix": {
      const pre = logRandomMax100();
      const part = sample(PLANET_NAME_PART);
      const post = randomPost();
      return [pre, part, post].filter(Boolean).join(" ");
    }
    case "abbr": {
      const abbr = sample(PLANET_NAME_ABBR);
      const signN = maybeSignedN();
      const spaceBeforeSign =
        signN &&
        randomWeighted(["yes", undefined], {
          [undefined]: 3
        }).value;
      const post = randomPost();
      return [
        [abbr, signN && spaceBeforeSign && " ", signN].filter(Boolean).join(""),
        !signN &&
          [sample(["A", "B"]), randomBetween([1e3, 1e4]), maybeSignedN()].join(
            ""
          ),
        post
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/ +/g, " ");
    }
  }
};

console.log(range(50).map(planetName));
