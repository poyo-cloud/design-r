const STORAGE_KEY = "design-r-2020-state";

const FIELD_CONFIG = {
  depth: [
    { value: "d0", code: "d0", points: 0, label: "d0 皮膚損傷・発赤なし" },
    { value: "d1", code: "d1", points: 0, label: "d1 持続する発赤" },
    { value: "d2", code: "d2", points: 0, label: "d2 真皮までの損傷" },
    { value: "D3", code: "D3", points: 0, label: "D3 皮下組織までの損傷" },
    { value: "D4", code: "D4", points: 0, label: "D4 皮下組織を超える損傷" },
    { value: "D5", code: "D5", points: 0, label: "D5 関節腔・体腔に至る損傷" },
    { value: "DDTI", code: "DDTI", points: 0, label: "DDTI 深部損傷褥瘡（DTI）疑い" },
    { value: "DU", code: "DU", points: 0, label: "DU 壊死組織で覆われ深さ判定不能" },
  ],
  exudate: [
    { value: "0", code: "e0", points: 0, label: "e0 なし" },
    { value: "1", code: "e1", points: 1, label: "e1 少量" },
    { value: "3", code: "E3", points: 3, label: "E3 中等量" },
    { value: "6", code: "E6", points: 6, label: "E6 多量" },
  ],
  sizeScore: [
    { value: "0", code: "s0", points: 0, label: "s0 皮膚損傷なし" },
    { value: "3", code: "s3", points: 3, label: "s3 4未満" },
    { value: "6", code: "s6", points: 6, label: "s6 4以上16未満" },
    { value: "8", code: "S8", points: 8, label: "S8 16以上36未満" },
    { value: "9", code: "S9", points: 9, label: "S9 36以上64未満" },
    { value: "12", code: "S12", points: 12, label: "S12 64以上100未満" },
    { value: "15", code: "S15", points: 15, label: "S15 100以上" },
  ],
  inflammation: [
    { value: "0", code: "i0", points: 0, label: "i0 局所の炎症徴候なし" },
    { value: "1", code: "i1", points: 1, label: "i1 局所の炎症徴候あり" },
    { value: "3C", code: "I3C", points: 3, label: "I3C 臨界的定着疑い" },
    { value: "3", code: "I3", points: 3, label: "I3 明らかな局所感染徴候あり" },
    { value: "9", code: "I9", points: 9, label: "I9 全身的影響あり" },
  ],
  granulation: [
    { value: "0", code: "g0", points: 0, label: "g0 治癒 / 浅い創 / DTI疑い" },
    { value: "1", code: "g1", points: 1, label: "g1 良性肉芽が90%以上" },
    { value: "3", code: "g3", points: 3, label: "g3 良性肉芽が50%以上90%未満" },
    { value: "4", code: "G4", points: 4, label: "G4 良性肉芽が10%以上50%未満" },
    { value: "5", code: "G5", points: 5, label: "G5 良性肉芽が10%未満" },
    { value: "6", code: "G6", points: 6, label: "G6 良性肉芽が全く形成されていない" },
  ],
  necrosis: [
    { value: "0", code: "n0", points: 0, label: "n0 壊死組織なし" },
    { value: "3", code: "N3", points: 3, label: "N3 柔らかい壊死組織あり" },
    { value: "6", code: "N6", points: 6, label: "N6 硬く厚い密着した壊死組織あり" },
  ],
  pocketScore: [
    { value: "0", code: "p0", points: 0, label: "p0 ポケットなし" },
    { value: "6", code: "P6", points: 6, label: "P6 4未満" },
    { value: "9", code: "P9", points: 9, label: "P9 4以上16未満" },
    { value: "12", code: "P12", points: 12, label: "P12 16以上36未満" },
    { value: "24", code: "P24", points: 24, label: "P24 36以上" },
  ],
};

const DEFAULT_STATE = {
  assessedOn: "",
  location: "",
  depth: "d0",
  exudate: "0",
  sizeScore: "0",
  woundLong: "",
  woundShort: "",
  inflammation: "0",
  granulation: "0",
  necrosis: "0",
  pocketScore: "0",
  pocketLong: "",
  pocketShort: "",
  memo: "",
};

const state = loadState();

const elements = {
  assessedOn: document.querySelector("#assessedOn"),
  location: document.querySelector("#location"),
  depth: document.querySelector("#depth"),
  exudate: document.querySelector("#exudate"),
  sizeScore: document.querySelector("#sizeScore"),
  woundLong: document.querySelector("#woundLong"),
  woundShort: document.querySelector("#woundShort"),
  sizeHelper: document.querySelector("#sizeHelper"),
  inflammation: document.querySelector("#inflammation"),
  granulation: document.querySelector("#granulation"),
  necrosis: document.querySelector("#necrosis"),
  pocketScore: document.querySelector("#pocketScore"),
  pocketLong: document.querySelector("#pocketLong"),
  pocketShort: document.querySelector("#pocketShort"),
  pocketHelper: document.querySelector("#pocketHelper"),
  memo: document.querySelector("#memo"),
  totalScore: document.querySelector("#totalScore"),
  notationPreview: document.querySelector("#notationPreview"),
  notationOutput: document.querySelector("#notationOutput"),
  chartOutput: document.querySelector("#chartOutput"),
  copyNotation: document.querySelector("#copyNotation"),
  copyChartText: document.querySelector("#copyChartText"),
  copyStatus: document.querySelector("#copyStatus"),
  resetAll: document.querySelector("#resetAll"),
};

