const KEYBOARD_VIEWBOX = Object.freeze({ width: 1376, height: 768, aspectRatio: 0.558140 });

export const SPECIAL_LABELS = Object.freeze({
  SPACE: "space",
  BACKSPACE: "⌫",
  ENTER: "⏎",
  SHIFT: "⇧",
  CAPS: "⇪",
  SYM: "#+=",
});

export const KEY_SHAPES = Object.freeze({
  hex: [
    [0.24, 0],
    [0.76, 0],
    [1, 0.5],
    [0.76, 1],
    [0.24, 1],
    [0, 0.5],
  ],
  enter: [
    [0.18, 0],
    [0.84, 0],
    [1, 0.12],
    [1, 0.88],
    [0.84, 1],
    [0.18, 1],
    [0, 0.84],
    [0, 0.16],
  ],
  space: [
    [0.14, 0],
    [0.86, 0],
    [1, 0.30],
    [0.88, 1],
    [0.12, 1],
    [0, 0.30],
  ],
  rect: [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ],
});

const HEX_TEMPLATE_KEYS = [
  {
    "id": "k01",
    "shape": "hex",
    "x": 0.369913,
    "y": 0.039193,
    "w": 0.070494,
    "h": 0.113281,
    "defaultAction": "e",
    "shiftAction": "E",
    "defaultDisplay": "E",
    "shiftDisplay": "E"
  },
  {
    "id": "k02",
    "shape": "hex",
    "x": 0.452471,
    "y": 0.035677,
    "w": 0.069767,
    "h": 0.115885,
    "defaultAction": "f",
    "shiftAction": "F",
    "defaultDisplay": "F",
    "shiftDisplay": "F"
  },
  {
    "id": "k03",
    "shape": "hex",
    "x": 0.534084,
    "y": 0.038411,
    "w": 0.071221,
    "h": 0.114583,
    "defaultAction": "g",
    "shiftAction": "G",
    "defaultDisplay": "G",
    "shiftDisplay": "G"
  },
  {
    "id": "k04",
    "shape": "hex",
    "x": 0.246076,
    "y": 0.147396,
    "w": 0.070494,
    "h": 0.117188,
    "defaultAction": "1",
    "shiftAction": "!",
    "defaultDisplay": "1",
    "shiftDisplay": "!"
  },
  {
    "id": "k05",
    "shape": "hex",
    "x": 0.323038,
    "y": 0.127214,
    "w": 0.073401,
    "h": 0.123698,
    "defaultAction": "a",
    "shiftAction": "A",
    "defaultDisplay": "A",
    "shiftDisplay": "A"
  },
  {
    "id": "k06",
    "shape": "hex",
    "x": 0.407849,
    "y": 0.120182,
    "w": 0.073401,
    "h": 0.126302,
    "defaultAction": "x",
    "shiftAction": "X",
    "defaultDisplay": "X",
    "shiftDisplay": "X"
  },
  {
    "id": "k07",
    "shape": "hex",
    "x": 0.493677,
    "y": 0.120313,
    "w": 0.073401,
    "h": 0.126302,
    "defaultAction": "y",
    "shiftAction": "Y",
    "defaultDisplay": "Y",
    "shiftDisplay": "Y"
  },
  {
    "id": "k08",
    "shape": "hex",
    "x": 0.576017,
    "y": 0.132812,
    "w": 0.072674,
    "h": 0.125,
    "defaultAction": "b",
    "shiftAction": "B",
    "defaultDisplay": "B",
    "shiftDisplay": "B"
  },
  {
    "id": "k09",
    "shape": "hex",
    "x": 0.658067,
    "y": 0.142318,
    "w": 0.070494,
    "h": 0.11849,
    "defaultAction": "2",
    "shiftAction": "@",
    "defaultDisplay": "2",
    "shiftDisplay": "@"
  },
  {
    "id": "k10",
    "shape": "hex",
    "x": 0.202762,
    "y": 0.249349,
    "w": 0.070494,
    "h": 0.122396,
    "defaultAction": "3",
    "shiftAction": "#",
    "defaultDisplay": "3",
    "shiftDisplay": "#"
  },
  {
    "id": "k11",
    "shape": "hex",
    "x": 0.275073,
    "y": 0.231641,
    "w": 0.074855,
    "h": 0.13151,
    "defaultAction": "c",
    "shiftAction": "C",
    "defaultDisplay": "C",
    "shiftDisplay": "C"
  },
  {
    "id": "k12",
    "shape": "hex",
    "x": 0.359084,
    "y": 0.223958,
    "w": 0.077035,
    "h": 0.132812,
    "defaultAction": "l",
    "shiftAction": "L",
    "defaultDisplay": "L",
    "shiftDisplay": "L"
  },
  {
    "id": "k13",
    "shape": "hex",
    "x": 0.450654,
    "y": 0.220964,
    "w": 0.075581,
    "h": 0.136719,
    "defaultAction": "m",
    "shiftAction": "M",
    "defaultDisplay": "M",
    "shiftDisplay": "M"
  },
  {
    "id": "k14",
    "shape": "hex",
    "x": 0.538372,
    "y": 0.222266,
    "w": 0.076308,
    "h": 0.134115,
    "defaultAction": "n",
    "shiftAction": "N",
    "defaultDisplay": "N",
    "shiftDisplay": "N"
  },
  {
    "id": "k15",
    "shape": "hex",
    "x": 0.62609,
    "y": 0.230208,
    "w": 0.074855,
    "h": 0.13151,
    "defaultAction": "d",
    "shiftAction": "D",
    "defaultDisplay": "D",
    "shiftDisplay": "D"
  },
  {
    "id": "k16",
    "shape": "hex",
    "x": 0.700073,
    "y": 0.251693,
    "w": 0.070494,
    "h": 0.123698,
    "defaultAction": "4",
    "shiftAction": "$",
    "defaultDisplay": "4",
    "shiftDisplay": "$"
  },
  {
    "id": "k17",
    "shape": "hex",
    "x": 0.165189,
    "y": 0.355599,
    "w": 0.06686,
    "h": 0.125,
    "defaultAction": "5",
    "shiftAction": "%",
    "defaultDisplay": "5",
    "shiftDisplay": "%"
  },
  {
    "id": "k18",
    "shape": "hex",
    "x": 0.229797,
    "y": 0.345052,
    "w": 0.074855,
    "h": 0.13151,
    "defaultAction": "+",
    "shiftAction": "=",
    "defaultDisplay": "+",
    "shiftDisplay": "="
  },
  {
    "id": "k19",
    "shape": "hex",
    "x": 0.312718,
    "y": 0.335417,
    "w": 0.077762,
    "h": 0.136719,
    "defaultAction": "h",
    "shiftAction": "H",
    "defaultDisplay": "H",
    "shiftDisplay": "H"
  },
  {
    "id": "k20",
    "shape": "hex",
    "x": 0.402616,
    "y": 0.333333,
    "w": 0.077762,
    "h": 0.138021,
    "defaultAction": "o",
    "shiftAction": "O",
    "defaultDisplay": "O",
    "shiftDisplay": "O"
  },
  {
    "id": "k21",
    "shape": "hex",
    "x": 0.495567,
    "y": 0.333594,
    "w": 0.077762,
    "h": 0.138021,
    "defaultAction": "p",
    "shiftAction": "P",
    "defaultDisplay": "P",
    "shiftDisplay": "P"
  },
  {
    "id": "k22",
    "shape": "hex",
    "x": 0.584375,
    "y": 0.335938,
    "w": 0.078488,
    "h": 0.138021,
    "defaultAction": "i",
    "shiftAction": "I",
    "defaultDisplay": "I",
    "shiftDisplay": "I"
  },
  {
    "id": "k23",
    "shape": "hex",
    "x": 0.671948,
    "y": 0.342969,
    "w": 0.074855,
    "h": 0.134115,
    "defaultAction": "6",
    "shiftAction": "^",
    "defaultDisplay": "6",
    "shiftDisplay": "^"
  },
  {
    "id": "k24",
    "shape": "enter",
    "x": 0.711773,
    "y": 0.375521,
    "w": 0.111192,
    "h": 0.24349,
    "defaultAction": "ENTER",
    "shiftAction": "ENTER",
    "defaultDisplay": "\u23ce",
    "shiftDisplay": "\u23ce"
  },
  {
    "id": "k25",
    "shape": "hex",
    "x": 0.191061,
    "y": 0.461328,
    "w": 0.069767,
    "h": 0.13151,
    "defaultAction": "7",
    "shiftAction": "&",
    "defaultDisplay": "7",
    "shiftDisplay": "&"
  },
  {
    "id": "k26",
    "shape": "hex",
    "x": 0.266134,
    "y": 0.457813,
    "w": 0.076308,
    "h": 0.138021,
    "defaultAction": "q",
    "shiftAction": "Q",
    "defaultDisplay": "Q",
    "shiftDisplay": "Q"
  },
  {
    "id": "k27",
    "shape": "hex",
    "x": 0.354869,
    "y": 0.457031,
    "w": 0.078488,
    "h": 0.139323,
    "defaultAction": "j",
    "shiftAction": "J",
    "defaultDisplay": "J",
    "shiftDisplay": "J"
  },
  {
    "id": "k28",
    "shape": "hex",
    "x": 0.447529,
    "y": 0.455599,
    "w": 0.079215,
    "h": 0.140625,
    "defaultAction": "v",
    "shiftAction": "V",
    "defaultDisplay": "V",
    "shiftDisplay": "V"
  },
  {
    "id": "k29",
    "shape": "hex",
    "x": 0.542006,
    "y": 0.456771,
    "w": 0.079215,
    "h": 0.139323,
    "defaultAction": "k",
    "shiftAction": "K",
    "defaultDisplay": "K",
    "shiftDisplay": "K"
  },
  {
    "id": "k30",
    "shape": "hex",
    "x": 0.632049,
    "y": 0.458594,
    "w": 0.077035,
    "h": 0.136719,
    "defaultAction": "r",
    "shiftAction": "R",
    "defaultDisplay": "R",
    "shiftDisplay": "R"
  },
  {
    "id": "k31",
    "shape": "hex",
    "x": 0.713299,
    "y": 0.448307,
    "w": 0.080669,
    "h": 0.143229,
    "defaultAction": "8",
    "shiftAction": "*",
    "defaultDisplay": "8",
    "shiftDisplay": "*"
  },
  {
    "id": "k32",
    "shape": "hex",
    "x": 0.165843,
    "y": 0.572266,
    "w": 0.063227,
    "h": 0.122396,
    "defaultAction": "@",
    "shiftAction": "~",
    "defaultDisplay": "@",
    "shiftDisplay": "~"
  },
  {
    "id": "k33",
    "shape": "hex",
    "x": 0.224782,
    "y": 0.577214,
    "w": 0.074128,
    "h": 0.132812,
    "defaultAction": "9",
    "shiftAction": "(",
    "defaultDisplay": "9",
    "shiftDisplay": "("
  },
  {
    "id": "k34",
    "shape": "hex",
    "x": 0.309593,
    "y": 0.578385,
    "w": 0.078488,
    "h": 0.136719,
    "defaultAction": "s",
    "shiftAction": "S",
    "defaultDisplay": "S",
    "shiftDisplay": "S"
  },
  {
    "id": "k35",
    "shape": "hex",
    "x": 0.399273,
    "y": 0.579688,
    "w": 0.079942,
    "h": 0.140625,
    "defaultAction": "u",
    "shiftAction": "U",
    "defaultDisplay": "U",
    "shiftDisplay": "U"
  },
  {
    "id": "k36",
    "shape": "hex",
    "x": 0.496366,
    "y": 0.578516,
    "w": 0.079215,
    "h": 0.140625,
    "defaultAction": "w",
    "shiftAction": "W",
    "defaultDisplay": "W",
    "shiftDisplay": "W"
  },
  {
    "id": "k37",
    "shape": "hex",
    "x": 0.587936,
    "y": 0.577995,
    "w": 0.078488,
    "h": 0.136719,
    "defaultAction": "t",
    "shiftAction": "T",
    "defaultDisplay": "T",
    "shiftDisplay": "T"
  },
  {
    "id": "k38",
    "shape": "hex",
    "x": 0.675509,
    "y": 0.575781,
    "w": 0.074855,
    "h": 0.134115,
    "defaultAction": "0",
    "shiftAction": ")",
    "defaultDisplay": "0",
    "shiftDisplay": ")"
  },
  {
    "id": "k39",
    "shape": "hex",
    "x": 0.746948,
    "y": 0.571745,
    "w": 0.063953,
    "h": 0.121094,
    "defaultAction": "*",
    "shiftAction": "\u2022",
    "defaultDisplay": "*",
    "shiftDisplay": "\u2022"
  },
  {
    "id": "k40",
    "shape": "hex",
    "x": 0.199346,
    "y": 0.683724,
    "w": 0.06686,
    "h": 0.123698,
    "defaultAction": "SHIFT",
    "shiftAction": "SHIFT",
    "defaultDisplay": "\u21e7",
    "shiftDisplay": "\u21e7"
  },
  {
    "id": "k41",
    "shape": "hex",
    "x": 0.269767,
    "y": 0.689844,
    "w": 0.077035,
    "h": 0.136719,
    "defaultAction": "BACKSPACE",
    "shiftAction": "BACKSPACE",
    "defaultDisplay": "\u232b",
    "shiftDisplay": "\u232b"
  },
  {
    "id": "k42",
    "shape": "hex",
    "x": 0.353706,
    "y": 0.699219,
    "w": 0.079942,
    "h": 0.138021,
    "defaultAction": "!",
    "shiftAction": "\u00a1",
    "defaultDisplay": "!",
    "shiftDisplay": "\u00a1"
  },
  {
    "id": "k43",
    "shape": "hex",
    "x": 0.447602,
    "y": 0.701953,
    "w": 0.079215,
    "h": 0.140625,
    "defaultAction": "z",
    "shiftAction": "Z",
    "defaultDisplay": "Z",
    "shiftDisplay": "Z"
  },
  {
    "id": "k44",
    "shape": "hex",
    "x": 0.541279,
    "y": 0.698698,
    "w": 0.079215,
    "h": 0.138021,
    "defaultAction": "?",
    "shiftAction": "\u00bf",
    "defaultDisplay": "?",
    "shiftDisplay": "\u00bf"
  },
  {
    "id": "k45",
    "shape": "hex",
    "x": 0.628488,
    "y": 0.688021,
    "w": 0.077035,
    "h": 0.135417,
    "defaultAction": ".",
    "shiftAction": ":",
    "defaultDisplay": ".",
    "shiftDisplay": ":"
  },
  {
    "id": "k46",
    "shape": "hex",
    "x": 0.707631,
    "y": 0.679688,
    "w": 0.067587,
    "h": 0.123698,
    "defaultAction": "-",
    "shiftAction": "_",
    "defaultDisplay": "-",
    "shiftDisplay": "_"
  },
  {
    "id": "k47",
    "shape": "hex",
    "x": 0.313445,
    "y": 0.805599,
    "w": 0.077762,
    "h": 0.130208,
    "defaultAction": "SYM",
    "shiftAction": "SYM",
    "defaultDisplay": "#+=",
    "shiftDisplay": "#+="
  },
  {
    "id": "k48",
    "shape": "space",
    "x": 0.397892,
    "y": 0.815234,
    "w": 0.170785,
    "h": 0.136719,
    "defaultAction": "SPACE",
    "shiftAction": "SPACE",
    "defaultDisplay": "space",
    "shiftDisplay": "space"
  },
  {
    "id": "k49",
    "shape": "hex",
    "x": 0.581831,
    "y": 0.805339,
    "w": 0.077035,
    "h": 0.13151,
    "defaultAction": ",",
    "shiftAction": ";",
    "defaultDisplay": ",",
    "shiftDisplay": ";"
  }
];

