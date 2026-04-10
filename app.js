const svg = document.getElementById('keyboardSvg');
const stage = document.getElementById('stage');
const referenceOverlay = document.getElementById('referenceOverlay');
const overlayOpacityInput = document.getElementById('overlayOpacity');
const controls = document.querySelectorAll('[data-toggle]');

const state = {
  labels: true,
  guides: true,
  reference: false,
};

const keyRows = [
  [
    { label: 'E', x: 628, y: 84 },
    { label: 'F', x: 750, y: 84 },
    { label: 'G', x: 874, y: 84 },
  ],
  [
    { label: '1', x: 454, y: 146 },
    { label: 'A', x: 572, y: 146 },
    { label: 'X', x: 690, y: 146 },
    { label: 'Y', x: 808, y: 146 },
    { label: 'B', x: 926, y: 146 },
    { label: '2', x: 1044, y: 146 },
  ],
  [
    { label: '3', x: 374, y: 207 },
    { label: 'C', x: 498, y: 207 },
    { label: 'L', x: 630, y: 207 },
    { label: 'M', x: 748, y: 207 },
    { label: 'N', x: 866, y: 207 },
    { label: 'D', x: 992, y: 207 },
    { label: '4', x: 1112, y: 207 },
    { label: 'enter', x: 1232, y: 207, width: 154, shape: 'enter', fontSize: 24 },
  ],
  [
    { label: '5', x: 306, y: 268 },
    { label: '+', x: 420, y: 268 },
    { label: 'H', x: 572, y: 268 },
    { label: 'O', x: 690, y: 268 },
    { label: 'P', x: 808, y: 268 },
    { label: 'I', x: 926, y: 268 },
    { label: '6', x: 1044, y: 268 },
  ],
  [
    { label: '7', x: 354, y: 329 },
    { label: 'Q', x: 480, y: 329 },
    { label: 'J', x: 614, y: 329 },
    { label: 'V', x: 752, y: 329 },
    { label: 'K', x: 890, y: 329 },
    { label: 'R', x: 1026, y: 329 },
    { label: '8', x: 1162, y: 329 },
  ],
  [
    { label: '@', x: 276, y: 391 },
    { label: '9', x: 402, y: 391 },
    { label: 'S', x: 540, y: 391 },
    { label: 'U', x: 678, y: 391 },
    { label: 'W', x: 816, y: 391 },
    { label: 'T', x: 954, y: 391 },
    { label: '0', x: 1092, y: 391 },
    { label: '*', x: 1230, y: 391 },
  ],
  [
    { label: 'shift', x: 340, y: 454, fontSize: 18 },
    { label: 'ctrl', x: 478, y: 454, fontSize: 18 },
    { label: '!', x: 616, y: 454 },
    { label: 'Z', x: 754, y: 454 },
    { label: '?', x: 892, y: 454 },
    { label: '.', x: 1030, y: 454 },
    { label: '-', x: 1168, y: 454 },
  ],
  [
    { label: 'alt', x: 526, y: 548, fontSize: 18 },
    { label: '', x: 664, y: 548 },
    { label: 'space', x: 802, y: 548, width: 148, fontSize: 18 },
    { label: '', x: 940, y: 548 },
    { label: ',', x: 1078, y: 548 },
    { label: '', x: 1216, y: 548 },
  ],
];

const fingerText = [
  { text: 'th', x: 398, y: 162, size: 118 },
  { text: 'u', x: 430, y: 292, size: 118 },
  { text: 'm', x: 401, y: 420, size: 118 },
  { text: 'b', x: 398, y: 548, size: 118 },

  { text: '3', x: 754, y: 78, size: 112 },
  { text: 'middl', x: 690, y: 246, size: 118 },
  { text: 'e', x: 688, y: 384, size: 118 },
  { text: 'fin3er', x: 690, y: 520, size: 118 },
  { text: 's', x: 688, y: 660, size: 112 },

  { text: 'Pin', x: 1088, y: 110, size: 112 },
  { text: 'ky', x: 1096, y: 250, size: 112 },
  { text: 'Fin', x: 1050, y: 390, size: 112 },
  { text: 'ge', x: 1044, y: 520, size: 112 },
  { text: 'r', x: 982, y: 620, size: 112 },
];

const guideRects = [
  { x: 0, y: 78, width: 533, height: 534 },
  { x: 845, y: 78, width: 531, height: 534 },
];