init();

function init() {
  hydrateDate();
  populateSelect(elements.depth, FIELD_CONFIG.depth);
  populateSelect(elements.exudate, FIELD_CONFIG.exudate);
  populateSelect(elements.sizeScore, FIELD_CONFIG.sizeScore);
  populateSelect(elements.inflammation, FIELD_CONFIG.inflammation);
  populateSelect(elements.granulation, FIELD_CONFIG.granulation);
  populateSelect(elements.necrosis, FIELD_CONFIG.necrosis);
  populateSelect(elements.pocketScore, FIELD_CONFIG.pocketScore);

  applyDimensionDerivedScores();
  syncFormFromState();
  bindEvents();
  render();
}

function hydrateDate() {
  if (!state.assessedOn) {
    state.assessedOn = new Date().toISOString().slice(0, 10);
  }
}

function populateSelect(select, options) {
  select.innerHTML = options
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");
}

function bindEvents() {
  [
    "assessedOn",
    "location",
    "depth",
    "exudate",
    "sizeScore",
    "woundLong",
    "woundShort",
    "inflammation",
    "granulation",
    "necrosis",
    "pocketScore",
    "pocketLong",
    "pocketShort",
    "memo",
  ].forEach((key) => {
    const element = elements[key];
    element.addEventListener("input", () => handleFieldInput(key, element.value));
    element.addEventListener("change", () => handleFieldInput(key, element.value));
  });

  elements.copyNotation.addEventListener("click", () =>
    copyText(elements.notationOutput.value, "スコア表記をコピーしました。")
  );
  elements.copyChartText.addEventListener("click", () =>
    copyText(elements.chartOutput.value, "カルテ貼り付け用テキストをコピーしました。")
  );
  elements.resetAll.addEventListener("click", resetAllFields);
}

function handleFieldInput(key, value) {
  state[key] = value;

  if (key === "woundLong" || key === "woundShort") {
    applySizeScoreFromDimensions();
    applyPocketScoreFromDimensions();
  }

  if (key === "pocketLong" || key === "pocketShort") {
    applyPocketScoreFromDimensions();
  }

  persistState();
  render();
}

function applyDimensionDerivedScores() {
  applySizeScoreFromDimensions();
  applyPocketScoreFromDimensions();
}

function applySizeScoreFromDimensions() {
  const woundArea = getArea(state.woundLong, state.woundShort);
  if (woundArea !== null) {
    state.sizeScore = String(getSizeScoreFromArea(woundArea));
  }
}

function applyPocketScoreFromDimensions() {
  const pocketArea = getPocketArea();
  if (pocketArea !== null) {
    state.pocketScore = String(getPocketScoreFromArea(pocketArea));
  } else if (!state.pocketLong && !state.pocketShort) {
    state.pocketScore = "0";
  }
}

function syncFormFromState() {
  Object.entries(state).forEach(([key, value]) => {
    if (elements[key]) {
      elements[key].value = value;
    }
  });
}

function render() {
  syncFormFromState();

  const total = getTotalScore();
  const notation = buildNotation(total);
  const chartText = buildChartText(notation);
  const woundArea = getArea(state.woundLong, state.woundShort);
  const pocketArea = getPocketArea();

  elements.totalScore.textContent = String(total);
  elements.notationPreview.textContent = notation;
  elements.notationOutput.value = notation;
  elements.chartOutput.value = chartText;
  elements.sizeHelper.textContent =
    woundArea === null
      ? "面積を入力すると、推奨点数を表示します。"
      : `創面積 ${formatNumber(woundArea)} cm² → 推奨点数 ${getCodeFromConfig("sizeScore", state.sizeScore)}`;
  elements.pocketHelper.textContent =
    pocketArea === null
      ? "創サイズとポケット込み長径・短径を入れると、ポケット点数を自動計算します。"
      : `ポケット面積 ${formatNumber(pocketArea)} cm² → 推奨点数 ${getCodeFromConfig("pocketScore", state.pocketScore)}`;
  persistState();
}

function getTotalScore() {
  return [
    getPointsFromConfig("exudate", state.exudate),
    getPointsFromConfig("sizeScore", state.sizeScore),
    getPointsFromConfig("inflammation", state.inflammation),
    getPointsFromConfig("granulation", state.granulation),
    getPointsFromConfig("necrosis", state.necrosis),
    getPointsFromConfig("pocketScore", state.pocketScore),
  ].reduce((sum, value) => sum + value, 0);
}