function isLetter(value) {
  return /^[a-z]$/i.test(String(value));
}

function normalizeDisplay(value) {
  if (value == null) return "";
  return isLetter(value) ? String(value).toUpperCase() : String(value);
}

function resolveUsesShift(key, shiftOn, capsLock, symbolMode) {
  if (symbolMode) return true;
  if (shiftOn) return true;
  if (capsLock && isLetter(key.defaultAction)) return true;
  return false;
}

function resolveKeyState(key, shiftOn, capsLock, symbolMode) {
  const usesShift = resolveUsesShift(key, shiftOn, capsLock, symbolMode);
  const action = usesShift ? key.shiftAction : key.defaultAction;
  const display = usesShift ? key.shiftDisplay : key.defaultDisplay;
  const active = key.defaultAction === "SHIFT"
    ? Boolean(shiftOn || capsLock)
    : key.defaultAction === "SYM"
      ? Boolean(symbolMode)
      : false;

  return {
    ...key,
    label: action,
    display: normalizeDisplay(display),
    active,
    usesShift,
  };
}

export function currentLayout({ shiftOn = false, capsLock = false, symbolMode = false } = {}) {
  return HEX_TEMPLATE_KEYS.map((key) => resolveKeyState(key, shiftOn, capsLock, symbolMode));
}

export function getKeyboardAspectRatio() {
  return KEYBOARD_VIEWBOX.aspectRatio;
}

export function getShapePoints(shape = "rect") {
  return KEY_SHAPES[shape] || KEY_SHAPES.rect;
}

export function pointInPolygon(px, py, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const xi = points[i][0];
    const yi = points[i][1];
    const xj = points[j][0];
    const yj = points[j][1];
    const intersects = ((yi > py) !== (yj > py))
      && (px < ((xj - xi) * (py - yi)) / ((yj - yi) || 1e-9) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}

export function pointInKey(u, v, key, padding = 0) {
  const minX = key.x - padding;
  const minY = key.y - padding;
  const maxX = key.x + key.w + padding;
  const maxY = key.y + key.h + padding;
  if (u < minX || u > maxX || v < minY || v > maxY) return false;

  const localX = (u - key.x) / Math.max(key.w, 1e-6);
  const localY = (v - key.y) / Math.max(key.h, 1e-6);

  if (padding > 0 && (localX < 0 || localX > 1 || localY < 0 || localY > 1)) return true;
  return pointInPolygon(localX, localY, getShapePoints(key.shape));
}

export function formatKeyLabel(label) {
  return SPECIAL_LABELS[label] || label;
}
