import {
  KalmanPointFilter,
  angleDeg,
  averagePoint,
  averagePoint3,
  clamp,
  cross3,
  deepClone,
  distance,
  distance3,
  dot,
  getCurrentWord,
  mapRange,
  normalize,
  normalize3,
  perpendicularDown,
  replaceCurrentWord,
  rotateVector,
} from "./utils.js";
import { getSuggestions } from "./words.js";
import { currentLayout, formatKeyLabel, getKeyboardAspectRatio, pointInKey } from "./keyboardLayout.js";

export const TIP_INDICES = [4, 8, 12, 16, 20];
export const FINGER_NAMES = { 4: "thumb", 8: "index", 12: "middle", 16: "ring", 20: "pinky" };
export { currentLayout, formatKeyLabel };

export function createFilterPreset(mode, confidence = 1, bedMode = false) {
  const lowConfidenceBoost = confidence < 0.78 ? 0.14 : 0;
  if (mode === "fast") return { alpha: 0.48 + lowConfidenceBoost, pressDepth: 0.0087, pressVelocity: 0.00062, pressAcceleration: 0.00024, hoverMs: 40 };
  if (mode === "stable") return { alpha: 0.2 + lowConfidenceBoost, pressDepth: 0.0106, pressVelocity: 0.00048, pressAcceleration: 0.00018, hoverMs: 60 };
  if (mode === "bed") return { alpha: 0.16 + lowConfidenceBoost, pressDepth: 0.0073, pressVelocity: 0.00042, pressAcceleration: 0.00015, hoverMs: 58 };
  return { alpha: 0.32 + lowConfidenceBoost, pressDepth: bedMode ? 0.0078 : 0.0096, pressVelocity: 0.00052, pressAcceleration: 0.0002, hoverMs: 48 };
}

export function getPoint(rect, landmark, mirrored) {
  let x = landmark.x * rect.width;
  if (mirrored) x = rect.width - x;
  return { x, y: landmark.y * rect.height, z: landmark.z };
}

export function smoothCursor(id, point, filters, preset) {
  if (!filters.has(id)) filters.set(id, new KalmanPointFilter({ q: 0.008, r: 0.12 }));
  const filter = filters.get(id);
  return filter.filter(point, preset.alpha);
}

export function getHandConfidence(result, handIndex) {
  const handedness = result?.handedness?.[handIndex] || result?.handednesses?.[handIndex] || [];
  return handedness?.[0]?.score ?? 1;
}

export function fitPlaneLeastSquares(points3D) {
  if (points3D.length < 3) return null;
  let sumX = 0, sumY = 0, sumZ = 0;
  let sumXX = 0, sumYY = 0, sumXY = 0, sumXZ = 0, sumYZ = 0;
  for (const p of points3D) {
    sumX += p.x; sumY += p.y; sumZ += p.z;
    sumXX += p.x * p.x; sumYY += p.y * p.y; sumXY += p.x * p.y;
    sumXZ += p.x * p.z; sumYZ += p.y * p.z;
  }
  const n = points3D.length;
  const A = [
    [sumXX, sumXY, sumX],
    [sumXY, sumYY, sumY],
    [sumX, sumY, n],
  ];
  const B = [sumXZ, sumYZ, sumZ];
  const solution = solve3x3(A, B);
  if (!solution) return null;
  const [a, b, c] = solution;
  const normal = normalize3({ x: -a, y: -b, z: 1 });
  let error = 0;
  for (const p of points3D) {
    const fitted = a * p.x + b * p.y + c;
    error += Math.abs(fitted - p.z);
  }
  error /= n;
  const centroid = averagePoint3(points3D);
  return { a, b, c, normal, centroid, error, tilt: 1 - clamp(Math.abs(normal.z), 0, 1) };
}

function solve3x3(A, B) {
  const m = A.map((row, i) => row.concat(B[i]));
  for (let i = 0; i < 3; i += 1) {
    let maxRow = i;
    for (let j = i + 1; j < 3; j += 1) if (Math.abs(m[j][i]) > Math.abs(m[maxRow][i])) maxRow = j;
    if (Math.abs(m[maxRow][i]) < 1e-9) return null;
    [m[i], m[maxRow]] = [m[maxRow], m[i]];
    const pivot = m[i][i];
    for (let k = i; k < 4; k += 1) m[i][k] /= pivot;
    for (let j = 0; j < 3; j += 1) {
      if (j === i) continue;
      const factor = m[j][i];
      for (let k = i; k < 4; k += 1) m[j][k] -= factor * m[i][k];
    }
  }
  return [m[0][3], m[1][3], m[2][3]];
}