function buildNotation(total) {
  const depth = getCodeFromConfig("depth", state.depth);
  const exudate = getCodeFromConfig("exudate", state.exudate);
  const size = getCodeFromConfig("sizeScore", state.sizeScore);
  const inflammation = getCodeFromConfig("inflammation", state.inflammation);
  const granulation = getCodeFromConfig("granulation", state.granulation);
  const necrosis = getCodeFromConfig("necrosis", state.necrosis);
  const pocket = getCodeFromConfig("pocketScore", state.pocketScore);

  return `${depth}-${exudate}${size}${inflammation}${granulation}${necrosis}${pocket}:${total}点`;
}

function buildChartText(notation) {
  const lines = [];
  const headerBits = [];

  if (state.assessedOn) {
    headerBits.push(state.assessedOn);
  }
  if (state.location.trim()) {
    headerBits.push(state.location.trim());
  }

  let firstLine = "DESIGN-R®2020";
  if (headerBits.length > 0) {
    firstLine += `（${headerBits.join(" / ")}）`;
  }
  firstLine += ` ${notation}`;
  lines.push(firstLine);

  const woundArea = getArea(state.woundLong, state.woundShort);
  if (woundArea !== null) {
    lines.push(
      `創サイズ ${formatNumber(state.woundLong)}×${formatNumber(state.woundShort)}cm（${formatNumber(woundArea)}cm²）`
    );
  }

  const pocketArea = getPocketArea();
  if (pocketArea !== null) {
    lines.push(
      `ポケット込みサイズ ${formatNumber(state.pocketLong)}×${formatNumber(state.pocketShort)}cm（ポケット面積 ${formatNumber(pocketArea)}cm²）`
    );
  } else if (state.pocketScore === "0") {
    lines.push("ポケットなし");
  }

  lines.push(
    `内訳 Depth ${getCodeFromConfig("depth", state.depth)} / Exudate ${getCodeFromConfig("exudate", state.exudate)} / Size ${getCodeFromConfig("sizeScore", state.sizeScore)} / Inflammation ${getCodeFromConfig("inflammation", state.inflammation)} / Granulation ${getCodeFromConfig("granulation", state.granulation)} / Necrotic ${getCodeFromConfig("necrosis", state.necrosis)} / Pocket ${getCodeFromConfig("pocketScore", state.pocketScore)}`
  );

  if (state.memo.trim()) {
    lines.push(`メモ ${state.memo.trim()}`);
  }

  return lines.join("\n");
}

function getPointsFromConfig(group, value) {
  return FIELD_CONFIG[group].find((option) => option.value === value)?.points ?? 0;
}

function getCodeFromConfig(group, value) {
  return FIELD_CONFIG[group].find((option) => option.value === value)?.code ?? "";
}

function getArea(longAxis, shortAxis) {
  const longValue = parseNumber(longAxis);
  const shortValue = parseNumber(shortAxis);

  if (longValue === null || shortValue === null) {
    return null;
  }

  return Number((longValue * shortValue).toFixed(2));
}

function getPocketArea() {
  const totalPocketArea = getArea(state.pocketLong, state.pocketShort);
  if (totalPocketArea === null) {
    return null;
  }

  const woundArea = getArea(state.woundLong, state.woundShort);
  if (woundArea === null) {
    return null;
  }

  return Number(Math.max(totalPocketArea - woundArea, 0).toFixed(2));
}

function getSizeScoreFromArea(area) {
  if (area <= 0) {
    return 0;
  }
  if (area < 4) {
    return 3;
  }
  if (area < 16) {
    return 6;
  }
  if (area < 36) {
    return 8;
  }
  if (area < 64) {
    return 9;
  }
  if (area < 100) {
    return 12;
  }
  return 15;
}

function getPocketScoreFromArea(area) {
  if (area <= 0) {
    return 0;
  }
  if (area < 4) {
    return 6;
  }
  if (area < 16) {
    return 9;
  }
  if (area < 36) {
    return 12;
  }
  return 24;
}

function parseNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function formatNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return "";
  }
  return parsed.toFixed(2).replace(/\.?0+$/, "");
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_STATE };
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (_error) {
    return { ...DEFAULT_STATE };
  }
}

async function copyText(text, successMessage) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      legacyCopyText(text);
    }
    elements.copyStatus.textContent = successMessage;
  } catch (_error) {
    elements.copyStatus.textContent = "コピーに失敗しました。手動で選択してください。";
  }

  window.clearTimeout(copyText.timeoutId);
  copyText.timeoutId = window.setTimeout(() => {
    elements.copyStatus.textContent = "";
  }, 3000);
}

function legacyCopyText(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(temp);

  if (!copied) {
    throw new Error("legacy copy failed");
  }
}

function resetAllFields() {
  Object.assign(state, DEFAULT_STATE, {
    assessedOn: new Date().toISOString().slice(0, 10),
  });
  render();
}
