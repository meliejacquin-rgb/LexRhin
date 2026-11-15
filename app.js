/* LexRhin — appli d'entraînement au français juridique (examen de traductrice FR/DE)
   Tout est stocké sur le téléphone (localStorage). Sauvegarde/restauration dans « Profil ». */
'use strict';

/* ---------- Utilitaires ---------- */
const KEY = 'passerelle.v1';
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const keyOf = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => keyOf(new Date());
const parseKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate() + n); return keyOf(d); };
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const wordCount = (s) => (String(s || '').match(/\S+/g) || []).length;
const isSunday = () => new Date().getDay() === 0;
const plur = (n, w, ws) => n + ' ' + (n > 1 ? (ws || w + 's') : w);
// devine si une paire « mot ; mot » est dans le sens allemand ; français, sinon l'inverse
function looksGerman(t) { t = ' ' + t.toLowerCase() + ' '; let sc = 0; if (/^ (der|die|das|den|dem|des|ein|eine|einen) /.test(t)) sc += 3; if (/[äöüß]/.test(t)) sc += 2; if (/(ung|keit|heit|schaft|recht|gericht|vertrag|lich|igkeit) /.test(t)) sc += 1; return sc; }
function looksFrench(t) { t = ' ' + t.toLowerCase() + ' '; let sc = 0; if (/^ (le|la|les|un|une|des|du|à|au|aux) /.test(t) || /^ l['’]/.test(t)) sc += 3; if (/[éèêàçùâîôœ]/.test(t)) sc += 2; if (/(tion|ment|ité|eur|aire) /.test(t)) sc += 1; return sc; }
function orderPair(a, b) { return (looksFrench(a) + looksGerman(b)) > (looksGerman(a) + looksFrench(b)) ? [b, a] : [a, b]; }

const INTERVALS = [0, 1, 2, 4, 8, 16, 32]; // jours, par boîte (répétition espacée)
const LEVELS = [
  [0, 'Stagiaire'], [500, 'Lectrice attentive'], [1500, 'Juriste linguiste'], [3000, 'Traductrice en herbe'],
  [5500, 'Traductrice confirmée'], [9000, 'Experte franco-allemande'], [14000, 'Plume du Rhin'], [20000, 'Prête pour l\'examen']
];
const KIND_ORDER = ['redaction', 'trad_de_fr', 'trad_fr_de'];
const KIND_LABEL = { redaction: 'Rédaction en français', trad_de_fr: 'Traduction allemand → français', trad_fr_de: 'Traduction français → allemand' };
const XP = { vocab: 8, hint: 4, grammar: 10, text: 40, rewrite: 30 };

/* ---------- État ---------- */
function defaults() {
  return {
    v: 1, name: 'Selina', vocabSize: 10, xp: 0,
    vocab: {}, custom: [], grammar: {}, days: {}, texts: [], kindNext: { redaction: 0, trad_de_fr: 0, trad_fr_de: 0 }, kindTurn: 0,
    tests: [], created: today()
  };
}
let S = load();
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(defaults(), JSON.parse(raw)); } catch (e) { /* stockage indisponible */ }
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Sauvegarde impossible sur cet appareil'); } }
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { }

function day(k) { k = k || today(); if (!S.days[k]) S.days[k] = { v: false, g: false, t: false, test: false, xp: 0 }; return S.days[k]; }
function hasStar(k) { const d = S.days[k]; return !!(d && d.v && d.g && d.t); }
function addXP(n) { S.xp += n; day().xp += n; }
function streak() {
  let k = today(); if (!hasStar(k)) k = addDays(k, -1);
  let n = 0; while (hasStar(k)) { n++; k = addDays(k, -1); } return n;
}
function bestStreak() {
  const keys = Object.keys(S.days).filter(hasStar).sort(); let best = 0, cur = 0, prev = null;
  keys.forEach((k) => { cur = (prev && addDays(prev, 1) === k) ? cur + 1 : 1; best = Math.max(best, cur); prev = k; }); return best;
}
function totalStars() { return Object.keys(S.days).filter(hasStar).length; }
function level() {
  let i = 0; while (i + 1 < LEVELS.length && S.xp >= LEVELS[i + 1][0]) i++;
  const cur = LEVELS[i][0], next = LEVELS[i + 1] ? LEVELS[i + 1][0] : null;
  return { n: i + 1, name: LEVELS[i][1], cur, next, pct: next ? Math.round((S.xp - cur) / (next - cur) * 100) : 100 };
}

/* ---------- Vocabulaire ---------- */
function allWords() {
  const bank = VOCAB.map((w, i) => ({ id: 'v:' + slug(w[0]), de: w[0], fr: w[1], note: w[2] || '', theme: w[3], order: i }));
  const cust = S.custom.map((w, i) => ({ id: w.id, de: w.de, fr: w.fr, note: w.note || '', theme: 'perso', order: -1000 + i, custom: true }));
  return cust.concat(bank);
}
function wstate(id) { return S.vocab[id] || null; }
function isDue(id) { const s = wstate(id); return s && s.due <= today(); }
function buildVocabSession(size, onlyIds) {
  const words = allWords();
  if (onlyIds) return words.filter((w) => onlyIds.includes(w.id));
  const due = words.filter((w) => isDue(w.id)).sort((a, b) => S.vocab[a.id].due.localeCompare(S.vocab[b.id].due));
  // nouveaux mots : d'abord ceux ajoutés depuis les corrections, puis la banque
  const fresh = words.filter((w) => !wstate(w.id)).sort((a, b) => a.order - b.order);
  const nReview = Math.min(due.length, Math.max(4, size - fresh.length));
  let picked = due.slice(0, nReview).concat(fresh.slice(0, size - nReview));
  if (picked.length < size) picked = picked.concat(due.slice(nReview, nReview + size - picked.length));
  if (picked.length < size) { // tout est appris et rien n'est dû : révisions libres
    const rest = shuffle(words.filter((w) => !picked.includes(w)));
    picked = picked.concat(rest.slice(0, size - picked.length));
  }
  return shuffle(picked);
}
function makeVocabQuestion(w, forceDir) {
  const words = allWords();
  const s = wstate(w.id);
  const dir = forceDir || ((s && s.box >= 2 && Math.random() < 0.4) ? 'fr_de' : 'de_fr');
  const field = dir === 'de_fr' ? 'fr' : 'de';
  let pool = words.filter((x) => x.id !== w.id && x.theme === w.theme && x[field] !== w[field]);
  if (pool.length < 3) pool = pool.concat(words.filter((x) => x.id !== w.id && x.theme !== w.theme && x[field] !== w[field]));
  const distract = shuffle(pool).slice(0, 3).map((x) => x[field]);
  const options = shuffle([w[field]].concat(distract));
  return { word: w, dir, prompt: dir === 'de_fr' ? w.de : w.fr, options, answer: options.indexOf(w[field]), isNew: !s, last: s ? s.last : null };
}
function stripAcc(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function normAns(s, keepAcc) {
  s = String(s || '').toLowerCase().replace(/[’`´]/g, "'").replace(/œ/g, 'oe').replace(/æ/g, 'ae');
  if (!keepAcc) s = stripAcc(s);
  s = s.replace(/[^a-z0-9àâäçéèêëîïôöùûüÿ' ]/g, ' ').replace(/\s+/g, ' ').trim();
  return s.replace(/^(l'|d'|l |d |le |la |les |un |une |des |du )/, '').replace(/^' ?/, '').trim();
}
function answerAlts(fr) {
  const alts = [];
  String(fr).split(/\s*\/\s*/).forEach((p) => {
    const base = p.replace(/\([^)]*\)/g, ' ').trim(); if (base) alts.push(base);
    (p.match(/\(([^)]*)\)/g) || []).forEach((x) => { const inner = x.slice(1, -1).trim(); if (inner) alts.push(inner); });
    alts.push(p.replace(/[()]/g, ' '));
  });
  return alts;
}
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
function checkAnswer(input, fr) {
  const inp = normAns(input), inpA = normAns(input, true); if (!inp) return { ok: false };
  for (const alt of answerAlts(fr)) {
    const a = normAns(alt), aA = normAns(alt, true); if (!a) continue;
    if (inp === a) return { ok: true, accent: inpA !== aA };
    const tol = a.length >= 10 ? 2 : a.length >= 5 ? 1 : 0;
    if (lev(inp, a) <= tol) return { ok: true, typo: true };
  }
  return { ok: false };
}
function hintOf(fr) {
  const main = String(fr).split(/\s*\/\s*/)[0].replace(/\([^)]*\)/g, '').trim();
  const m = main.match(/^(l'|l’|le |la |les |un |une |des |du )?(.*)$/i); const art = m[1] || ''; const rest = m[2] || '';
  return art + rest.slice(0, Math.max(2, Math.ceil(rest.length / 4))) + '…';
}
function gradeWord(id, ok) {
  const s = S.vocab[id] || { box: 0, due: today(), seen: 0, ok: 0, ko: 0 };
  s.seen++;
  if (ok) { s.ok++; s.box = Math.min(s.box + 1, INTERVALS.length - 1); s.due = addDays(today(), INTERVALS[s.box]); }
  else { s.ko++; s.box = 1; s.due = addDays(today(), 1); }
  S.vocab[id] = s;
}
function addCustomWord(de, fr, note) {
  de = (de || '').trim(); fr = (fr || '').trim(); note = (note || '').trim();
  if (!de || !fr) return null;
  const all = allWords(); const found = all.find((w) => w.de.toLowerCase() === de.toLowerCase());
  if (found) { // déjà connu : on le remet en révision aujourd'hui
    const s = S.vocab[found.id]; if (s) { s.due = today(); s.box = Math.min(s.box, 1); }
    return found.id;
  }
  const id = 'c:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  S.custom.push({ id, de, fr, note, added: today() });
  return id;
}

/* ---------- Grammaire ---------- */
function buildGrammarSession(n) {
  const idx = GRAMMAR.map((g, i) => i);
  const unseen = shuffle(idx.filter((i) => !S.grammar['g' + i]));
  const seen = idx.filter((i) => S.grammar['g' + i]).sort((a, b) => {
    const A = S.grammar['g' + a], B = S.grammar['g' + b];
    return (A.ok - A.ko) - (B.ok - B.ko) || A.last.localeCompare(B.last);
  });
  const weak = seen.filter((i) => S.grammar['g' + i].ko > 0);
  const order = weak.slice(0, 2).concat(unseen, seen.filter((i) => !weak.slice(0, 2).includes(i)));
  return shuffle(order.slice(0, n));
}
function gradeGrammar(i, ok) {
  const g = S.grammar['g' + i] || { ok: 0, ko: 0, last: '' };
  ok ? g.ok++ : g.ko++; g.last = today(); S.grammar['g' + i] = g;
}

/* ---------- Textes ---------- */
function lastEntry() { return S.texts.length ? S.texts[S.texts.length - 1] : null; }
function entryById(id) { return S.texts.find((e) => e.id === id); }
function taskOf(e) { return TEXTS[e.kind].find((t) => t.id === e.taskId); }
function pairInfo(k) {
  k = k || today();
  const dd = Math.max(0, Math.round((parseKey(k) - parseKey(S.created || k)) / 86400000));
  const n = Math.floor(dd / 2); const kind = KIND_ORDER[n % KIND_ORDER.length]; const list = TEXTS[kind];
  return { n, dayB: dd % 2 === 1, kind, task: list[Math.floor(n / KIND_ORDER.length) % list.length] };
}
function todaysText() {
  // chaque texte dure 2 jours : jour 1 on l'écrit, jour 2 on le réécrit après la correction
  const p = pairInfo(); const e = S.texts.find((x) => x.pair === p.n);
  const base = { kind: p.kind, task: p.task, pair: p.n, dayB: p.dayB };
  if (!e) return Object.assign(base, { mode: 'new' });
  if (e.status === 'draft' || !p.dayB || e.date === today()) return Object.assign(base, { mode: 'new', entry: e });
  return Object.assign(base, { mode: 'rewrite', entry: e });
}
function startNewEntry(kind, task, pair) {
  const e = { id: 'e' + Date.now().toString(36), kind, taskId: task.id, pair, date: today(), draft: '', status: 'draft', correction: '', score: null, words: [], seconds: 0 };
  S.texts.push(e); save(); return e;
}
function claudePrompt(e, isRewrite) {
  const t = taskOf(e);
  const lines = ["Bonjour Claude ! Je prépare l'examen d'État de traductrice français/allemand (Staatliche Prüfung, spécialité droit). Ma langue maternelle est l'allemand.", ''];
  if (isRewrite) lines.push("Voici la réécriture de mon texte, après ta première correction. Dis-moi les erreurs qui restent.", '');
  lines.push('Exercice : ' + KIND_LABEL[e.kind] + ' — ' + t.titre);
  if (t.consigne) lines.push('Consigne : ' + t.consigne);
  if (t.source) lines.push('Texte source :', '"""', t.source, '"""');
  lines.push('', isRewrite ? 'Ma réécriture :' : 'Mon texte :', '"""', isRewrite ? e.rewrite.draft : e.draft, '"""', '');
  lines.push('Merci de corriger en respectant ce format :',
    '1. Ma version corrigée complète.',
    '2. Les erreurs, classées (grammaire, registre, lexique, sens), avec une explication courte pour chacune.',
    '3. Une note indicative sur 20, écrite « Note : X/20 ».',
    '4. Pour finir, exactement ce bloc (5 mots maximum, un par ligne, sans tableau) :',
    'NOUVEAUX MOTS',
    'mot allemand ; équivalent français ; remarque courte');
  return lines.join('\n');
}
function parseCorrection(txt) {
  const lines = String(txt || '').split(/\r?\n/);
  const words = [];
  const start = lines.findIndex((l) => /nouveaux\s+mots/i.test(l));
  if (start >= 0) {
    for (let j = start + 1; j < lines.length; j++) {
      let l = lines[j].trim();
      if (!l) { if (words.length) break; else continue; }
      l = l.replace(/\*\*|`|__/g, '').replace(/^[-*•–\d.)\s]+/, '');
      let parts = l.includes('|') ? l.split('|') : l.split(/\s*;\s*/);
      parts = parts.map((p) => p.trim()).filter((p) => p && !/^:?-{2,}:?$/.test(p));
      if (parts.length >= 2) {
        if (/^(mot )?allemand$/i.test(parts[0])) continue;
        const [de, fr] = orderPair(parts[0], parts[1]);
        words.push({ de, fr, note: parts.slice(2).join(' ; ') });
      } else if (words.length) break;
    }
  }
  let score = null;
  const m = String(txt || '').match(/note\s*:?\s*\**\s*(\d{1,2}(?:[.,]\d+)?)\s*\/\s*20/i) || String(txt || '').match(/(\d{1,2}(?:[.,]\d+)?)\s*\/\s*20/);
  if (m) { const v = parseFloat(m[1].replace(',', '.')); if (v >= 0 && v <= 20) score = v; }
  return { words, score };
}

/* ---------- Interface ---------- */
let UI = { view: 'home' };
let timerHandle = null;
function go(view, extra) { UI = Object.assign({ view }, extra || {}); render(); window.scrollTo(0, 0); }
function toast(msg) {
  const t = $('#toast'); t.innerHTML = '<div class="toast">' + esc(msg) + '</div>';
  clearTimeout(toast.h); toast.h = setTimeout(() => { t.innerHTML = ''; }, 2200);
}

const ICON = {
  star: (s, fill, stroke) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-5.9 3.4 1.4-6.6-5-4.5 6.7-.7z" fill="${fill || '#F5B301'}" ${stroke ? `stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"` : ''}></path></svg>`,
  flame: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3 0-5.5 1-8.5z" fill="#E8590C"></path></svg>`,
  check: () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg>`,
  chev: (c) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${c || '#6E7190'}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>`,
  back: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"></path></svg>`,
  close: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>`,
  cards: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="14" height="16" rx="2"></rect><path d="M7 3h12a2 2 0 0 1 2 2v12"></path></svg>`,
  grammar: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l4-12 4 12"></path><path d="M5.5 15h5"></path><path d="M15 9h5l-5 11h5"></path></svg>`,
  pen: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"></path><path d="M13 7l4 4"></path></svg>`,
  swap: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14l-4-4"></path><path d="M20 16H6l4 4"></path></svg>`,
  trophy: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v4a5 5 0 0 1-10 0z"></path><path d="M17 6h3a3 3 0 0 1-3 4"></path><path d="M7 6H4a3 3 0 0 0 3 4"></path></svg>`,
  inbox: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13l2-8h12l2 8"></path><path d="M4 13v6h16v-6h-5a3 3 0 0 1-6 0z"></path></svg>`,
  flag: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5E7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V4"></path><path d="M4 4h12l-2 4 2 4H4"></path></svg>`,
  clock: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B301" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2 2"></path><path d="M9 2h6"></path></svg>`,
  home: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"></path><path d="M5 10v10h14V10"></path></svg>`,
  book: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"></path><path d="M4 19V5"></path></svg>`,
  chart: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10"></path><path d="M10 20V4"></path><path d="M16 20v-7"></path><path d="M22 20H2"></path></svg>`,
  user: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>`
};
const LOGO = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" role="img" aria-label="Logo LexRhin"><defs><clipPath id="lrclip"><rect width="100" height="100" rx="22"></rect></clipPath></defs><g clip-path="url(#lrclip)"><rect width="100" height="100" fill="#1F2147"></rect><path d="M0 70 q12.5 -9 25 0 t25 0 t25 0 t25 0 V100 H0 Z" fill="#4250C9"></path><path d="M1086 1108C1084 1338 895 1510 620 1510C348 1510 160 1341 160 1114C160 989 215 896 296 818C252 806 142 788 126 654C95 419 287 335 370 306L646 204C689 186 764 148 766 96C764 49 700 35 648 32C546 23 494 58 494 116H152C152 -134 348 -300 642 -300C921 -300 1114 -143 1114 96C1114 218 1064 311 974 390L980 392C1015 401 1131 425 1150 556C1180 788 985 873 908 902L632 1006C581 1018 506 1056 506 1114C506 1181 578 1182 620 1182C697 1182 741 1149 742 1108ZM832 530C820 506 802 500 768 512L544 588C456 617 427 657 440 680C450 701 468 710 512 696L728 622C820 591 843 556 832 530Z" fill="#F5B301" transform="matrix(0.03425 0 0 -0.03425 28.149 57.724)"></path></g></svg>`;

function marmot(size, mood) {
  const ears = '<circle cx="36" cy="24" r="9" fill="#7A4F31"/><circle cx="84" cy="24" r="9" fill="#7A4F31"/><circle cx="36" cy="24" r="4.5" fill="#E9CFAE"/><circle cx="84" cy="24" r="4.5" fill="#E9CFAE"/>';
  const body = '<ellipse cx="60" cy="76" rx="38" ry="38" fill="#9A6A45"/><ellipse cx="60" cy="86" rx="24" ry="25" fill="#F1DEC6"/>';
  const rabat = '<path d="M53 70 L59 70 L58 88 L52 88 Z" fill="#fff" stroke="#D9BFA0" stroke-width="1.5"/><path d="M61 70 L67 70 L68 88 L62 88 Z" fill="#fff" stroke="#D9BFA0" stroke-width="1.5"/>';
  const feet = '<ellipse cx="45" cy="112" rx="11" ry="4.5" fill="#7A4F31"/><ellipse cx="75" cy="112" rx="11" ry="4.5" fill="#7A4F31"/>';
  const head = '<ellipse cx="60" cy="44" rx="31" ry="27" fill="#9A6A45"/><ellipse cx="60" cy="55" rx="16" ry="11" fill="#E9CFAE"/>';
  const eyes = mood === 'happy'
    ? '<path d="M43 41 Q48 35 53 41" fill="none" stroke="#2A1B10" stroke-width="3.2" stroke-linecap="round"/><path d="M67 41 Q72 35 77 41" fill="none" stroke="#2A1B10" stroke-width="3.2" stroke-linecap="round"/>'
    : mood === 'sleepy'
      ? '<path d="M43 41 L53 41" stroke="#2A1B10" stroke-width="3" stroke-linecap="round"/><path d="M67 41 L77 41" stroke="#2A1B10" stroke-width="3" stroke-linecap="round"/>'
      : '<circle cx="48" cy="40" r="5" fill="#2A1B10"/><circle cx="72" cy="40" r="5" fill="#2A1B10"/><circle cx="49.6" cy="38.4" r="1.7" fill="#fff"/><circle cx="73.6" cy="38.4" r="1.7" fill="#fff"/>';
  const nose = '<ellipse cx="60" cy="49" rx="5.5" ry="3.8" fill="#3A2618"/><path d="M60 52 L60 56" stroke="#3A2618" stroke-width="2" stroke-linecap="round"/><rect x="56.5" y="56" width="7" height="7" rx="1.5" fill="#fff" stroke="#D9BFA0" stroke-width="1"/><path d="M60 56 L60 63" stroke="#D9BFA0" stroke-width="1"/><circle cx="41" cy="53" r="4" fill="#E8A48A"/><circle cx="79" cy="53" r="4" fill="#E8A48A"/>';
  const paws = mood === 'happy'
    ? '<ellipse cx="20" cy="58" rx="7" ry="16" fill="#9A6A45" transform="rotate(-30 20 58)"/><ellipse cx="100" cy="58" rx="7" ry="16" fill="#9A6A45" transform="rotate(30 100 58)"/><circle cx="14" cy="45" r="6" fill="#7A4F31"/><circle cx="106" cy="45" r="6" fill="#7A4F31"/>'
    : '';
  const front = mood === 'happy' ? '' : '<ellipse cx="45" cy="94" rx="7" ry="5.5" fill="#7A4F31"/><ellipse cx="75" cy="94" rx="7" ry="5.5" fill="#7A4F31"/>';
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="Marmotte">${paws}${ears}${body}${rabat}${front}${feet}${head}${eyes}${nose}</svg>`;
}

function topBar(title, backTo, right) {
  return `<div class="between"><div class="row" style="gap:4px;margin-left:-10px"><button class="iconbtn" data-act="nav" data-arg="${backTo || 'home'}" aria-label="Retour">${backTo === 'close' ? ICON.close() : ICON.back()}</button><span class="h2">${esc(title)}</span></div>${right || ''}</div>`;
}
function progressHead(i, n, color) {
  return `<div class="progress-top"><button class="iconbtn" data-act="quit" aria-label="Quitter" style="margin-left:-10px">${ICON.close()}</button><div class="bar" style="flex:1;height:10px"><div style="width:${Math.round(i / n * 100)}%;background:${color || 'var(--indigo)'}"></div></div><span class="small" style="font-weight:800">${Math.min(i + 1, n)}/${n}</span></div>`;
}

/* ---------- Écrans ---------- */
const VIEWS = {};

VIEWS.home = () => {
  const d = day(); const st = streak(); const lv = level(); const tt = todaysText();
  const name = esc(S.name || '');
  let msg;
  if (hasStar(today())) msg = `Bravo ${name} ! L'étoile du jour est à toi.` + (isSunday() && !d.test ? ' Il reste le test du dimanche, si tu veux.' : '');
  else if (isSunday() && !d.test) msg = `Bonjour ${name} ! C'est dimanche : test de la semaine en bonus.`;
  else if (st > 0) msg = `Bonjour ${name} ! ${st} jour${st > 1 ? 's' : ''} d'affilée. On continue ?`;
  else msg = `Bonjour ${name} ! Une petite séance aujourd'hui ?`;

  // semaine (lundi → dimanche)
  const now = new Date(); const dow = (now.getDay() + 6) % 7; const monday = addDays(today(), -dow);
  const letters = ['L', 'M', 'M', 'J', 'V', 'S', 'D']; let weekStars = 0;
  const week = letters.map((l, i) => {
    const k = addDays(monday, i); const star = hasStar(k); if (star) weekStars++;
    const isToday = k === today();
    const icon = star ? ICON.star(28) : isToday
      ? `<div style="width:34px;height:34px;margin-top:-3px;border-radius:999px;background:var(--indigo-soft);display:flex;align-items:center;justify-content:center">${ICON.star(24, 'none', '#4250C9')}</div>`
      : ICON.star(28, 'none', '#C9CBDD');
    return `<div class="col" style="align-items:center;gap:4px">${icon}<span style="${isToday ? 'color:var(--indigo-text);font-weight:900' : ''}">${l}</span></div>`;
  }).join('');

  const doneCount = [d.v, d.g, d.t].filter(Boolean).length;
  const vocabDue = allWords().filter((w) => isDue(w.id)).length;
  const textSub = tt.mode === 'rewrite'
    ? 'Jour 2 · ' + (tt.entry.status === 'sent' ? 'colle d’abord la correction de Claude' : esc(tt.task.titre))
    : (tt.dayB ? 'Jour 2 · ' : 'Jour 1 · ') + esc(KIND_LABEL[tt.kind]) + ' · ' + esc(tt.task.titre);
  const mission = (act, ico, bg, title, sub, done, active) => `<button class="mission ${active ? 'active' : ''}" data-act="${act}"><div class="mico" style="background:${bg}">${ico}</div><div style="flex:1;min-width:0"><div class="mtitle">${title}</div><div class="msub">${sub}</div></div>${done ? `<div class="check">${ICON.check()}</div>` : active ? '<span class="go">Go</span>' : ICON.chev()}</button>`;
  const firstTodo = !d.v ? 'v' : !d.g ? 'g' : !d.t ? 't' : null;
  let missions = mission('startVocab', ICON.cards('#1E7A4E'), 'var(--green-soft)', 'Vocabulaire', `${S.vocabSize} mots · ${plur(Math.min(vocabDue, S.vocabSize), 'révision')}`, d.v, firstTodo === 'v')
    + mission('startGrammar', ICON.grammar('#3442B8'), 'var(--indigo-soft)', 'Grammaire', '5 questions', d.g, firstTodo === 'g')
    + mission('openText', tt.kind === 'redaction' || tt.mode === 'rewrite' ? ICON.pen('#B45309') : ICON.swap('#7A3E9D'), tt.kind === 'redaction' || tt.mode === 'rewrite' ? 'var(--amber-soft)' : 'var(--plum-soft)', tt.mode === 'rewrite' ? 'Réécriture' : 'Texte du jour', textSub, d.t, firstTodo === 't');
  if (isSunday()) missions += `<button class="mission darkm" data-act="startTest"><div class="mico" style="background:var(--ink2)">${ICON.trophy('#F5B301')}</div><div style="flex:1"><div class="mtitle">Test du dimanche</div><div class="msub">20 mots + 5 questions · bonus ×2 XP</div></div>${d.test ? `<div class="check">${ICON.check()}</div>` : '<span style="font-size:12px;font-weight:800;color:#F5B301">×2 XP</span>'}</button>`;

  const pending = S.texts.filter((e) => (e.status === 'sent') || (e.rewrite && e.rewrite.status === 'sent' && !e.rewrite.correction && !e.rewrite.skipped));
  const pendingCard = pending.length ? `<button class="mission mt12" data-act="openPaste" data-arg="${pending[pending.length - 1].id}" style="box-shadow:0 0 0 2px var(--gold)"><div class="mico" style="background:var(--amber-soft)">${ICON.inbox('#B45309')}</div><div style="flex:1"><div class="mtitle">Correction en attente</div><div class="msub">Colle ici la réponse de Claude</div></div>${ICON.chev()}</button>` : '';

  return `
  <div class="between">
    <div class="row">${LOGO(36)}<span style="font-size:20px;font-weight:900;letter-spacing:-0.01em">Lex<span style="color:var(--indigo-text)">Rhin</span></span></div>
    <div class="row" style="gap:8px"><span class="pill">${ICON.star(18)}${totalStars()}</span><span class="pill">${ICON.flame(18)}${st} j</span></div>
  </div>
  <div class="card mt12 row" style="gap:12px">
    ${marmot(92, hasStar(today()) ? 'happy' : 'normal')}
    <div class="col" style="flex:1;min-width:0">
      <div class="bubble">${msg}</div>
      <div class="between small" style="font-weight:800"><span>Niv. ${lv.n} · ${esc(lv.name)}</span><span>${S.xp}${lv.next ? ' / ' + lv.next : ''} XP</span></div>
      <div class="bar"><div style="width:${lv.pct}%"></div></div>
    </div>
  </div>
  <div class="card mt12" style="padding:14px 16px">
    <div class="between" style="margin-bottom:10px"><span class="h3">Cette semaine</span><span class="small">${weekStars} / 7 étoiles</span></div>
    <div class="week">${week}</div>
  </div>
  ${pendingCard}
  <div class="between mt16" style="margin-bottom:8px"><span class="h2">Mission du jour</span><span class="small">${doneCount} / 3 faite${doneCount > 1 ? 's' : ''}</span></div>
  <div class="col">${missions}</div>
  <div class="row small mt12" style="gap:8px">${ICON.flag()}<span>Objectif : examen d'État de traductrice FR/DE · spécialité droit</span></div>`;
};

/* --- Session de vocabulaire (réponse écrite) --- */
function startVocab(onlyIds, after) {
  const words = buildVocabSession(S.vocabSize, onlyIds);
  if (!words.length) { toast('Aucun mot à réviser'); return; }
  const qs = words.map((w) => { const s = wstate(w.id); return { word: w, isNew: !s, last: s ? s.last : null }; });
  go('vocab', { qs, i: 0, res: null, hint: false, right: 0, missed: [], retry: false, after: after || null, firstTotal: qs.length });
}
function typedBody(q, nextLabel, nextAct) {
  const w = q.word; const r = UI.res;
  let html = `<div class="card mt12 col" style="padding:22px 20px;gap:10px"><span class="label">Allemand → français</span><span style="font-size:28px;font-weight:900;line-height:1.15">${esc(w.de)}</span></div>`;
  if (!r) {
    html += `<form data-form="check" class="mt16" autocomplete="off">
      <label for="ans" class="h3" style="display:block;margin-bottom:8px">Écris l'équivalent en français</label>
      <input type="text" id="ans" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="Ta réponse…" style="font-size:18px">
      ${UI.hint ? `<div class="small mt8">Indice : « ${esc(hintOf(w.fr))} »</div>` : ''}
      <button type="submit" class="btn mt12">Valider</button></form>
      <div class="grid2 mt8"><button class="btn ghost sm" data-act="hintWord" ${UI.hint ? 'disabled' : ''}>Indice</button><button class="btn ghost sm" data-act="dunnoWord">Je ne sais pas</button></div>
      <p class="small mt8" style="text-align:center">L'article (le, la, l') est facultatif.</p>`;
  } else {
    const ok = r.ok;
    html += `<div class="mt16" style="border:2px solid ${ok ? 'var(--green)' : 'var(--red)'};background:${ok ? 'var(--green-soft)' : 'var(--red-soft)'};border-radius:14px;padding:12px 14px;font-size:18px;font-weight:700;min-height:52px">${r.typed ? esc(r.typed) : '<span class="muted">(pas de réponse)</span>'}</div>`;
    html += `<div class="feedback ${ok ? 'ok' : 'ko'} mt12"><b>${ok ? (r.override ? 'Réponse acceptée' : 'Exact !') + (r.xp ? ' +' + r.xp + ' XP' : '') : 'Réponse attendue'}</b><span><b style="font-size:15px">${esc(w.fr)}</b>${r.accent ? '<br>Attention aux accents.' : ''}${r.typo ? '<br>Presque : vérifie l’orthographe.' : ''}${w.note ? '<br>' + esc(w.note) : ''}</span></div>`;
    if (!ok && r.typed) html += `<div class="mt8"><button class="btn ghost sm" data-act="overrideWord">Ma réponse était juste</button></div>`;
    html += `<div class="mt12"><button class="btn" data-act="${nextAct}">${nextLabel}</button></div>`;
  }
  return html;
}
function gradeTyped(typed) {
  const w = UI.qs[UI.i].word; const c = typed ? checkAnswer(typed, w.fr) : { ok: false };
  UI.snap = S.vocab[w.id] ? JSON.stringify(S.vocab[w.id]) : null;
  UI.res = { typed, ok: c.ok, accent: c.accent, typo: c.typo, xp: 0 };
  applyResult(c.ok); save(); render();
}
function applyResult(ok) {
  const w = UI.qs[UI.i].word; const r = UI.res;
  if (UI.view === 'test') {
    if (ok) { r.xp = 2 * XP.vocab; addXP(r.xp); UI.right++; }
    else if (S.vocab[w.id]) { S.vocab[w.id].box = 1; S.vocab[w.id].due = today(); }
    return;
  }
  if (UI.retry) return;
  gradeWord(w.id, ok); S.vocab[w.id].last = today();
  if (ok) { r.xp = UI.hint ? XP.hint : XP.vocab; addXP(r.xp); UI.gained = (UI.gained || 0) + r.xp; UI.right++; } else UI.missed.push(w);
}
VIEWS.vocab = () => {
  const q = UI.qs[UI.i]; const n = UI.qs.length; const w = q.word;
  const tags = [];
  if (UI.retry) tags.push('<span class="tag red">Deuxième chance</span>');
  else if (q.isNew) tags.push('<span class="tag green">Nouveau mot</span>');
  else { const ago = q.last ? Math.round((parseKey(today()) - parseKey(q.last)) / 86400000) : 0; tags.push(`<span class="tag amber">Révision${ago > 0 ? ' · vu il y a ' + ago + ' j' : ''}</span>`); }
  tags.push(`<span class="tag indigo">${esc(w.theme === 'perso' ? 'Mes mots' : THEMES[w.theme])}</span>`);
  return `${progressHead(UI.i, n, 'var(--green)')}
  <div class="row mt16" style="flex-wrap:wrap;gap:6px">${tags.join('')}</div>
  ${typedBody(q, UI.i + 1 < n ? 'Continuer' : 'Terminer', 'nextVocab')}`;
};

/* --- Session de grammaire --- */
function startGrammar() { go('grammar', { qs: buildGrammarSession(5), i: 0, picked: null, right: 0 }); }
VIEWS.grammar = () => {
  const gi = UI.qs[UI.i]; const g = GRAMMAR[gi]; const n = UI.qs.length;
  const parts = g.q.split('___');
  let blank = '<span style="display:inline-block;min-width:80px;border-bottom:3px solid var(--indigo);color:var(--faint);padding:0 6px">……</span>';
  if (UI.picked !== null) { const ok = UI.picked === g.a; blank = `<span style="display:inline-block;padding:0 6px;border-bottom:3px solid ${ok ? 'var(--green)' : 'var(--red)'};color:${ok ? 'var(--green-text)' : 'var(--red-text)'}">${esc(g.o[UI.picked])}</span>`; }
  const sentence = esc(parts[0]) + blank + esc(parts.slice(1).join('___'));
  const opts = g.o.map((o, k) => {
    let cls = ''; if (UI.picked !== null) { if (k === g.a) cls = 'ok'; else if (k === UI.picked) cls = 'ko'; }
    return `<button class="option ${cls}" style="justify-content:center;font-size:16px" data-act="pickGrammar" data-arg="${k}" ${UI.picked !== null ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('');
  let fb = '';
  if (UI.picked !== null) { const ok = UI.picked === g.a; fb = `<div class="feedback ${ok ? 'ok' : 'ko'} mt12"><b>${ok ? 'Bravo ! +' + (UI.test ? 2 * XP.grammar : XP.grammar) + ' XP' : 'Réponse : « ' + esc(g.o[g.a]) + ' »'}</b><span>${esc(g.e)}</span></div>`; }
  return `${progressHead(UI.i, n)}
  <div class="row mt16"><span class="tag indigo">Grammaire · ${esc(g.t)}</span></div>
  <div class="card mt12" style="padding:22px 20px"><p style="margin:0;font-size:19px;line-height:1.6;font-weight:700">${sentence}</p></div>
  <div class="${g.o.length === 2 ? 'grid2' : 'col'} mt16">${opts}</div>
  ${fb}
  <div class="mt16">${UI.picked === null ? '<button class="btn" disabled>Choisis une réponse</button>' : `<button class="btn" data-act="nextGrammar">${UI.i + 1 < n ? 'Continuer' : 'Terminer'}</button>`}</div>`;
};

/* --- Test du dimanche --- */
function startTest() {
  const seen = allWords().filter((w) => wstate(w.id));
  let pool = shuffle(seen).slice(0, 20);
  if (pool.length < 20) pool = pool.concat(shuffle(allWords().filter((w) => !wstate(w.id))).slice(0, 20 - pool.length));
  const qs = pool.map((w) => ({ type: 'v', word: w }))
    .concat(buildGrammarSession(5).map((gi) => ({ type: 'g', gi })));
  go('test', { qs, i: 0, picked: null, res: null, hint: false, right: 0 });
}
VIEWS.test = () => {
  const item = UI.qs[UI.i]; const n = UI.qs.length;
  if (item.type === 'g') {
    const saved = UI; const sub = { qs: UI.qs.map((x) => x.gi), i: UI.i, picked: UI.picked, test: true };
    UI = Object.assign({}, saved, sub); const html = VIEWS.grammar().replace('data-act="nextGrammar"', 'data-act="nextTest"').replace(/data-act="pickGrammar"/g, 'data-act="pickTest"'); UI = saved;
    return `<div class="row" style="margin-bottom:6px"><span class="tag plum">Test du dimanche</span></div>` + html;
  }
  return `<div class="row" style="margin-bottom:6px"><span class="tag plum">Test du dimanche</span></div>${progressHead(UI.i, n, 'var(--plum)')}
  ${typedBody(item, UI.i + 1 < n ? 'Continuer' : 'Voir mon score', 'nextTest')}`;
};

/* --- Écran de récompense --- */
VIEWS.bravo = () => {
  const b = UI.b; const star = b.newStar;
  return `<div class="celebrate mt8">
    <div class="row" style="align-items:flex-end;gap:6px">${star ? ICON.star(52) + '<span style="margin-bottom:14px">' + ICON.star(76) + '</span>' + ICON.star(52) : ICON.star(60)}</div>
    ${marmot(140, 'happy')}
    <h1 class="h1" style="color:#fff">${esc(b.title)}</h1>
    <p style="margin:0;color:#D4D6F0;font-weight:600;line-height:1.4">${esc(star ? 'L’étoile du jour est à toi ! Vocabulaire, grammaire et texte : tout est fait.' : b.sub)}</p>
    <div class="grid3" style="width:100%;margin-top:10px">${b.stats.map((s) => `<div style="background:var(--ink2);border-radius:16px;padding:12px 6px"><div style="font-size:21px;font-weight:900;${s.gold ? 'color:#F5B301' : ''}">${esc(s.v)}</div><div style="font-size:12px;font-weight:700;color:#D4D6F0">${esc(s.l)}</div></div>`).join('')}</div>
    ${star ? `<div style="width:100%;background:var(--ink2);border-radius:16px;padding:12px 14px;display:flex;align-items:center;gap:10px;text-align:left">${ICON.flame(22)}<span style="flex:1;font-weight:700">Série : ${streak()} jour${streak() > 1 ? 's' : ''} d'affilée</span>${streak() >= bestStreak() && streak() > 1 ? '<span style="color:#F5B301;font-weight:800;font-size:12px">Record !</span>' : ''}</div>` : ''}
  </div>
  <div class="mt16">${b.next ? `<button class="btn gold" data-act="${b.next.act}" ${b.next.arg ? `data-arg="${b.next.arg}"` : ''}>${esc(b.next.label)}</button><div class="mt8"></div>` : ''}<button class="btn ${b.next ? 'ghost' : 'gold'}" data-act="nav" data-arg="home">Retour à l'accueil</button></div>`;
};
function finish(kind, stats, title, sub, next) {
  const before = hasStar(today());
  const d = day(); if (kind) d[kind] = true; save();
  const newStar = !before && hasStar(today());
  go('bravo', { b: { stats, title, sub, newStar, next } });
}

/* --- Texte du jour --- */
function openText() {
  const tt = todaysText(); const e = tt.entry;
  if (tt.mode === 'rewrite') {
    if (e.rewrite && e.rewrite.status && e.rewrite.status !== 'draft') return go('sendClaude', { id: e.id, rewrite: true });
    if (e.status === 'sent') return go('paste', { id: e.id, forRewrite: true });
    return go('rewrite', { id: e.id, step: (e.words && e.words.length && !(e.rewrite && e.rewrite.learned)) ? 'learn' : 'write' });
  }
  if (!e) return go('textIntro', { kind: tt.kind, taskId: tt.task.id, pair: tt.pair, dayB: tt.dayB });
  if (e.status === 'draft') return go('write', { id: e.id });
  return go('sendClaude', { id: e.id, rewrite: false });
}
VIEWS.textIntro = () => {
  const task = TEXTS[UI.kind].find((t) => t.id === UI.taskId); const isTrad = UI.kind !== 'redaction';
  return `${topBar('Texte du jour', 'home')}
  <div class="row mt12" style="flex-wrap:wrap;gap:6px"><span class="tag ${isTrad ? 'plum' : 'amber'}">${esc(KIND_LABEL[UI.kind])}</span>${isTrad ? '<span class="tag indigo">Mode examen · sans dictionnaire</span>' : ''}</div>
  <div class="card mt12 col"><span class="label">${esc(task.titre)}</span>${task.consigne ? `<span class="source">${esc(task.consigne)}</span>` : `<span class="muted small">Le texte à traduire s'affiche quand tu commences. Un chrono démarre, comme à l'examen.</span>`}</div>
  <div class="card mt12 row" style="gap:12px">${marmot(56)}<span class="small" style="flex:1;line-height:1.45">${UI.dayB ? "Ce texte était prévu hier : écris-le aujourd'hui. Demain, un nouveau texte arrive." : "Chaque texte dure 2 jours : aujourd'hui tu l'écris, demain tu le réécris après la correction de Claude. Ça laisse le temps d'apprendre le vocabulaire."}</span></div>
  <div class="mt20"><button class="btn" data-act="beginText">Commencer</button></div>
  ${S.texts.length ? '' : '<p class="small mt12" style="text-align:center">Astuce : tu peux écrire en plusieurs fois, le brouillon est gardé.</p>'}`;
};
VIEWS.write = () => {
  const e = entryById(UI.id); const t = taskOf(e); const isTrad = e.kind !== 'redaction';
  const wc = wordCount(e.draft);
  return `${topBar(isTrad ? 'Traduction' : 'Rédaction', 'home', isTrad ? `<span class="timer">${ICON.clock()}<span id="timer">${fmtTime(e.seconds || 0)}</span></span>` : '')}
  <div class="row mt8" style="flex-wrap:wrap;gap:6px"><span class="tag ${isTrad ? 'plum' : 'amber'}">${esc(KIND_LABEL[e.kind])}</span>${isTrad ? '<span class="tag indigo">Sans dictionnaire</span>' : ''}</div>
  <div class="card mt12 col"><span class="label">${t.source ? 'Texte source · ' + (e.kind === 'trad_de_fr' ? 'allemand' : 'français') : 'Consigne · ' + esc(t.titre)}</span><span class="source">${esc(t.source || t.consigne)}</span></div>
  <label for="draft" class="small mt16" style="display:block;font-weight:800;margin-bottom:8px">${e.kind === 'trad_fr_de' ? 'Deine Übersetzung ins Deutsche' : isTrad ? 'Ta traduction en français' : 'Ton texte'}</label>
  <textarea id="draft" class="write" data-input="draft" placeholder="${isTrad ? 'Traduis ici…' : 'Écris ici…'}">${esc(e.draft)}</textarea>
  <div class="between small mt8"><span id="wc">${wc} mot${wc > 1 ? 's' : ''}${e.kind === 'redaction' ? ' · objectif 150 à 200' : ''}</span><span>Brouillon enregistré</span></div>
  <div class="mt16"><button class="btn" data-act="finishText">Terminer mon texte</button></div>`;
};
function fmtTime(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }

VIEWS.sendClaude = () => {
  const e = entryById(UI.id); const prompt = claudePrompt(e, UI.rewrite);
  return `${topBar('Correction par Claude', 'home')}
  <div class="card mt12 row" style="gap:12px">${marmot(64, 'happy')}<span style="flex:1;font-weight:700;line-height:1.45">${UI.rewrite ? 'Réécriture terminée !' : 'Texte terminé !'} Envoie-le à Claude pour la correction. C'est gratuit, ça prend deux minutes.</span></div>
  <div class="col mt16" style="gap:10px">
    <div class="row" style="gap:10px;align-items:flex-start"><span class="go" style="padding:4px 9px">1</span><span style="font-weight:700">Copie ton texte avec les instructions de correction.</span></div>
    <button class="btn" data-act="copyPrompt">Copier pour Claude</button>
    <div class="row mt8" style="gap:10px;align-items:flex-start"><span class="go" style="padding:4px 9px">2</span><span style="font-weight:700">Ouvre Claude, colle, envoie.</span></div>
    <a class="btn soft" href="https://claude.ai/new" target="_blank" rel="noopener">Ouvrir Claude</a>
    <div class="row mt8" style="gap:10px;align-items:flex-start"><span class="go" style="padding:4px 9px">3</span><span style="font-weight:700">Copie la réponse de Claude et colle-la ici.</span></div>
    <button class="btn gold" data-act="openPaste" data-arg="${e.id}">Coller la correction</button>
  </div>
  <details class="mt16"><summary>Si la copie ne marche pas</summary><p class="small">Sélectionne tout le texte ci-dessous et copie-le à la main.</p><textarea readonly style="min-height:160px;font-size:13px">${esc(prompt)}</textarea></details>
  <p class="small mt12" style="text-align:center">Tu peux aussi le faire plus tard : la carte « Correction en attente » reste sur l'accueil.</p>`;
};
VIEWS.paste = () => {
  const e = entryById(UI.id); const isRw = !!(e.rewrite && e.rewrite.status === 'sent' && e.status === 'corrected');
  return `${topBar('Coller la correction', 'home')}
  <p class="small mt12" style="line-height:1.45">${isRw ? 'Correction de ta réécriture' : 'Correction de « ' + esc(taskOf(e).titre) + ' »'} : colle toute la réponse de Claude. Les nouveaux mots du bloc « NOUVEAUX MOTS » iront dans ton lexique.</p>
  <textarea id="paste" style="min-height:300px" placeholder="Colle ici la réponse de Claude…"></textarea>
  <div class="mt16"><button class="btn" data-act="savePaste">Enregistrer la correction</button></div>
  ${isRw ? '<div class="mt8"><button class="btn ghost sm" data-act="skipRwCorrection">Pas de correction pour la réécriture</button></div>' : ''}
  ${!isRw && !UI.forRewrite ? `<div class="mt8"><button class="btn ghost sm" data-act="ignoreCorrection">Je n'aurai pas de correction pour ce texte</button></div>` : ''}
  ${UI.forRewrite ? `<div class="mt8"><button class="btn ghost sm" data-act="skipToRewrite">Réécrire sans correction</button></div>` : ''}`;
};
VIEWS.correction = () => {
  const e = entryById(UI.id); const isRw = UI.rw; const corr = isRw ? e.rewrite.correction : e.correction; const score = isRw ? e.rewrite.score : e.score;
  const words = allWords().filter((w) => (UI.newIds || []).includes(w.id));
  return `${topBar(isRw ? 'Correction de la réécriture' : 'Ta correction', 'home')}
  <div class="grid2 mt12">
    <div class="stat"><span class="small">Note indicative</span><b>${score != null ? String(score).replace('.', ',') + ' / 20' : '—'}</b></div>
    <div class="stat"><span class="small">Nouveaux mots</span><b>${words.length}</b></div>
  </div>
  ${words.length ? `<div class="card dark mt12 col"><span class="h3" style="color:#fff">${isRw ? 'Ajoutés à ton lexique' : 'À apprendre avant la réécriture'}</span>${words.map((w) => `<div class="between" style="font-size:14px;font-weight:700;gap:12px"><span>${esc(w.fr)}</span><span style="color:#D4D6F0;text-align:right">${esc(w.de)}</span></div>`).join('')}</div>` : (UI.parsedNone ? `<div class="card mt12 small" style="line-height:1.45">Je n'ai pas trouvé de bloc « NOUVEAUX MOTS ». Tu peux ajouter des mots à la main dans le Lexique.</div>` : '')}
  <details class="mt12" ${words.length ? '' : 'open'}><summary>Voir la correction complète</summary><div class="card prewrap">${esc(corr)}</div></details>
  <div class="mt16">${isRw ? '' : `<div class="card row" style="gap:10px;border:2px dashed #C9CBDD;box-shadow:none"><span class="small" style="flex:1;line-height:1.45">Réécriture prévue demain : tu repartiras de ce texte corrigé.</span></div><div class="mt12"></div>`}<button class="btn" data-act="nav" data-arg="home">Retour à l'accueil</button></div>`;
};
VIEWS.rewrite = () => {
  const e = entryById(UI.id); const t = taskOf(e);
  if (UI.step === 'learn') {
    const words = allWords().filter((w) => e.words.includes(w.id));
    return `${topBar('Réécriture', 'home')}
    <div class="card mt12 row" style="gap:12px">${marmot(64)}<span style="flex:1;font-weight:700;line-height:1.45">Avant de réécrire, on apprend les ${words.length} nouveaux mots de ta correction.</span></div>
    <div class="card mt12 col">${words.map((w) => `<div><div style="font-weight:800">${esc(w.fr)}</div><div class="small">${esc(w.de)}${w.note ? ' · ' + esc(w.note) : ''}</div></div>`).join('')}</div>
    <div class="mt16"><button class="btn" data-act="learnRewriteWords">M'entraîner sur ces mots</button><div class="mt8"></div><button class="btn ghost sm" data-act="rewriteWrite">Je les connais, passer à la réécriture</button></div>`;
  }
  const rw = e.rewrite || { draft: '' };
  return `${topBar('Réécriture', 'home')}
  <div class="row mt8" style="flex-wrap:wrap;gap:6px"><span class="tag amber">Jour B · réécriture</span><span class="tag indigo">${esc(t.titre)}</span></div>
  <div class="card mt12 col"><span class="label">${t.source ? 'Texte source' : 'Consigne'}</span><span class="source">${esc(t.source || t.consigne)}</span></div>
  ${e.correction ? `<details class="mt8"><summary>Jeter un œil à ma correction</summary><div class="card prewrap">${esc(e.correction)}</div></details>` : `<details class="mt8"><summary>Revoir mon premier texte</summary><div class="card prewrap">${esc(e.draft)}</div></details>`}
  <label for="rwdraft" class="small mt12" style="display:block;font-weight:800;margin-bottom:8px">Ta nouvelle version</label>
  <textarea id="rwdraft" class="write" data-input="rwdraft" placeholder="Réécris ton texte sans copier la correction…">${esc(rw.draft)}</textarea>
  <div class="between small mt8"><span id="wc">${wordCount(rw.draft)} mots</span><span>Brouillon enregistré</span></div>
  <div class="mt16"><button class="btn" data-act="finishRewrite">Terminer la réécriture</button></div>`;
};

/* --- Lexique --- */
function lexList() {
  const qy = (UI.q || '').toLowerCase().trim();
  const filter = UI.filter || 'all';
  let words = allWords();
  if (filter === 'mine') words = words.filter((w) => w.custom);
  if (filter === 'learning') words = words.filter((w) => wstate(w.id));
  if (qy) words = words.filter((w) => (w.de + ' ' + w.fr + ' ' + w.note).toLowerCase().includes(qy));
  const shown = words.slice(0, 120);
  const rows = shown.map((w) => {
    const s = wstate(w.id); const box = s ? s.box : 0;
    return `<div class="wordrow"><div style="flex:1;min-width:0"><div style="font-weight:800">${esc(w.de)}</div><div style="font-weight:600">${esc(w.fr)}</div>${w.note ? `<div class="small" style="margin-top:2px">${esc(w.note)}</div>` : ''}<div class="dots">${[1, 2, 3, 4, 5].map((i) => `<i class="${box >= i ? 'on' : ''}"></i>`).join('')}</div></div>${w.custom ? `<button class="iconbtn" data-act="delWord" data-arg="${w.id}" aria-label="Supprimer ce mot" style="color:var(--faint)">${ICON.close()}</button>` : ''}</div>`;
  }).join('');
  return (rows || '<div class="empty">Aucun mot trouvé.</div>') + (words.length > shown.length ? `<p class="small" style="text-align:center;padding:8px 0">${words.length - shown.length} autres : affine la recherche.</p>` : '');
}
VIEWS.lexique = () => {
  const filter = UI.filter || 'all';
  const learned = allWords().filter((w) => (wstate(w.id) || {}).box >= 3).length;
  return `<div class="between"><span class="h1">Lexique</span><button class="btn sm soft" style="width:auto" data-act="nav" data-arg="addWord">+ Ajouter</button></div>
  <p class="small" style="margin:6px 0 0">${allWords().length} mots · ${learned} bien acquis</p>
  <input type="search" class="mt12" placeholder="Chercher (allemand ou français)…" data-input="q" value="${esc(UI.q || '')}" aria-label="Chercher un mot">
  <div class="row mt12" style="gap:6px;flex-wrap:wrap">${[['all', 'Tous'], ['learning', 'En cours'], ['mine', 'Mes mots']].map(([k, l]) => `<button class="tag ${filter === k ? 'indigo' : ''}" style="border:none;cursor:pointer;min-height:34px;${filter === k ? '' : 'background:#fff;color:var(--muted)'}" data-act="lexFilter" data-arg="${k}">${l}</button>`).join('')}</div>
  <div class="card mt12" style="padding:4px 16px" id="lexlist">${lexList()}</div>`;
};
VIEWS.addWord = () => `${topBar('Ajouter des mots', 'lexique')}
  <div class="card mt12 col">
    <label class="small" for="nde" style="font-weight:800">Allemand</label><input type="text" id="nde" placeholder="die Nacherbfolge" autocomplete="off">
    <label class="small" for="nfr" style="font-weight:800">Français</label><input type="text" id="nfr" placeholder="la substitution fidéicommissaire" autocomplete="off">
    <label class="small" for="nnote" style="font-weight:800">Remarque (facultatif)</label><input type="text" id="nnote" placeholder="" autocomplete="off">
    <button class="btn mt8" data-act="saveWord">Ajouter</button>
  </div>
  <div class="card mt16 col">
    <span class="h3">Importer une liste</span>
    <span class="small" style="line-height:1.45">Un mot par ligne : allemand ; français ; remarque. Pratique pour reprendre ta liste de vocabulaire des séances avec Claude.</span>
    <textarea id="bulk" placeholder="die Nacherbschaft ; la substitution ; libéralité graduelle"></textarea>
    <button class="btn soft" data-act="importWords">Importer</button>
  </div>`;

/* --- Progrès --- */
VIEWS.progres = () => {
  const base = UI.month ? parseKey(UI.month + '-01') : new Date(); base.setDate(1);
  const y = base.getFullYear(), m = base.getMonth();
  const monthName = base.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const offset = (base.getDay() + 6) % 7; const nDays = new Date(y, m + 1, 0).getDate();
  let cells = ''; let starsMonth = 0;
  for (let i = 0; i < offset; i++) cells += '<div class="d"></div>';
  for (let dd = 1; dd <= nDays; dd++) {
    const k = keyOf(new Date(y, m, dd)); const star = hasStar(k); if (star) starsMonth++;
    const isToday = k === today(); const future = k > today();
    cells += `<div class="d ${future ? 'future' : ''}">${star ? ICON.star(22) + `<small>${dd}</small>` : isToday ? ICON.star(22, '#EEF0FF', '#4250C9') + `<small>${dd}</small>` : dd}</div>`;
  }
  const words = allWords(); const seen = words.filter((w) => wstate(w.id)).length; const learned = words.filter((w) => (wstate(w.id) || {}).box >= 3).length;
  const g = Object.values(S.grammar); const gOk = g.reduce((a, x) => a + x.ok, 0), gT = g.reduce((a, x) => a + x.ok + x.ko, 0);
  const nTexts = S.texts.filter((e) => e.status !== 'draft').length; const nRw = S.texts.filter((e) => e.rewrite && e.rewrite.status !== 'draft').length;
  const nTrad = S.texts.filter((e) => e.kind !== 'redaction' && e.status !== 'draft').length;
  const scores = S.texts.filter((e) => e.score != null).slice(-6).map((e) => String(e.score).replace('.', ','));
  const bar = (label, val, pct, color) => `<div class="col" style="gap:5px"><div class="between" style="font-size:13px;font-weight:800"><span>${label}</span><span class="muted">${val}</span></div><div class="bar"><div style="width:${Math.max(0, Math.min(100, pct))}%;background:${color}"></div></div></div>`;
  const prevM = keyOf(new Date(y, m - 1, 1)).slice(0, 7), nextM = keyOf(new Date(y, m + 1, 1)).slice(0, 7);
  return `<div class="between"><span class="h1">Progression</span><span class="pill">${ICON.star(18)}${plur(totalStars(), 'étoile')}</span></div>
  <div class="card mt12" style="padding:12px 12px 8px">
    <div class="between" style="margin-bottom:6px"><button class="iconbtn" data-act="month" data-arg="${prevM}" aria-label="Mois précédent">${ICON.back()}</button><span class="h3" style="text-transform:capitalize">${esc(monthName)} · ${starsMonth} ★</span><button class="iconbtn" data-act="month" data-arg="${nextM}" aria-label="Mois suivant" style="transform:scaleX(-1)">${ICON.back()}</button></div>
    <div class="cal" style="font-size:11px;font-weight:800;color:var(--muted);margin-bottom:2px">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l) => `<span>${l}</span>`).join('')}</div>
    <div class="cal">${cells}</div>
  </div>
  <div class="h2 mt16">Compétences</div>
  <div class="card mt8 col" style="gap:12px">
    ${bar('Vocabulaire juridique', learned + ' acquis · ' + seen + ' vus', words.length ? learned / words.length * 100 : 0, 'var(--green)')}
    ${bar('Grammaire', gT ? Math.round(gOk / gT * 100) + ' % de réussite' : 'pas encore commencé', gT ? gOk / gT * 100 : 0, 'var(--indigo)')}
    ${bar('Rédaction', plur(nTexts - nTrad, 'texte') + ' · ' + plur(nRw, 'réécriture'), Math.min(100, (nTexts - nTrad) * 5), '#B45309')}
    ${bar('Traduction DE ⇄ FR', plur(nTrad, 'texte') + ' · sans dictionnaire', Math.min(100, nTrad * 5), 'var(--plum)')}
  </div>
  <div class="grid2 mt12">
    <div class="stat dark" style="background:var(--ink)"><span style="font-size:12px;font-weight:700;color:#D4D6F0">Tests du dimanche</span><b>${S.tests.length ? S.tests.slice(-3).map((t) => t.score).join(' · ') + ' /' + S.tests[S.tests.length - 1].total : '—'}</b></div>
    <div class="stat"><span class="small">Notes de Claude</span><b>${scores.length ? scores.join(' · ') : '—'}</b></div>
    <div class="stat"><span class="small">Meilleure série</span><b>${bestStreak()} j</b></div>
    <div class="stat"><span class="small">Expérience</span><b>${S.xp} XP</b></div>
  </div>`;
};

/* --- Profil --- */
VIEWS.profil = () => `<span class="h1">Profil</span>
  <div class="card mt12 col">
    <label class="small" for="pname" style="font-weight:800">Prénom</label>
    <input type="text" id="pname" value="${esc(S.name)}" data-input="name" autocomplete="off">
    <span class="small mt8" style="font-weight:800">Mots par séance de vocabulaire</span>
    <div class="row" style="gap:6px">${[5, 10, 15, 20].map((n) => `<button class="tag ${S.vocabSize === n ? 'indigo' : ''}" style="border:none;cursor:pointer;min-height:40px;min-width:52px;justify-content:center;font-size:14px;${S.vocabSize === n ? '' : 'background:#F1F2F8;color:var(--muted)'}" data-act="vsize" data-arg="${n}">${n}</button>`).join('')}</div>
  </div>
  <div class="card mt12 col">
    <span class="h3">Sauvegarde</span>
    <span class="small" style="line-height:1.45">Tes progrès sont enregistrés sur ce téléphone. Fais une sauvegarde de temps en temps (par exemple dans tes notes ou par e-mail).</span>
    <button class="btn soft sm" data-act="exportData">Exporter ma sauvegarde</button>
    <button class="btn ghost sm" data-act="copyData">Copier la sauvegarde</button>
    <details><summary>Restaurer une sauvegarde</summary>
      <textarea id="restore" placeholder="Colle ici le contenu de ta sauvegarde…" style="min-height:100px;font-size:13px"></textarea>
      <div class="mt8"></div><button class="btn sm" data-act="importData">Restaurer</button>
    </details>
  </div>
  <div class="card mt12 col">
    <span class="h3">Installer sur l'iPhone</span>
    <span class="small" style="line-height:1.45">Dans Safari : bouton Partager, puis « Sur l'écran d'accueil ». LexRhin s'ouvre alors comme une vraie appli, même hors connexion.</span>
  </div>
  <details class="mt12"><summary style="color:var(--red-text)">Tout effacer</summary>
    <div class="card col"><span class="small">Supprime toute la progression sur ce téléphone. Pense à exporter avant.</span><button class="btn danger sm" data-act="${UI.confirmReset ? 'doReset' : 'askReset'}">${UI.confirmReset ? 'Confirmer : tout effacer' : 'Effacer ma progression'}</button></div>
  </details>
  <p class="small mt16" style="text-align:center">LexRhin · version 1.5</p>`;

/* ---------- Rendu ---------- */
const TAB_VIEWS = ['home', 'lexique', 'progres', 'profil'];
function render() {
  clearInterval(timerHandle); timerHandle = null;
  const v = VIEWS[UI.view] ? UI.view : 'home';
  $('#app').innerHTML = VIEWS[v]();
  const showTabs = TAB_VIEWS.includes(v);
  $('#app').classList.toggle('no-tabs', !showTabs);
  $('#tabbar').innerHTML = showTabs ? `<div class="tabbar"><nav>${[['home', 'Accueil', ICON.home()], ['lexique', 'Lexique', ICON.book()], ['progres', 'Progrès', ICON.chart()], ['profil', 'Profil', ICON.user()]].map(([k, l, ic]) => `<button class="tab ${v === k ? 'on' : ''}" data-act="nav" data-arg="${k}">${ic}${l}</button>`).join('')}</nav></div>` : '';
  if ((v === 'vocab' || v === 'test') && !UI.res) { const a = $('#ans'); if (a) { try { a.focus({ preventScroll: true }); } catch (e) { } } }
  if (v === 'write') { // chrono pour les traductions
    const e = entryById(UI.id);
    if (e && e.kind !== 'redaction') timerHandle = setInterval(() => { e.seconds = (e.seconds || 0) + 1; const el = $('#timer'); if (el) el.textContent = fmtTime(e.seconds); if (e.seconds % 15 === 0) save(); }, 1000);
  }
}

/* ---------- Actions ---------- */
const ACT = {
  nav: (a) => go(a),
  quit: () => go('home'),
  startVocab: () => { if (day().v) toast('Vocabulaire déjà fait : séance bonus'); startVocab(); },
  checkWord: () => { if (UI.res) return; const inp = $('#ans'); const typed = (inp ? inp.value : '').trim(); if (!typed) return toast('Écris une réponse ou appuie sur « Je ne sais pas »'); gradeTyped(typed); },
  dunnoWord: () => { if (UI.res) return; gradeTyped(''); },
  hintWord: () => { const inp = $('#ans'); const v = inp ? inp.value : ''; UI.hint = true; render(); const i2 = $('#ans'); if (i2) { i2.value = v; try { i2.focus(); } catch (e) { } } },
  overrideWord: () => {
    const r = UI.res; if (!r || r.ok) return; const w = UI.qs[UI.i].word;
    if (UI.view === 'test' || !UI.retry) { if (UI.snap) S.vocab[w.id] = JSON.parse(UI.snap); else delete S.vocab[w.id]; }
    UI.missed = (UI.missed || []).filter((x) => x.id !== w.id);
    r.ok = true; r.override = true; applyResult(true); save(); render();
  },
  nextVocab: () => {
    if (UI.i + 1 < UI.qs.length) { UI.i++; UI.res = null; UI.hint = false; return render(); }
    if (UI.missed.length && !UI.retry) { // deuxième chance pour les mots ratés
      UI.qs = UI.missed.map((w) => ({ word: w })); UI.i = 0; UI.res = null; UI.hint = false; UI.retry = true; return render();
    }
    if (UI.after) return UI.after();
    const right = UI.right; const all = UI.firstTotal;
    finish('v', [{ v: '+' + (UI.gained || 0), l: 'XP', gold: true }, { v: right + '/' + all, l: 'du premier coup' }, { v: allWords().filter((w) => (wstate(w.id) || {}).box >= 3).length, l: 'mots acquis' }], 'Vocabulaire terminé !', 'Les mots ratés reviendront demain.', !day().g ? { act: 'startGrammar', label: 'Enchaîner avec la grammaire' } : !day().t ? { act: 'openText', label: 'Passer au texte du jour' } : null);
  },
  startGrammar: () => { if (day().g) toast('Grammaire déjà faite : séance bonus'); startGrammar(); },
  pickGrammar: (a) => { if (UI.picked !== null) return; UI.picked = +a; const gi = UI.qs[UI.i]; const ok = UI.picked === GRAMMAR[gi].a; gradeGrammar(gi, ok); if (ok) { UI.right++; addXP(XP.grammar); } save(); render(); },
  nextGrammar: () => {
    if (UI.i + 1 < UI.qs.length) { UI.i++; UI.picked = null; return render(); }
    finish('g', [{ v: '+' + UI.right * XP.grammar, l: 'XP', gold: true }, { v: UI.right + '/' + UI.qs.length, l: 'bonnes réponses' }, { v: streak() + ' j', l: 'série' }], 'Grammaire terminée !', 'Les questions ratées reviendront bientôt.', !day().t ? { act: 'openText', label: 'Passer au texte du jour' } : !day().v ? { act: 'startVocab', label: 'Faire le vocabulaire' } : null);
  },
  startTest: () => startTest(),
  pickTest: (a) => {
    if (UI.picked !== null) return; UI.picked = +a; const item = UI.qs[UI.i];
    let ok;
    if (item.type === 'g') { ok = UI.picked === GRAMMAR[item.gi].a; gradeGrammar(item.gi, ok); if (ok) addXP(2 * XP.grammar); }
    else return;
    if (ok) UI.right++; save(); render();
  },
  nextTest: () => {
    if (UI.i + 1 < UI.qs.length) { UI.i++; UI.picked = null; UI.res = null; UI.hint = false; return render(); }
    S.tests.push({ date: today(), score: UI.right, total: UI.qs.length }); day().test = true; save();
    go('bravo', { b: { title: 'Test terminé : ' + UI.right + '/' + UI.qs.length, sub: UI.right >= 20 ? 'Superbe semaine !' : UI.right >= 15 ? 'Très bien, continue comme ça.' : 'Les mots ratés reviennent en révision dès demain.', stats: [{ v: UI.right + '/' + UI.qs.length, l: 'score', gold: true }, { v: S.tests.length, l: 'tests passés' }, { v: totalStars(), l: 'étoiles' }], newStar: false, next: null } });
  },
  openText: () => openText(),
  beginText: () => { const e = startNewEntry(UI.kind, TEXTS[UI.kind].find((t) => t.id === UI.taskId), UI.pair); go('write', { id: e.id }); },
  finishText: () => {
    const e = entryById(UI.id); if (wordCount(e.draft) < 10) return toast('Écris au moins quelques phrases');
    e.status = 'sent'; e.sentAt = today(); const d = day(); if (!d.textRef) d.textRef = { id: e.id, mode: 'new' };
    const first = !d.t; if (first) addXP(XP.text);
    const before = hasStar(today()); d.t = true; save();
    UI = { view: 'sendClaude', id: e.id, rewrite: false };
    if (!before && hasStar(today())) toast('Étoile du jour gagnée !'); render(); window.scrollTo(0, 0);
  },
  copyPrompt: () => { const e = entryById(UI.id); copy(claudePrompt(e, UI.rewrite)); },
  openPaste: (a) => go('paste', { id: a }),
  savePaste: () => {
    const txt = ($('#paste').value || '').trim(); if (txt.length < 20) return toast('Colle la réponse complète de Claude');
    const e = entryById(UI.id); const { words, score } = parseCorrection(txt);
    const ids = words.map((w) => addCustomWord(w.de, w.fr, w.note)).filter(Boolean);
    const isRw = !!(e.rewrite && e.rewrite.status === 'sent' && e.status === 'corrected');
    if (isRw) { e.rewrite.correction = txt; e.rewrite.score = score; e.rewrite.status = 'corrected'; }
    else { e.correction = txt; e.score = score; e.words = ids; e.status = 'corrected'; }
    save();
    if (UI.forRewrite && !isRw) return go('rewrite', { id: e.id, step: ids.length ? 'learn' : 'write' });
    go('correction', { id: e.id, rw: isRw, newIds: ids, parsedNone: !words.length });
  },
  ignoreCorrection: () => { const e = entryById(UI.id); e.status = 'corrected'; e.noCorrection = true; e.skipRewrite = true; save(); toast('Texte classé sans correction'); go('home'); },
  skipRwCorrection: () => { const e = entryById(UI.id); e.rewrite.status = 'corrected'; e.rewrite.skipped = true; save(); go('home'); },
  skipToRewrite: () => { const e = entryById(UI.id); e.status = 'corrected'; e.noCorrection = true; save(); go('rewrite', { id: e.id, step: 'write' }); },
  learnRewriteWords: () => { const id = UI.id; const e = entryById(id); startVocab(e.words, () => { e.rewrite = Object.assign(e.rewrite || { draft: '', status: 'draft' }, { learned: true }); save(); go('rewrite', { id, step: 'write' }); }); },
  rewriteWrite: () => { const e = entryById(UI.id); e.rewrite = Object.assign(e.rewrite || { draft: '', status: 'draft' }, { learned: true }); save(); go('rewrite', { id: e.id, step: 'write' }); },
  finishRewrite: () => {
    const e = entryById(UI.id); if (!e.rewrite || wordCount(e.rewrite.draft) < 10) return toast('Écris ta nouvelle version d’abord');
    e.rewrite.status = 'sent'; e.rewrite.date = today(); const d = day(); d.textRef = { id: e.id, mode: 'rewrite' };
    if (!d.t) addXP(XP.rewrite); const before = hasStar(today()); d.t = true; save();
    UI = { view: 'sendClaude', id: e.id, rewrite: true }; if (!before && hasStar(today())) toast('Étoile du jour gagnée !'); render(); window.scrollTo(0, 0);
  },
  lexFilter: (a) => { UI.filter = a; render(); },
  delWord: (a) => { S.custom = S.custom.filter((w) => w.id !== a); delete S.vocab[a]; save(); render(); toast('Mot supprimé'); },
  saveWord: () => { const id = addCustomWord($('#nde').value, $('#nfr').value, $('#nnote').value); if (!id) return toast('Remplis l’allemand et le français'); save(); toast('Mot ajouté'); go('addWord'); },
  importWords: () => {
    const lines = ($('#bulk').value || '').split(/\r?\n/); let n = 0;
    lines.forEach((l) => { const p = l.replace(/^[-*•\d.)\s]+/, '').split(/\s*[;|]\s*/); if (p.length >= 2 && addCustomWord(p[0], p[1], p.slice(2).join(' ; '))) n++; });
    save(); toast(n + ' mot' + (n > 1 ? 's' : '') + ' importé' + (n > 1 ? 's' : '')); if (n) go('lexique', { filter: 'mine' });
  },
  month: (a) => { UI.month = a; render(); },
  vsize: (a) => { S.vocabSize = +a; save(); render(); },
  exportData: async () => {
    const json = JSON.stringify(S); const name = 'lexrhin-sauvegarde-' + today() + '.json';
    try {
      const file = new File([json], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Sauvegarde LexRhin' }); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); toast('Sauvegarde téléchargée'); }
    catch (e) { copy(json); }
  },
  copyData: () => copy(JSON.stringify(S)),
  importData: () => {
    try { const obj = JSON.parse($('#restore').value); if (!obj || typeof obj !== 'object' || !obj.vocab) throw new Error(); S = Object.assign(defaults(), obj); save(); toast('Sauvegarde restaurée'); go('home'); }
    catch (e) { toast('Ce texte n’est pas une sauvegarde valide'); }
  },
  askReset: () => { UI.confirmReset = true; render(); },
  doReset: () => { S = defaults(); save(); toast('Progression effacée'); go('home'); }
};

function copy(text) {
  const fallback = () => {
    const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) { } ta.remove(); toast(ok ? 'Copié !' : 'Copie impossible : sélectionne le texte à la main');
  };
  try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(() => toast('Copié ! Colle-le dans Claude'), fallback); return; } } catch (e) { }
  fallback();
}

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const fn = ACT[el.dataset.act]; if (!fn) return;
  ev.preventDefault(); fn(el.dataset.arg);
});
document.addEventListener('submit', (ev) => {
  const f = ev.target; if (f && f.dataset && f.dataset.form === 'check') { ev.preventDefault(); ACT.checkWord(); }
});
document.addEventListener('input', (ev) => {
  const el = ev.target; const k = el.dataset && el.dataset.input; if (!k) return;
  if (k === 'draft') { const e = entryById(UI.id); e.draft = el.value; const n = wordCount(el.value); $('#wc').textContent = n + ' mot' + (n > 1 ? 's' : '') + (e.kind === 'redaction' ? ' · objectif 150 à 200' : ''); save(); }
  else if (k === 'rwdraft') { const e = entryById(UI.id); e.rewrite = e.rewrite || { draft: '', status: 'draft' }; e.rewrite.draft = el.value; $('#wc').textContent = wordCount(el.value) + ' mots'; save(); }
  else if (k === 'name') { S.name = el.value.trim(); save(); }
  else if (k === 'q') { UI.q = el.value; const l = $('#lexlist'); if (l) l.innerHTML = lexList(); }
});
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && TAB_VIEWS.includes(UI.view)) render(); });

render();

if ('serviceWorker' in navigator && location.protocol === 'https:' && window.self === window.top) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((r) => r.update()).catch(() => { }); });
}