export function computeCalibration({ landmarks, worldLandmarks, rect, mirrored, bedMode }) {
  if (!landmarks || !worldLandmarks) return null;
  const wrist = getPoint(rect, landmarks[0], mirrored);
  const indexMcp = getPoint(rect, landmarks[5], mirrored);
  const pinkyMcp = getPoint(rect, landmarks[17], mirrored);
  const indexTip = getPoint(rect, landmarks[8], mirrored);
  const middleTip = getPoint(rect, landmarks[12], mirrored);
  const plane = fitPlaneLeastSquares([0, 5, 8, 9, 12, 13, 16, 17, 20].map((i) => worldLandmarks[i]).filter(Boolean));
  const spanPx = distance(indexMcp, pinkyMcp);
  const fingerSpanPx = distance(indexTip, middleTip);
  const spanWorld = worldLandmarks[5] && worldLandmarks[17] ? distance3(worldLandmarks[5], worldLandmarks[17]) : 0;
  const fingerSpanWorld = worldLandmarks[8] && worldLandmarks[12] ? distance3(worldLandmarks[8], worldLandmarks[12]) : 0;
  const wristAngle = angleDeg({ x: indexMcp.x - wrist.x, y: indexMcp.y - wrist.y });
  const planeNormal = plane?.normal?.z < 0 ? { x: -plane.normal.x, y: -plane.normal.y, z: -plane.normal.z } : plane?.normal || { x: 0, y: 0, z: 1 };
  const bedPitchDeg = Math.atan2(planeNormal.y, Math.max(Math.abs(planeNormal.z), 1e-4)) * 180 / Math.PI;
  const bedRollDegRaw = Math.atan2(planeNormal.x, Math.max(Math.abs(planeNormal.z), 1e-4)) * 180 / Math.PI;
  const bedRollDeg = mirrored ? -bedRollDegRaw : bedRollDegRaw;
  const bedReclineDeg = Math.hypot(bedPitchDeg, bedRollDeg);
  const tiltFactor = plane ? clamp(Math.abs(planeNormal.z), 0.35, 1) : 0.8;
  const planeQuality = plane ? 1 - clamp(plane.error * 28, 0, 0.42) : 0.68;
  const spanFactor = clamp(mapRange(spanPx, 80, 240, 1.18, 0.88), 0.75, 1.3);
  const handSizeFactor = spanWorld ? clamp(mapRange(spanWorld, 0.05, 0.105, 0.94, 1.08), 0.9, 1.12) : 1;
  const fingerSizeFactor = fingerSpanWorld ? clamp(mapRange(fingerSpanWorld, 0.018, 0.05, 0.96, 1.08), 0.92, 1.1) : 1;
  const bedDepthFactor = bedMode ? clamp(mapRange(bedReclineDeg, 0, 58, 1, 0.76), 0.72, 1) : 1;
  const bedScaleBoost = bedMode ? clamp(mapRange(bedReclineDeg, 0, 58, 1, 1.1), 1, 1.12) : 1;
  const sideAngleBoost = bedMode ? clamp(mapRange(Math.abs(bedRollDeg), 0, 34, 1, 1.05), 1, 1.06) : 1;
  const pressDepth = (bedMode ? 0.0068 : 0.0086)
    * tiltFactor
    * spanFactor
    * handSizeFactor
    * fingerSizeFactor
    * bedDepthFactor
    * clamp(mapRange(planeQuality, 0.5, 1, 1.08, 0.94), 0.92, 1.1);
  const keyboardScale = clamp(
    mapRange(spanPx, 90, 240, 0.9, 1.25) * handSizeFactor * bedScaleBoost * sideAngleBoost,
    0.88,
    bedMode ? 1.42 : 1.32,
  );
  return {
    spanPx,
    fingerSpanPx,
    spanWorld,
    fingerSpanWorld,
    wristAngle,
    tiltFactor,
    planeQuality,
    pressDepth,
    keyboardScale,
    plane,
    bedAngles: {
      pitchDeg: bedPitchDeg,
      rollDeg: bedRollDeg,
      reclineDeg: bedReclineDeg,
    },
    timestamp: Date.now(),
  };
}

