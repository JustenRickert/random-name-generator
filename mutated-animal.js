import { sample, randomWeighted, range } from "./util.js";

const BASE_ANIMAL = [
  "aardvark",
  "albatross",
  "alligator",
  "alpaca",
  "ant",
  "anteater",
  "antelope",
  "ape",
  "armadillio",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bee",
  "binturong",
  "bird",
  "bison",
  "bluebird",
  "boar",
  "bobcat",
  "buffalo",
  "butterfly",
  "camel",
  "capybara",
  "caracal",
  "cassowary",
  "cat",
  "caterpillar",
  "cattle",
  "chameleon",
  "chamois",
  "cheetah",
  "chicken",
  "chimpanzee",
  "chinchilla",
  "chough",
  "coati",
  "cobra",
  "cockroach",
  "cod",
  "cormorant",
  "cougar",
  "coyote",
  "crab",
  "crane",
  "cricket",
  "crocodile",
  "crow",
  "cuckoo",
  "curlew",
  "deer",
  "degu",
  "dhole",
  "dingo",
  "dinosaur",
  "dog",
  "dogfish",
  "dolphin",
  "dove",
  "dragonfly",
  "duck",
  "dugong",
  "dunlin",
  "eagle",
  "echidna",
  "eel",
  "eland",
  "elephant",
  "elephant seal",
  "elk",
  "emu",
  "falcon",
  "ferret",
  "finch",
  "fish",
  "flamingo",
  "fly",
  "fox",
  "frog",
  "donkey"
];

const PRE_ATTRIBUTES = [
  "abused",
  "alien",
  "domesticated",
  "fluffy",
  "helpless",
  "intelligent",
  "premature",
  "purple",
  "sapient",
  "sightless",
  "spotted",
  "trained",
  "pregnant"
];

const PREDICATES = [
  "of the day",
  "of the night",
  "of the moon",
  "fallen from heaven",
  "having all the fun",
  "from Arrakis, desert planet",
  "without all the bits",
  "from Mars",
  "at the zoo",
  "with ability to reason",
  "without the ability to comprehend time",
  "with fantastic eyesight"
];

const animalName = () => {
  const hasAdj = randomWeighted([undefined, "yes"], { [undefined]: 3 }).value;
  const adj = hasAdj && sample(PRE_ATTRIBUTES);
  const animal = sample(BASE_ANIMAL);
  const hasPred = randomWeighted([undefined, "yes"], {
    [undefined]: hasAdj ? 5 : 3,
    ["without the ability to comprehend time"]: 0.01,
    ["with ability to reason"]: 0.01
  }).value;
  const pred = hasPred && sample(PREDICATES);
  return [adj, animal, pred].filter(Boolean).join(" ");
};

console.log(range(50).map(() => animalName()));