function createSvgElement(name, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function keyPath(cx, cy, width = 106, height = 86) {
  const hw = width / 2;
  const hh = height / 2;
  const inset = Math.min(22, width * 0.2);
  return [
    `M ${cx - hw + inset} ${cy - hh}`,
    `L ${cx + hw - inset} ${cy - hh}`,
    `L ${cx + hw} ${cy}`,
    `L ${cx + hw - inset} ${cy + hh}`,
    `L ${cx - hw + inset} ${cy + hh}`,
    `L ${cx - hw} ${cy}`,
    'Z',
  ].join(' ');
}

function enterPath(cx, cy, width = 154, height = 86) {
  const body = width - 44;
  const left = cx - width / 2;
  const rightBody = left + body;
  const top = cy - height / 2;
  const bottom = cy + height / 2;
  return [
    `M ${left + 18} ${top}`,
    `L ${rightBody - 18} ${top}`,
    `L ${rightBody + 28} ${cy}`,
    `L ${rightBody - 18} ${bottom}`,
    `L ${left + 18} ${bottom}`,
    `L ${left} ${cy}`,
    'Z',
  ].join(' ');
}

function drawBackground(root) {
  const defs = createSvgElement('defs');

  const glow = createSvgElement('filter', { id: 'glow', x: '-20%', y: '-20%', width: '140%', height: '140%' });
  glow.appendChild(createSvgElement('feGaussianBlur', { stdDeviation: '12', result: 'blur' }));
  glow.appendChild(createSvgElement('feMerge'));
  glow.lastChild.appendChild(createSvgElement('feMergeNode', { in: 'blur' }));
  glow.lastChild.appendChild(createSvgElement('feMergeNode', { in: 'SourceGraphic' }));

  const shadow = createSvgElement('filter', { id: 'keyShadow', x: '-30%', y: '-30%', width: '160%', height: '160%' });
  shadow.appendChild(createSvgElement('feDropShadow', { dx: '0', dy: '8', stdDeviation: '10', 'flood-color': 'rgba(0,0,0,0.35)' }));

  const glassGradient = createSvgElement('radialGradient', { id: 'glassGradient', cx: '50%', cy: '42%', r: '60%' });
  glassGradient.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': 'rgba(204,255,250,0.24)' }));
  glassGradient.appendChild(createSvgElement('stop', { offset: '60%', 'stop-color': 'rgba(177,247,240,0.10)' }));
  glassGradient.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': 'rgba(255,255,255,0.04)' }));

  const pageGlow = createSvgElement('radialGradient', { id: 'pageGlow', cx: '50%', cy: '28%', r: '52%' });
  pageGlow.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#0e6973', 'stop-opacity': '0.75' }));
  pageGlow.appendChild(createSvgElement('stop', { offset: '45%', 'stop-color': '#0d2737', 'stop-opacity': '0.25' }));
  pageGlow.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#030810', 'stop-opacity': '0' }));

  const keyGradient = createSvgElement('linearGradient', { id: 'keyGradient', x1: '0%', y1: '0%', x2: '0%', y2: '100%' });
  keyGradient.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#f7fbfd' }));
  keyGradient.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#e3edf1' }));

  defs.append(glow, shadow, glassGradient, pageGlow, keyGradient);
  root.appendChild(defs);

  root.appendChild(createSvgElement('rect', { x: 0, y: 0, width: 1376, height: 768, fill: 'url(#pageGlow)' }));

  root.appendChild(createSvgElement('ellipse', {
    cx: 688,
    cy: 321,
    rx: 505,
    ry: 290,
    fill: 'rgba(255,255,255,0.04)',
    stroke: 'rgba(198,255,250,0.9)',
    'stroke-width': 7,
    filter: 'url(#glow)'
  }));

  root.appendChild(createSvgElement('ellipse', {
    cx: 688,
    cy: 324,
    rx: 470,
    ry: 261,
    fill: 'url(#glassGradient)',
    stroke: 'rgba(223,255,250,0.18)',
    'stroke-width': 3
  }));

  root.appendChild(createSvgElement('ellipse', {
    cx: 688,
    cy: 323,
    rx: 495,
    ry: 281,
    fill: 'none',
    stroke: 'rgba(99, 244, 236, 0.45)',
    'stroke-width': 18,
    'stroke-opacity': 0.25,
    filter: 'url(#glow)'
  }));

  root.appendChild(createSvgElement('ellipse', {
    cx: 688,
    cy: 648,
    rx: 320,
    ry: 58,
    fill: 'rgba(97, 72, 180, 0.10)',
    filter: 'url(#glow)'
  }));
}

function drawKeys(root) {
  const layer = createSvgElement('g', { id: 'keysLayer' });

  keyRows.flat().forEach((key) => {
    const group = createSvgElement('g', { class: 'key' });
    const width = key.width || 106;
    const height = key.height || 86;
    const path = createSvgElement('path', {
      d: key.shape === 'enter' ? enterPath(key.x, key.y, width, height) : keyPath(key.x, key.y, width, height),
      fill: 'url(#keyGradient)',
      stroke: 'rgba(207, 222, 230, 0.95)',
      'stroke-width': 2,
      filter: 'url(#keyShadow)'
    });
    const highlight = createSvgElement('path', {
      d: key.shape === 'enter' ? enterPath(key.x, key.y - 2, width - 4, height - 8) : keyPath(key.x, key.y - 2, width - 4, height - 8),
      fill: 'rgba(255,255,255,0.16)',
      opacity: 0.4
    });
    group.append(path, highlight);

    if (key.label) {
      const text = createSvgElement('text', {
        x: key.x,
        y: key.y + (key.fontSize && key.fontSize < 20 ? 5 : 6),
        'text-anchor': 'middle',
        'font-size': key.fontSize || 24,
        'font-family': 'Inter, Arial, sans-serif',
        'font-weight': key.fontSize && key.fontSize < 20 ? 600 : 500,
        fill: '#0b151c'
      });
      text.textContent = key.label;
      group.appendChild(text);
    }

    layer.appendChild(group);
  });

  root.appendChild(layer);
}

function drawGuides(root) {
  const layer = createSvgElement('g', { id: 'guidesLayer' });

  guideRects.forEach((rect) => {
    layer.appendChild(createSvgElement('rect', {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      fill: 'none',
      stroke: 'rgba(41, 69, 255, 0.96)',
      'stroke-width': 3
    }));
  });

  layer.appendChild(createSvgElement('line', {
    x1: 0,
    y1: 78,
    x2: 1376,
    y2: 78,
    stroke: 'rgba(41, 69, 255, 0.96)',
    'stroke-width': 3
  }));

  layer.appendChild(createSvgElement('line', {
    x1: 0,
    y1: 612,
    x2: 1376,
    y2: 612,
    stroke: 'rgba(41, 69, 255, 0.96)',
    'stroke-width': 3
  }));

  root.appendChild(layer);
}

function drawFingerLabels(root) {
  const layer = createSvgElement('g', { id: 'labelsLayer' });

  fingerText.forEach((item) => {
    const text = createSvgElement('text', {
      x: item.x,
      y: item.y,
      'text-anchor': 'middle',
      'font-size': item.size,
      'font-family': 'Inter, Arial, sans-serif',
      'font-weight': 500,
      fill: 'rgba(215, 72, 72, 0.68)'
    });
    text.textContent = item.text;
    layer.appendChild(text);
  });

  layer.appendChild(createSvgElement('text', {
    x: 22,
    y: 744,
    'font-size': 30,
    'font-family': 'Inter, Arial, sans-serif',
    'font-weight': 600,
    fill: 'rgba(255,255,255,0.76)',
    'stroke': 'rgba(255,255,255,0.88)',
    'stroke-width': 0.6,
    'paint-order': 'stroke fill'
  })).textContent = '(C) 2026 PEZHMAN FARHANGI';

  root.appendChild(layer);
}

function render() {
  svg.innerHTML = '';
  drawBackground(svg);
  drawKeys(svg);
  drawGuides(svg);
  drawFingerLabels(svg);
  syncUi();
}

function syncUi() {
  const guidesLayer = document.getElementById('guidesLayer');
  const labelsLayer = document.getElementById('labelsLayer');

  if (guidesLayer) guidesLayer.style.display = state.guides ? 'block' : 'none';
  if (labelsLayer) labelsLayer.style.display = state.labels ? 'block' : 'none';

  controls.forEach((button) => {
    const key = button.dataset.toggle;
    button.classList.toggle('is-active', !!state[key]);
  });

  referenceOverlay.classList.toggle('is-visible', state.reference);
  stage.style.setProperty('--overlay-opacity', `${overlayOpacityInput.value / 100}`);
}

controls.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.toggle;
    state[key] = !state[key];
    syncUi();
  });
});

overlayOpacityInput.addEventListener('input', syncUi);

render();