export function createAnchorFromHand({ landmarks, worldLandmarks, rect, mirrored, anchorMode, calibration, bedMode }) {
  if (!landmarks) return null;
  const wrist = getPoint(rect, landmarks[0], mirrored);
  const indexTip = getPoint(rect, landmarks[8], mirrored);
  const thumbTip = getPoint(rect, landmarks[4], mirrored);
  const middleMcp = getPoint(rect, landmarks[9], mirrored);
  const pinkyMcp = getPoint(rect, landmarks[17], mirrored);
  const indexMcp = getPoint(rect, landmarks[5], mirrored);
  const palmCenter = averagePoint([wrist, middleMcp, pinkyMcp, indexMcp]);
  const plane = fitPlaneLeastSquares([0, 5, 8, 9, 12, 13, 16, 17, 20].map((i) => worldLandmarks?.[i]).filter(Boolean));
  const pinchDistance = distance(indexTip, thumbTip) / Math.max(rect.width, rect.height);
  const isGrab = pinchDistance < 0.12;
  const xAxisRaw = normalize({ x: indexMcp.x - pinkyMcp.x, y: indexMcp.y - pinkyMcp.y });
  const xAxis = xAxisRaw.x < 0 ? { x: -xAxisRaw.x, y: -xAxisRaw.y } : xAxisRaw;
  let yAxis = anchorMode === "surface" ? normalize({ x: middleMcp.x - wrist.x, y: middleMcp.y - wrist.y }) : perpendicularDown(xAxis);
  if (!Number.isFinite(yAxis.x) || !Number.isFinite(yAxis.y) || Math.abs(dot(xAxis, yAxis)) > 0.84) yAxis = perpendicularDown(xAxis);
  if (anchorMode === "surface" && yAxis.y < 0) yAxis = { x: -yAxis.x, y: -yAxis.y };
  if (anchorMode === "air") yAxis = perpendicularDown(xAxis);
  const handSpan = distance(indexMcp, pinkyMcp);
  const calibrationScale = calibration?.keyboardScale ?? 1;
  const sculptScale = clamp(mapRange(pinchDistance, 0.025, 0.15, 0.72, 1.7), 0.62, 2.05);
  const width = handSpan * (bedMode ? 3.2 : 3.0) * sculptScale * calibrationScale;
  const height = width * getKeyboardAspectRatio();
  const center = anchorMode === "surface"
    ? { x: palmCenter.x, y: palmCenter.y + height * (bedMode ? 0.04 : 0.08) }
    : { x: palmCenter.x, y: palmCenter.y - height * 0.12 };
  const perspective = plane ? clamp(plane.tilt * 0.34, 0.03, 0.18) : 0.06;
  return {
    center,
    xAxis,
    yAxis,
    baseWidth: width,
    baseHeight: height,
    perspective,
    planeQuality: plane ? 1 - clamp(plane.error * 32, 0, 0.55) : 0.48,
    pinchDistance,
    isGrab,
    anchorMode,
  };
}

export function getActiveAnchor(anchor, keyboardScale, rotationOffsetDeg, anchorMode) {
  if (!anchor) return null;
  const radians = rotationOffsetDeg * Math.PI / 180;
  let xAxis = rotateVector(anchor.xAxis, radians);
  if (xAxis.x < 0) xAxis = { x: -xAxis.x, y: -xAxis.y };
  let yAxis = (anchorMode === "surface" || anchor.anchorMode === "surface") ? rotateVector(anchor.yAxis, radians) : perpendicularDown(xAxis);
  if (anchorMode === "air") yAxis = perpendicularDown(xAxis);
  return {
    center: { ...anchor.center },
    xAxis: normalize(xAxis),
    yAxis: normalize(yAxis),
    width: anchor.baseWidth * keyboardScale,
    height: anchor.baseHeight * keyboardScale,
    perspective: anchor.perspective || 0.06,
    anchorMode: anchor.anchorMode || anchorMode,
  };
}

export function keyAtPoint(point, anchor, layout, lockedLabel = null, snapPadding = 0.028, stickyPadding = 0.055) {
  const rel = { x: point.x - anchor.center.x, y: point.y - anchor.center.y };
  const u = dot(rel, anchor.xAxis) / anchor.width + 0.5;
  const v = dot(rel, anchor.yAxis) / anchor.height + 0.5;

  if (lockedLabel) {
    const lockedKey = layout.find((key) => key.label === lockedLabel);
    if (lockedKey && pointInKey(u, v, lockedKey, stickyPadding)) return { key: lockedKey, u, v };
  }
  for (const key of layout) {
    if (pointInKey(u, v, key, snapPadding)) return { key, u, v };
  }
  let nearest = null;
  let nearestDistance = Infinity;
  for (const key of layout) {
    const centerU = key.x + key.w / 2;
    const centerV = key.y + key.h / 2;
    const du = (u - centerU) / Math.max(key.w, 0.001);
    const dv = (v - centerV) / Math.max(key.h, 0.001);
    const dist = Math.hypot(du, dv);
    if (dist < nearestDistance) {
      nearestDistance = dist;
      nearest = { key, u, v };
    }
  }
  return nearestDistance <= 0.9 ? nearest : null;
}


export function getFingerState(map, id) {
  if (!map.has(id)) {
    map.set(id, {
      hoverSince: 0,
      lastCommitTime: 0,
      lastHoverKey: null,
      lastZ: null,
      lastVelocity: 0,
      depthBaseline: 0,
      depthVelocity: 0,
      depthAcceleration: 0,
      pressActive: false,
      pressPeak: 0,
      palmOpenSince: 0,
      lastGuardPoint: null,
      jitterPx: 0,
      stableSince: 0,
      stabilityBlockedUntil: 0,
    });
  }
  return map.get(id);
}

export function updateDepthState(state, z) {
  if (state.lastZ === null) {
    state.lastZ = z;
    state.depthVelocity = 0;
    state.depthAcceleration = 0;
    state.depthBaseline = z;
    return;
  }
  const velocity = z - state.lastZ;
  state.depthAcceleration = velocity - state.lastVelocity;
  state.depthVelocity = velocity;
  state.lastVelocity = velocity;
  state.lastZ = z;
  const baselineAlpha = state.pressActive ? 0.012 : 0.05;
  state.depthBaseline = state.depthBaseline + (z - state.depthBaseline) * baselineAlpha;
}


export function updateStabilityGuard(state, point, now, { confidence = 1, planeQuality = 1, anchorWidth = 0, bedMode = false } = {}) {
  const jumpThreshold = Math.max(anchorWidth * (bedMode ? 0.12 : 0.09), bedMode ? 20 : 16);
  const jitterThreshold = Math.max(anchorWidth * (bedMode ? 0.04 : 0.032), 7);
  const settleMs = bedMode ? 96 : 68;
  const cooldownMs = bedMode ? 120 : 84;

  const movement = state.lastGuardPoint ? distance(point, state.lastGuardPoint) : 0;
  state.jitterPx = state.lastGuardPoint ? state.jitterPx * 0.74 + movement * 0.26 : 0;
  state.lastGuardPoint = { x: point.x, y: point.y };

  const confidenceStable = confidence >= 0.72;
  const planeStable = planeQuality >= 0.34;
  const movementStable = movement <= jumpThreshold;
  const jitterStable = state.jitterPx <= jitterThreshold;
  const stable = confidenceStable && planeStable && movementStable && jitterStable;

  if (!stable) {
    state.stableSince = 0;
    state.stabilityBlockedUntil = now + cooldownMs;
    state.pressActive = false;
    state.pressPeak = 0;
    return {
      stable: false,
      settled: false,
      movement,
      jitterPx: state.jitterPx,
      jumpThreshold,
      jitterThreshold,
    };
  }

  if (!state.stableSince) state.stableSince = now;
  const settled = now >= (state.stabilityBlockedUntil || 0) && now - state.stableSince >= settleMs;
  return {
    stable: true,
    settled,
    movement,
    jitterPx: state.jitterPx,
    jumpThreshold,
    jitterThreshold,
  };
}

export function detectPressGesture(state, z, now, thresholds, confidence) {
  if (confidence < 0.7) return { pressed: false, score: 0 };
  const depthDelta = Math.abs(z - state.depthBaseline);
  const velocity = Math.abs(state.depthVelocity);
  const acceleration = Math.abs(state.depthAcceleration);
  const score = depthDelta * 120 + velocity * 1200 + acceleration * 2000;

  if (!state.pressActive) {
    if (!state.hoverSince || now - state.hoverSince < thresholds.hoverMs) return { pressed: false, score };
    if (depthDelta > thresholds.pressDepth && velocity > thresholds.pressVelocity && acceleration > thresholds.pressAcceleration) {
      state.pressActive = true;
      state.pressPeak = depthDelta;
    }
    return { pressed: false, score };
  }

  state.pressPeak = Math.max(state.pressPeak || 0, depthDelta);
  if (depthDelta < thresholds.pressDepth * 0.46) {
    const peak = state.pressPeak || 0;
    state.pressActive = false;
    state.pressPeak = 0;
    state.depthBaseline = z;
    return { pressed: peak > thresholds.pressDepth * 1.1, score };
  }
  return { pressed: false, score };
}

export function detectTwoFingerSwipe(hand, rect, mirrored, state) {
  const indexTip = getPoint(rect, hand[8], mirrored);
  const middleTip = getPoint(rect, hand[12], mirrored);
  const center = averagePoint([indexTip, middleTip]);
  if (!state.lastSwipePoint) {
    state.lastSwipePoint = center;
    return null;
  }
  const dx = center.x - state.lastSwipePoint.x;
  const dy = center.y - state.lastSwipePoint.y;
  state.lastSwipePoint = center;
  if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.3) return dx > 0 ? "CAPS" : "SHIFT";
  if (Math.abs(dy) > 54 && Math.abs(dy) > Math.abs(dx) * 1.2) return dy > 0 ? "SCROLL_DOWN" : "SCROLL_UP";
  return null;
}

export function isPalmOpen(hand, rect, mirrored) {
  const wrist = getPoint(rect, hand[0], mirrored);
  const tips = [8, 12, 16, 20].map((index) => getPoint(rect, hand[index], mirrored));
  const avg = tips.reduce((sum, tip) => sum + distance(wrist, tip), 0) / tips.length;
  return avg > rect.width * 0.15;
}

export function detectThreeFingerSpread(hand, worldLandmarks) {
  if (!hand || !worldLandmarks) return false;
  const a = distance3(worldLandmarks[8], worldLandmarks[12]);
  const b = distance3(worldLandmarks[12], worldLandmarks[16]);
  return a > 0.035 && b > 0.03;
}

export function applyKeyToText(text, label, { shiftOn = false, capsLock = false, symbolMode = false } = {}) {
  let nextText = text;
  let nextShift = shiftOn;
  let nextCaps = capsLock;
  let nextSymbols = symbolMode;

  if (label === "SPACE") nextText += " ";
  else if (label === "BACKSPACE") nextText = nextText.slice(0, -1);
  else if (label === "ENTER") nextText += "\n";
  else if (label === "LEFT") nextText += "←";
  else if (label === "RIGHT") nextText += "→";
  else if (label === "SHIFT") nextShift = !shiftOn;
  else if (label === "CAPS") nextCaps = !capsLock;
  else if (label === "SYM") nextSymbols = !symbolMode;
  else {
    if (/^[a-z]$/i.test(label)) {
      const upper = nextShift || nextCaps;
      nextText += upper ? label.toUpperCase() : label.toLowerCase();
    } else {
      nextText += label;
    }
    if (nextShift) nextShift = false;
  }
  return { text: nextText, shiftOn: nextShift, capsLock: nextCaps, symbolMode: nextSymbols };
}

export function insertVoiceText(text, phrase) {
  const spaced = text && !/[\s\n]$/.test(text) ? `${text} ${phrase}` : `${text}${phrase}`;
  return spaced;
}

export function getTextSuggestions(text) {
  return getSuggestions(getCurrentWord(text));
}

export function applySuggestion(text, suggestion) {
  const currentWord = getCurrentWord(text);
  if (!currentWord) return `${text}${text && !/[\s\n]$/.test(text) ? " " : ""}${suggestion}`;
  return replaceCurrentWord(text, suggestion);
}
