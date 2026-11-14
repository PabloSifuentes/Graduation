(function () {
  'use strict';

  /* ============================================================
     MAPA DE IMPLEMENTAÇÃO
     ─────────────────────────────────────────────────────────────
     1. MOVIMENTAÇÃO DO CARRO (↑↓←→ / WASD)
        • KEY_MAP + evento keydown ...................... (~L458)
        • updateGame() → bloco "🎮 MOVIMENTAÇÃO" ........ (~L799)

     2. COLETA DE ANÉIS
        • spawnRing() / drawRing() ...................... (~L601)
        • updateGame() → bloco "💍 ANÉIS" ............... (~L840)

     3. PONTUAÇÃO (+10 por anel — canto superior direito)
        • updateGame() "💍 ANÉIS" → state.ringScore += RING_POINTS
        • updateHUD() → atualiza #rings ................. (~L858)

     4. MOEDAS (separadas da pontuação; +10 por anel)
        • loadProgress() / saveProgress() ............... (~L233)
        • updateGame() "💍 ANÉIS" → state.coins += RING_POINTS

     5. LOJA DE VEÍCULOS
        • VEHICLES ...................................... (~L99)
        • openShop() / renderShop() ..................... (~L1089)
        • buyVehicle() / equipVehicle() ................. (~L1118)

     6. GIROFLEX POLICIAL NOTURNO
        • drawPoliceLights() ............................ (~L646)

     7. RESETAR JOGO (nova funcionalidade)
        • Botão em Configurações → Geral → Zona de Perigo
        • resetGameProgress() ........................... (~L1145)
        • Preserva: áudio, mapa, horário, dificuldade, tremor
        • Zera: moedas, recordes, veículos desbloqueados, veículo equipado
   ───────────────────────────────────────────────────────────── */

  /* ============================================================
     CONSTANTES
     ============================================================ */
  const W = 480, H = 720;

  const ROAD_LEFT = 58;
  const ROAD_RIGHT = 422;
  const ROAD_W = ROAD_RIGHT - ROAD_LEFT;
  const LANE_W = ROAD_W / 3;
  const LANES = [0, 1, 2].map(i => ROAD_LEFT + LANE_W * (i + 0.5));

  const PLAYER_Y = H - 130;
  const PLAYER_SPEED = 520;
  const PLAYER_MIN_Y = 240;
  const PLAYER_MAX_Y = H - 100;

  const INNER_LEFT = ROAD_LEFT + 14;
  const INNER_RIGHT = ROAD_RIGHT - 14;
  const SPAWN_BAND = 400;

  const CAR_W = 46, CAR_H = 84;
  const RING_R = 11;
  const RING_POINTS = 10;

  const ENEMY_COLORS = [
    { main: '#3b82f6', dark: '#1d4ed8', roof: '#2563eb' },
    { main: '#22c55e', dark: '#15803d', roof: '#16a34a' },
    { main: '#eab308', dark: '#a16207', roof: '#ca8a04' },
    { main: '#a855f7', dark: '#7e22ce', roof: '#9333ea' },
    { main: '#f97316', dark: '#c2410c', roof: '#ea580c' },
    { main: '#e2e8f0', dark: '#94a3b8', roof: '#cbd5e1' }
  ];

  /* ============================================================
     VEÍCULOS
     ============================================================ */
  const VEHICLES = {
    red: { name: 'Original', price: 0, w: 46, h: 84, style: 'car', colors: { main: '#ef4444', dark: '#8f1111', roof: '#d62828' } },
    blue_f1: { name: 'Fórmula Azul', price: 150, w: 42, h: 92, style: 'f1', colors: { main: '#1e88e5', dark: '#0d47a1', roof: '#1565c0' } },
    green_jeep: { name: 'Jeep Verde', price: 250, w: 54, h: 88, style: 'jeep', colors: { main: '#22c55e', dark: '#15803d', roof: '#16a34a' } },
    white_truck: { name: 'Caminhão Branco', price: 400, w: 58, h: 98, style: 'truck', colors: { main: '#e2e8f0', dark: '#94a3b8', roof: '#cbd5e1' } }
  };

  const DIFFICULTY_PARAMS = {
    low: { startSpeed: 240, maxSpeed: 620, accel: 5, spawnBase: 1.5, spawnMin: 0.8, maxBlocked: 1, label: 'Fácil' },
    medium: { startSpeed: 320, maxSpeed: 920, accel: 10, spawnBase: 1.15, spawnMin: 0.5, maxBlocked: 2, label: 'Médio' },
    hardcore: { startSpeed: 440, maxSpeed: 1250, accel: 20, spawnBase: 0.75, spawnMin: 0.28, maxBlocked: 2, label: 'Hardcore' }
  };

  const MAPS = {
    snow: {
      ground: '#e8eef5', groundAlt: '#dce5ef',
      roadMid: '#34383f', roadEdge: '#282b33',
      line: 'rgba(235, 240, 250, 0.85)', center: 'rgba(255, 255, 255, 0.7)',
      particle: { color: '#ffffff', rate: 30, sizeMin: 1, sizeMax: 3, speedMin: 40, speedMax: 90, drift: 30 },
      sceneryTypes: ['pine', 'snowrock']
    },
    desert: {
      ground: '#d4a25c', groundAlt: '#c8944e',
      roadMid: '#3a3633', roadEdge: '#2e2b28',
      line: 'rgba(250, 240, 220, 0.8)', center: 'rgba(255, 245, 220, 0.7)',
      particle: { color: '#e8c078', rate: 38, sizeMin: 1, sizeMax: 2, speedMin: 60, speedMax: 120, drift: 80 },
      sceneryTypes: ['cactus', 'rock', 'dune']
    },
    jungle: {
      ground: '#1e4a28', groundAlt: '#163a1e',
      roadMid: '#353a33', roadEdge: '#2a2e28',
      line: 'rgba(240, 245, 235, 0.8)', center: 'rgba(255, 255, 240, 0.65)',
      particle: { color: '#a8e0a0', rate: 14, sizeMin: 1, sizeMax: 2, speedMin: 15, speedMax: 45, drift: 40 },
      sceneryTypes: ['palm', 'bush', 'bigtree']
    }
  };

  const DEFAULT_SETTINGS = {
    difficulty: 'medium',
    map: 'jungle',
    timeOfDay: 'day',
    vehicle: 'red',
    audio: { music: 0.4, sfx: 0.7, engine: 0.6 },
    shake: true
  };

  const TIME_OPTIONS = ['day', 'evening', 'night'];

  /* ============================================================
     DOM
     ============================================================ */
  const $ = id => document.getElementById(id);

  const canvas = $('game');
  let ctx = canvas.getContext('2d');
  const hud = $('hud');
  const pauseBtn = $('pauseBtn');
  const touchControls = $('touchControls');
  const scoreEl = $('score');
  const speedEl = $('speed');
  const ringsEl = $('rings');
  const btnLeft = $('btnLeft');
  const btnRight = $('btnRight');

  const overlays = {
    menu: $('mainMenuOverlay'),
    paused: $('pauseOverlay'),
    shop: $('shopOverlay'),
    settings: $('settingsOverlay'),
    records: $('recordsOverlay'),
    over: $('gameOverOverlay')
  };

  const menuBestEl = $('menuBest');
  const menuDiffLabel = $('menuDiffLabel');
  const finalScoreEl = $('finalScore');
  const finalBestEl = $('finalBest');
  const finalRingsEl = $('finalRings');
  const finalDiffEl = $('finalDiff');
  const recordsList = $('recordsList');
  const shopCoinsEl = $('shopCoins');
  const shopListEl = $('shopList');

  const musicSlider = $('musicSlider');
  const sfxSlider = $('sfxSlider');
  const engineSlider = $('engineSlider');
  const musicVal = $('musicVal');
  const sfxVal = $('sfxVal');
  const engineVal = $('engineVal');
  const prefShake = $('prefShake');

  /* ============================================================
     UTIL
     ============================================================ */
  const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
  const rand = (a, b) => a + Math.random() * (b - a);
  const safe = fn => { try { fn(); } catch (e) { console.warn(e); } };
  const setText = (el, txt) => { if (el) el.textContent = txt; };

  /* ============================================================
     CANVAS
     ============================================================ */
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  function rr(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ============================================================
     PERSISTÊNCIA
     ============================================================ */
  const loadJSON = (k, fb) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch (e) { return fb; } };
  const saveJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  const removeLS = k => { try { localStorage.removeItem(k); } catch (e) { } };

  function loadSettings() {
    const s = loadJSON('fuga_settings', null);
    if (!s) return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    return {
      difficulty: DIFFICULTY_PARAMS[s.difficulty] ? s.difficulty : DEFAULT_SETTINGS.difficulty,
      map: MAPS[s.map] ? s.map : DEFAULT_SETTINGS.map,
      timeOfDay: TIME_OPTIONS.includes(s.timeOfDay) ? s.timeOfDay : DEFAULT_SETTINGS.timeOfDay,
      vehicle: VEHICLES[s.vehicle] ? s.vehicle : DEFAULT_SETTINGS.vehicle,
      audio: Object.assign({}, DEFAULT_SETTINGS.audio, s.audio || {}),
      shake: s.shake !== undefined ? !!s.shake : true
    };
  }
  function loadRecords() {
    const r = loadJSON('fuga_records', null) || {};
    return { low: +r.low || 0, medium: +r.medium || 0, hardcore: +r.hardcore || 0 };
  }
  function loadProgress() {
    const p = loadJSON('fuga_progress', null) || {};
    const unlocked = Array.isArray(p.unlocked) ? p.unlocked.filter(id => VEHICLES[id]) : [];
    if (!unlocked.includes('red')) unlocked.unshift('red');
    return { coins: Math.max(0, +p.coins || 0), unlocked };
  }
  function saveProgress() {
    saveJSON('fuga_progress', { coins: state.coins, unlocked: state.unlockedVehicles });
  }

  /* ============================================================
     ESTADO
     ============================================================ */
  const progress = loadProgress();

  const state = {
    screen: 'menu',
    settings: loadSettings(),
    records: loadRecords(),
    coins: progress.coins,
    unlockedVehicles: progress.unlocked,
    speed: 0,
    distance: 0,
    enemies: [],
    particles: [],
    rings: [],
    ringScore: 0,
    lastRingScore: -1,
    ringSpawnTimer: 1.0,
    spawnTimer: 0,
    roadScroll: 0,
    shake: 0,
    scenery: [],
    ambient: [],
    ambientTimer: 0,
    settingsReturn: 'menu',
    lastScore: -1,
    dead: false,
    animTime: 0
  };

  const player = { x: W / 2, y: PLAYER_Y, vx: 0, vy: 0, w: CAR_W, h: CAR_H, tilt: 0 };
  const keys = { left: false, right: false, up: false, down: false };
  let pointerActive = false;
  let pointerTargetX = null;
  let overTimer = null;

  function setPlayerVehicle(id) {
    const v = VEHICLES[id] || VEHICLES.red;
    player.w = v.w;
    player.h = v.h;
  }
  setPlayerVehicle(state.settings.vehicle);

  /* ============================================================
     ÁUDIO
     ============================================================ */
  const AudioSys = {
    ctx: null, initialized: false,
    master: null, musicGain: null, sfxGain: null, engineGain: null,
    engine: { active: false },
    music: { playing: false, timer: null, nextNoteTime: 0, step: 0 },
    lastHornTime: -10,
    volumes: { music: 0.4, sfx: 0.7, engine: 0.6 },

    init() {
      if (this.initialized) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination);
        this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = this.volumes.music; this.musicGain.connect(this.master);
        this.sfxGain = this.ctx.createGain(); this.sfxGain.gain.value = this.volumes.sfx; this.sfxGain.connect(this.master);
        this.engineGain = this.ctx.createGain(); this.engineGain.gain.value = 0; this.engineGain.connect(this.master);
        this.initialized = true;
      } catch (e) { console.warn('Áudio indisponível:', e); }
    },
    resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => { }); },
    setVolumes(music, sfx, engine) {
      this.volumes = { music, sfx, engine };
      if (!this.initialized) return;
      const t = this.ctx.currentTime;
      this.musicGain.gain.setTargetAtTime(music, t, 0.05);
      this.sfxGain.gain.setTargetAtTime(sfx, t, 0.05);
      if (this.engine.active) this.engineGain.gain.setTargetAtTime(engine, t, 0.05);
    },
    startEngine() {
      if (!this.initialized || this.engine.active) return;
      const ctx = this.ctx, t = ctx.currentTime;
      const osc1 = ctx.createOscillator(); osc1.type = 'sawtooth'; osc1.frequency.value = 55; osc1.detune.value = -4;
      const osc2 = ctx.createOscillator(); osc2.type = 'square'; osc2.frequency.value = 110; osc2.detune.value = 4;
      const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 380; filter.Q.value = 4;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 7;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 45;
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
      const intGain = ctx.createGain(); intGain.gain.value = 0;
      osc1.connect(filter); osc2.connect(filter);
      filter.connect(intGain); intGain.connect(this.engineGain);
      osc1.start(t); osc2.start(t); lfo.start(t);
      intGain.gain.setTargetAtTime(0.18, t, 0.15);
      this.engineGain.gain.setTargetAtTime(this.volumes.engine, t, 0.15);
      this.engine = { active: true, osc1, osc2, lfo, filter, intGain };
    },
    stopEngine() {
      if (!this.engine.active) return;
      const t = this.ctx.currentTime;
      const { osc1, osc2, lfo, intGain } = this.engine;
      try { intGain.gain.setTargetAtTime(0, t, 0.08); this.engineGain.gain.setTargetAtTime(0, t, 0.08); } catch (e) { }
      setTimeout(() => {
        try { osc1.stop(); } catch (e) { }
        try { osc2.stop(); } catch (e) { }
        try { lfo.stop(); } catch (e) { }
      }, 350);
      this.engine = { active: false };
    },
    updateEngine(ratio) {
      if (!this.engine.active) return;
      const t = this.ctx.currentTime;
      ratio = clamp(ratio, 0, 1);
      const baseFreq = 50 + ratio * 80;
      try {
        this.engine.osc1.frequency.setTargetAtTime(baseFreq, t, 0.1);
        this.engine.osc2.frequency.setTargetAtTime(baseFreq * 2, t, 0.1);
        this.engine.filter.frequency.setTargetAtTime(320 + ratio * 1500, t, 0.1);
        this.engine.intGain.gain.setTargetAtTime(0.16 + ratio * 0.34, t, 0.1);
        this.engineGain.gain.setTargetAtTime(this.volumes.engine, t, 0.1);
      } catch (e) { }
    },
    playHorn() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      if (now - this.lastHornTime < 1.2) return;
      this.lastHornTime = now;
      const baseFreq = 340 + Math.random() * 180;
      const dur = 0.1 + Math.random() * 0.12;
      const double = Math.random() < 0.45;
      const self = this;
      const beep = (freq, start, duration) => {
        const osc = self.ctx.createOscillator(); const g = self.ctx.createGain();
        osc.type = 'square'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(0.14, start + 0.008);
        g.gain.setValueAtTime(0.14, start + duration - 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(g); g.connect(self.sfxGain);
        osc.start(start); osc.stop(start + duration + 0.05);
      };
      beep(baseFreq, now, dur);
      if (double) beep(baseFreq * 1.02, now + dur + 0.05, dur * 0.7);
    },
    playCollision() {
      if (!this.initialized) return;
      const ctx = this.ctx, now = ctx.currentTime;
      const bufSize = Math.floor(ctx.sampleRate * 0.45);
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        const k = 1 - i / bufSize;
        data[i] = (Math.random() * 2 - 1) * k * k;
      }
      const src = ctx.createBufferSource(); src.buffer = buffer;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const ng = ctx.createGain(); ng.gain.value = 0.55;
      src.connect(lp); lp.connect(ng); ng.connect(this.sfxGain);
      src.start(now);
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.3);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.5, now);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
      osc.connect(g2); g2.connect(this.sfxGain);
      osc.start(now); osc.stop(now + 0.46);
    },
    playRing() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      [1318.51, 1760].forEach((freq, i) => {
        const t = now + i * 0.05;
        const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
        osc.type = 'sine'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.14, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(g); g.connect(this.sfxGain);
        osc.start(t); osc.stop(t + 0.22);
      });
    },
    playButton() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(1150, now + 0.05);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.connect(g); g.connect(this.sfxGain);
      osc.start(now); osc.stop(now + 0.11);
    },
    playConfirm() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      [660, 990].forEach((freq, i) => {
        const t = now + i * 0.08;
        const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
        osc.type = 'triangle'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        osc.connect(g); g.connect(this.sfxGain);
        osc.start(t); osc.stop(t + 0.2);
      });
    },
    playStart() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      [392, 523.25, 659.25, 783.99].forEach((freq, i) => {
        const t = now + i * 0.08;
        const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
        osc.type = 'square'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
        g.gain.setValueAtTime(0.09, t + 0.09);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(g); g.connect(this.sfxGain);
        osc.start(t); osc.stop(t + 0.22);
      });
    },
    playGameOver() {
      if (!this.initialized) return;
      const now = this.ctx.currentTime;
      [523.25, 440, 349.23, 261.63].forEach((freq, i) => {
        const t = now + i * 0.14;
        const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
        osc.type = 'sawtooth'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.1, t + 0.02);
        g.gain.setValueAtTime(0.1, t + 0.18);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
        osc.connect(g); g.connect(this.sfxGain);
        osc.start(t); osc.stop(t + 0.38);
      });
    },
    startMusic() {
      if (!this.initialized || this.music.playing) return;
      this.music.playing = true;
      this.music.nextNoteTime = this.ctx.currentTime + 0.1;
      this.music.step = 0;
      const self = this;
      this.music.timer = setInterval(() => {
        if (!self.music.playing) return;
        const lookahead = 0.32;
        while (self.music.nextNoteTime < self.ctx.currentTime + lookahead) {
          self.scheduleMusicStep(self.music.step, self.music.nextNoteTime);
          self.music.step = (self.music.step + 1) % 32;
          self.music.nextNoteTime += 0.2;
        }
      }, 80);
    },
    scheduleMusicStep(step, time) {
      const arp = [220.00, 261.63, 329.63, 392.00, 329.63, 261.63, 220.00, 196.00];
      const bass = [110.00, 110.00, 87.31, 87.31, 130.81, 130.81, 98.00, 98.00];
      const ctx = this.ctx;
      const freq = arp[step % arp.length];
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(0.055, time + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
      osc.connect(g); g.connect(this.musicGain);
      osc.start(time); osc.stop(time + 0.3);
      if (step % 4 === 0) {
        const bf = bass[Math.floor(step / 4) % bass.length];
        const bo = ctx.createOscillator(); const bg = ctx.createGain();
        bo.type = 'sine'; bo.frequency.value = bf;
        bg.gain.setValueAtTime(0.0001, time);
        bg.gain.linearRampToValueAtTime(0.11, time + 0.05);
        bg.gain.exponentialRampToValueAtTime(0.0001, time + 0.75);
        bo.connect(bg); bg.connect(this.musicGain);
        bo.start(time); bo.stop(time + 0.8);
      }
    },
    stopMusic() {
      this.music.playing = false;
      if (this.music.timer) { clearInterval(this.music.timer); this.music.timer = null; }
    }
  };

  function ensureAudio() {
    if (!AudioSys.initialized) {
      AudioSys.init();
      if (AudioSys.initialized) {
        AudioSys.setVolumes(state.settings.audio.music, state.settings.audio.sfx, state.settings.audio.engine);
        if (state.settings.audio.music > 0) AudioSys.startMusic();
      }
    }
    AudioSys.resume();
  }

  /* ============================================================
     CENÁRIO
     ============================================================ */
  function initScenery() {
    state.scenery = [];
    const total = H + 200, count = 16;
    const types = MAPS[state.settings.map].sceneryTypes;
    for (let i = 0; i < count; i++) {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const x = side === 'left' ? rand(8, ROAD_LEFT - 26) : rand(ROAD_RIGHT + 26, W - 8);
      state.scenery.push({
        x, baseY: (i / count) * total + rand(-20, 20),
        type: types[(Math.random() * types.length) | 0],
        size: rand(0.7, 1.3), side
      });
    }
  }
  function drawScenery() {
    const total = H + 200;
    for (const s of state.scenery) {
      const sy = ((s.baseY + state.roadScroll) % total + total) % total - 100;
      if (sy < -120 || sy > H + 120) continue;
      drawSceneryObject(s.type, s.x, sy, s.size, s.side);
    }
  }
  function drawSceneryObject(type, x, y, size, side) {
    ({
      pine: () => drawPine(x, y, size), snowrock: () => drawSnowRock(x, y, size),
      cactus: () => drawCactus(x, y, size), rock: () => drawRock(x, y, size),
      dune: () => drawDune(x, y, size, side), palm: () => drawPalm(x, y, size),
      bush: () => drawBush(x, y, size), bigtree: () => drawBigTree(x, y, size)
    }[type] || (() => { }))();
  }
  function drawPine(x, y, size) {
    const h = 54 * size, w = 22 * size;
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x - w * 0.08, y - 4 * size, w * 0.16, 6 * size);
    ctx.fillStyle = '#2d5a3d';
    for (let i = 0; i < 3; i++) {
      const ty = y - i * h * 0.28, tw = w * (1 - i * 0.18);
      ctx.beginPath(); ctx.moveTo(x, ty - h * 0.5); ctx.lineTo(x - tw, ty); ctx.lineTo(x + tw, ty); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#f0f6fc';
    for (let i = 0; i < 3; i++) {
      const ty = y - i * h * 0.28, tw = w * (1 - i * 0.18) * 0.6;
      ctx.beginPath(); ctx.moveTo(x, ty - h * 0.5); ctx.lineTo(x - tw * 0.5, ty - h * 0.18); ctx.lineTo(x + tw * 0.5, ty - h * 0.18); ctx.closePath(); ctx.fill();
    }
  }
  function drawSnowRock(x, y, size) {
    ctx.fillStyle = '#c8d4e0'; ctx.beginPath(); ctx.ellipse(x, y, 14 * size, 8 * size, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f4f8ff'; ctx.beginPath(); ctx.ellipse(x - 3 * size, y - 2 * size, 8 * size, 4 * size, 0, 0, Math.PI * 2); ctx.fill();
  }
  function drawCactus(x, y, size) {
    const h = 46 * size, w = 11 * size;
    ctx.fillStyle = '#4a7a3a';
    ctx.fillRect(x - w / 2, y - h, w, h);
    ctx.fillRect(x - w * 1.5, y - h * 0.7, w, w * 1.1);
    ctx.fillRect(x - w * 1.5, y - h * 0.7 + w * 0.5, w * 1.2, w);
    ctx.fillRect(x + w * 0.5, y - h * 0.55, w, w * 1.0);
    ctx.fillRect(x + w * 0.5 - w * 0.2, y - h * 0.55 + w * 0.4, w * 1.0, w);
  }
  function drawRock(x, y, size) {
    ctx.fillStyle = '#8a6a44'; ctx.beginPath(); ctx.ellipse(x, y, 16 * size, 10 * size, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a88460'; ctx.beginPath(); ctx.ellipse(x - 4 * size, y - 3 * size, 9 * size, 5 * size, 0, 0, Math.PI * 2); ctx.fill();
  }
  function drawDune(x, y, size, side) {
    ctx.fillStyle = '#e0b878';
    ctx.beginPath(); ctx.ellipse(side === 'left' ? x - 10 : x + 10, y, 26 * size, 12 * size, 0, 0, Math.PI * 2); ctx.fill();
  }
  function drawPalm(x, y, size) {
    const h = 62 * size;
    ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 6 * size; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 6 * size, y - h * 0.5, x + 3 * size, y - h); ctx.stroke();
    const tx = x + 3 * size, ty = y - h;
    ctx.strokeStyle = '#2a7a2a'; ctx.lineWidth = 4 * size;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(tx, ty);
      ctx.quadraticCurveTo(tx + Math.cos(a) * 22 * size, ty + Math.sin(a) * 22 * size - 8 * size, tx + Math.cos(a) * 38 * size, ty + Math.sin(a) * 38 * size);
      ctx.stroke();
    }
    ctx.fillStyle = '#6a4a2a'; ctx.beginPath(); ctx.arc(tx, ty + 3 * size, 4 * size, 0, Math.PI * 2); ctx.fill();
  }
  function drawBush(x, y, size) {
    ctx.fillStyle = '#2a6a2a';
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + (i - 1) * 8 * size, y - 4 * size, 9 * size, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#3a8a3a'; ctx.beginPath(); ctx.arc(x - 3 * size, y - 8 * size, 6 * size, 0, Math.PI * 2); ctx.fill();
  }
  function drawBigTree(x, y, size) {
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x - 5 * size, y - 6 * size, 10 * size, 10 * size);
    ctx.fillStyle = '#1a5a1a'; ctx.beginPath(); ctx.arc(x, y - 34 * size, 26 * size, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a7a2a'; ctx.beginPath(); ctx.arc(x - 6 * size, y - 40 * size, 16 * size, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3a9a3a'; ctx.beginPath(); ctx.arc(x + 8 * size, y - 36 * size, 12 * size, 0, Math.PI * 2); ctx.fill();
  }

  /* ============================================================
     PARTÍCULAS AMBIENTAIS
     ============================================================ */
  function updateAmbientParticles(dt) {
    const cfg = MAPS[state.settings.map].particle;
    if (!cfg) return;
    state.ambientTimer -= dt;
    if (state.ambientTimer <= 0) {
      state.ambientTimer = 1 / cfg.rate;
      if (state.ambient.length < 220) {
        state.ambient.push({
          x: rand(-10, W + 10), y: -10,
          vx: rand(-cfg.drift * 0.5, cfg.drift),
          vy: rand(cfg.speedMin, cfg.speedMax),
          size: rand(cfg.sizeMin, cfg.sizeMax), life: 5
        });
      }
    }
    for (let i = state.ambient.length - 1; i >= 0; i--) {
      const p = state.ambient[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
      if (p.y > H + 10 || p.x < -20 || p.x > W + 20 || p.life <= 0) state.ambient.splice(i, 1);
    }
  }
  function drawAmbientParticles() {
    const cfg = MAPS[state.settings.map].particle;
    if (!cfg) return;
    ctx.fillStyle = cfg.color;
    for (const p of state.ambient) {
      ctx.globalAlpha = 0.4 + (p.life / 5) * 0.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ============================================================
     FUNDO E PISTA
     ============================================================ */
  function drawGround() {
    const cfg = MAPS[state.settings.map];
    ctx.fillStyle = cfg.ground;
    ctx.fillRect(-40, -40, W + 80, H + 80);
    const period = 100;
    const off = state.roadScroll % (period * 2);
    ctx.fillStyle = cfg.groundAlt;
    for (let y = -period * 2; y < H + period * 2; y += period * 2) ctx.fillRect(-40, y + off, W + 80, period);
  }
  function drawRoad() {
    const cfg = MAPS[state.settings.map];
    const g = ctx.createLinearGradient(ROAD_LEFT, 0, ROAD_RIGHT, 0);
    g.addColorStop(0, cfg.roadEdge); g.addColorStop(0.5, cfg.roadMid); g.addColorStop(1, cfg.roadEdge);
    ctx.fillStyle = g; ctx.fillRect(ROAD_LEFT, 0, ROAD_W, H);
    ctx.fillStyle = cfg.roadEdge;
    ctx.fillRect(ROAD_LEFT, 0, 6, H);
    ctx.fillRect(ROAD_RIGHT - 6, 0, 6, H);
    ctx.fillStyle = cfg.line;
    ctx.fillRect(ROAD_LEFT + 7, 0, 5, H);
    ctx.fillRect(ROAD_RIGHT - 12, 0, 5, H);
    const dash = 46, gap = 34, period = dash + gap;
    const off = state.roadScroll % period;
    ctx.fillStyle = cfg.center;
    for (let i = 1; i <= 2; i++) {
      const x = ROAD_LEFT + LANE_W * i - 3;
      for (let y = -period; y < H + period; y += period) ctx.fillRect(x, y + off, 6, dash);
    }
  }

  /* ============================================================
     VEÍCULOS — desenho base + skins
     ============================================================ */
  const BODY_DRAWERS = {
    car(x, y, w, h, c) {
      const g = ctx.createLinearGradient(x, 0, x + w, 0);
      g.addColorStop(0, c.dark); g.addColorStop(0.28, c.main); g.addColorStop(0.72, c.main); g.addColorStop(1, c.dark);
      ctx.fillStyle = g; rr(x, y, w, h, 10); ctx.fill();
      ctx.fillStyle = 'rgba(12,20,36,0.9)'; rr(x + w * 0.15, y + h * 0.13, w * 0.70, h * 0.19, 4); ctx.fill();
      ctx.fillStyle = c.roof; rr(x + w * 0.15, y + h * 0.36, w * 0.70, h * 0.26, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fillRect(x + w * 0.46, y + h * 0.36, w * 0.08, h * 0.26);
      ctx.fillStyle = 'rgba(12,20,36,0.9)'; rr(x + w * 0.15, y + h * 0.66, w * 0.70, h * 0.16, 4); ctx.fill();
    },
    f1(x, y, w, h, c) {
      const bw = w * 0.55, bx = x + (w - bw) / 2;
      ctx.fillStyle = c.dark;
      rr(x, y + h * 0.02, w, h * 0.08, 3); ctx.fill();
      rr(x, y + h * 0.90, w, h * 0.08, 3); ctx.fill();
      const g = ctx.createLinearGradient(bx, 0, bx + bw, 0);
      g.addColorStop(0, c.dark); g.addColorStop(0.5, c.main); g.addColorStop(1, c.dark);
      ctx.fillStyle = g; rr(bx, y + h * 0.10, bw, h * 0.80, 8); ctx.fill();
      ctx.fillStyle = 'rgba(12,20,36,0.92)'; rr(bx + bw * 0.15, y + h * 0.35, bw * 0.70, h * 0.25, 5); ctx.fill();
      ctx.fillStyle = c.roof; rr(bx + bw * 0.10, y + h * 0.62, bw * 0.80, h * 0.16, 4); ctx.fill();
    },
    jeep(x, y, w, h, c) {
      const g = ctx.createLinearGradient(x, 0, x + w, 0);
      g.addColorStop(0, c.dark); g.addColorStop(0.3, c.main); g.addColorStop(0.7, c.main); g.addColorStop(1, c.dark);
      ctx.fillStyle = g; ctx.fillRect(x, y + h * 0.05, w, h * 0.90);
      ctx.fillStyle = 'rgba(12,20,36,0.9)'; rr(x + w * 0.12, y + h * 0.10, w * 0.76, h * 0.15, 3); ctx.fill();
      ctx.fillStyle = c.roof; rr(x + w * 0.10, y + h * 0.35, w * 0.80, h * 0.45, 3); ctx.fill();
      ctx.strokeStyle = 'rgba(20,20,20,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.15, y + h * 0.40); ctx.lineTo(x + w * 0.85, y + h * 0.75);
      ctx.moveTo(x + w * 0.85, y + h * 0.40); ctx.lineTo(x + w * 0.15, y + h * 0.75);
      ctx.stroke();
      ctx.fillStyle = 'rgba(12,20,36,0.9)'; rr(x + w * 0.15, y + h * 0.82, w * 0.70, h * 0.10, 2); ctx.fill();
    },
    truck(x, y, w, h, c) {
      const g = ctx.createLinearGradient(x, 0, x + w, 0);
      g.addColorStop(0, c.dark); g.addColorStop(0.3, c.main); g.addColorStop(0.7, c.main); g.addColorStop(1, c.dark);
      ctx.fillStyle = g; rr(x, y + h * 0.40, w, h * 0.60, 6); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + w * 0.10, y + h * (0.50 + i * 0.15));
        ctx.lineTo(x + w * 0.90, y + h * (0.50 + i * 0.15));
        ctx.stroke();
      }
      ctx.fillStyle = g; rr(x + w * 0.08, y + h * 0.05, w * 0.84, h * 0.37, 8); ctx.fill();
      ctx.fillStyle = 'rgba(12,20,36,0.9)'; rr(x + w * 0.15, y + h * 0.08, w * 0.70, h * 0.14, 4); ctx.fill();
      ctx.fillStyle = c.roof; rr(x + w * 0.20, y + h * 0.25, w * 0.60, h * 0.12, 3); ctx.fill();
    }
  };

  function drawVehicleBody(id, cx, cy, tilt) {
    const v = VEHICLES[id];
    const w = v.w, h = v.h;
    ctx.save();
    ctx.translate(cx, cy);
    if (tilt) ctx.rotate(tilt);
    const x = -w / 2, y = -h / 2;

    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    rr(x + 2, y + 8, w, h, 10); ctx.fill();

    ctx.fillStyle = '#0d0f13';
    const ww = v.style === 'f1' ? 5 : 7;
    const wh = h * 0.20;
    const inset = v.style === 'f1' ? 0 : 3;
    rr(x - ww + inset, y + h * 0.13, ww, wh, 3); ctx.fill();
    rr(x + w - inset, y + h * 0.13, ww, wh, 3); ctx.fill();
    rr(x - ww + inset, y + h * 0.67, ww, wh, 3); ctx.fill();
    rr(x + w - inset, y + h * 0.67, ww, wh, 3); ctx.fill();

    (BODY_DRAWERS[v.style] || BODY_DRAWERS.car)(x, y, w, h, v.colors);

    ctx.fillStyle = '#ffe9a8';
    rr(x + w * 0.10, y + h * 0.02, w * 0.18, h * 0.05, 2); ctx.fill();
    rr(x + w * 0.72, y + h * 0.02, w * 0.18, h * 0.05, 2); ctx.fill();

    ctx.save();
    ctx.shadowColor = '#ff2b2b'; ctx.shadowBlur = 9;
    ctx.fillStyle = '#ff3b3b';
    rr(x + w * 0.10, y + h * 0.93, w * 0.18, h * 0.05, 2); ctx.fill();
    rr(x + w * 0.72, y + h * 0.93, w * 0.18, h * 0.05, 2); ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  function drawCar(cx, cy, w, h, colors, tilt) {
    ctx.save();
    ctx.translate(cx, cy);
    if (tilt) ctx.rotate(tilt);
    const x = -w / 2, y = -h / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.38)'; rr(x + 2, y + 8, w, h, 10); ctx.fill();
    ctx.fillStyle = '#0d0f13';
    const ww = 7, wh = h * 0.20;
    rr(x - 3, y + h * 0.13, ww, wh, 3); ctx.fill();
    rr(x + w - ww + 3, y + h * 0.13, ww, wh, 3); ctx.fill();
    rr(x - 3, y + h * 0.67, ww, wh, 3); ctx.fill();
    rr(x + w - ww + 3, y + h * 0.67, ww, wh, 3); ctx.fill();
    BODY_DRAWERS.car(x, y, w, h, colors);
    ctx.fillStyle = '#ffe9a8';
    rr(x + w * 0.10, y + h * 0.02, w * 0.18, h * 0.05, 2); ctx.fill();
    rr(x + w * 0.72, y + h * 0.02, w * 0.18, h * 0.05, 2); ctx.fill();
    ctx.save();
    ctx.shadowColor = '#ff2b2b'; ctx.shadowBlur = 9;
    ctx.fillStyle = '#ff3b3b';
    rr(x + w * 0.10, y + h * 0.93, w * 0.18, h * 0.05, 2); ctx.fill();
    rr(x + w * 0.72, y + h * 0.93, w * 0.18, h * 0.05, 2); ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  /* ============================================================
     ANÉIS
     ============================================================ */
  function spawnRing() {
    const life = rand(3, 6);
    state.rings.push({
      x: rand(INNER_LEFT + 20, INNER_RIGHT - 20),
      y: rand(180, H - 200),
      life, maxLife: life,
      phase: Math.random() * Math.PI * 2
    });
  }
  function drawRing(r) {
    const wobble = 0.35 + Math.abs(Math.cos(r.phase)) * 0.65;
    const alpha = Math.min(1, (r.maxLife - r.life) / 0.2, r.life / 0.5);
    ctx.save();
    ctx.translate(r.x, r.y);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = 'rgba(255, 210, 50, 0.9)'; ctx.shadowBlur = 14;
    ctx.strokeStyle = '#ffcc33'; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.ellipse(0, 0, RING_R * wobble, RING_R, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#fff3a0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-1.5, -1.5, RING_R * wobble * 0.55, RING_R * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  /* ============================================================
     ILUMINAÇÃO / GIROFLEX / FARÓIS / EXPLOSÃO
     ============================================================ */
  function drawTimeOverlay() {
    const t = state.settings.timeOfDay;
    if (t === 'evening') { ctx.fillStyle = 'rgba(255, 130, 40, 0.20)'; ctx.fillRect(0, 0, W, H); }
    else if (t === 'night') { ctx.fillStyle = 'rgba(6, 10, 35, 0.60)'; ctx.fillRect(0, 0, W, H); }
  }
  function drawPoliceLights() {
    if (state.settings.timeOfDay !== 'night') return;
    const t = state.animTime;
    const cycle = Math.floor(t / 0.3) % 2;
    const pulse = 0.7 + Math.sin(t * 18) * 0.3;
    const redI = cycle === 0 ? pulse : 0.08;
    const blueI = cycle === 1 ? pulse : 0.08;
    const baseY = H + 40, off = 100;
    const leftX = clamp(player.x - off, 70, W - 70);
    const rightX = clamp(player.x + off, 70, W - 70);
    const radius = 380;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.rect(player.x - player.w / 2 - 8, player.y - player.h / 2 - 8, player.w + 16, player.h + 16);
    ctx.clip('evenodd');

    const rg = ctx.createRadialGradient(leftX, baseY, 0, leftX, baseY, radius);
    rg.addColorStop(0, `rgba(255, 60, 60, ${redI * 0.55})`);
    rg.addColorStop(0.45, `rgba(255, 30, 30, ${redI * 0.16})`);
    rg.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(rightX, baseY, 0, rightX, baseY, radius);
    bg.addColorStop(0, `rgba(70, 110, 255, ${blueI * 0.55})`);
    bg.addColorStop(0.45, `rgba(40, 70, 255, ${blueI * 0.16})`);
    bg.addColorStop(1, 'rgba(0, 30, 255, 0)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.restore();
  }
  function drawHeadlightBeam(x, frontY, carW, isPlayer) {
    const beamLength = isPlayer ? 240 : 180;
    const halfW = carW * 1.4;
    const intensity = isPlayer ? 0.6 : 0.38;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const grad = ctx.createLinearGradient(0, frontY, 0, frontY - beamLength);
    grad.addColorStop(0, 'rgba(255, 245, 200, ' + intensity + ')');
    grad.addColorStop(0.35, 'rgba(255, 235, 170, ' + (intensity * 0.45) + ')');
    grad.addColorStop(1, 'rgba(255, 220, 140, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(x - carW * 0.32, frontY);
    ctx.lineTo(x + carW * 0.32, frontY);
    ctx.lineTo(x + halfW, frontY - beamLength);
    ctx.lineTo(x - halfW, frontY - beamLength);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255, 250, 220, 0.95)';
    ctx.beginPath(); ctx.ellipse(x - carW * 0.28, frontY - 2, 7, 3.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + carW * 0.28, frontY - 2, 7, 3.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function drawTaillightGlow(x, rearY, carW, isPlayer) {
    const glowR = isPlayer ? 18 : 14;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const sx of [x - carW * 0.3, x + carW * 0.3]) {
      const g = ctx.createRadialGradient(sx, rearY, 1, sx, rearY, glowR);
      g.addColorStop(0, 'rgba(255, 60, 60, 0.95)');
      g.addColorStop(1, 'rgba(255, 20, 20, 0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(sx, rearY, glowR, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  function spawnExplosion() {
    const colors = ['#ffb703', '#fb8500', '#ff4d4d', '#ffe066', '#ffffff', '#ff8800'];
    for (let i = 0; i < 44; i++) {
      const angle = Math.random() * Math.PI * 2;
      const sp = rand(60, 380);
      const life = rand(0.45, 1.2);
      state.particles.push({
        x: player.x + rand(-10, 10), y: player.y + rand(-14, 14),
        vx: Math.cos(angle) * sp, vy: Math.sin(angle) * sp - 70,
        life, maxLife: life, size: rand(2, 7),
        color: colors[(Math.random() * colors.length) | 0]
      });
    }
  }
  function updateEffects(dt) {
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      p.life -= dt;
      if (p.life <= 0) { state.particles.splice(i, 1); continue; }
      p.vy += 420 * dt;
      const drag = Math.exp(-1.6 * dt);
      p.vx *= drag; p.vy *= drag;
      p.x += p.vx * dt; p.y += p.vy * dt;
    }
    if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 2);
  }
  function drawExplosionParticles() {
    for (const p of state.particles) {
      const a = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.4, p.size * a), 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function drawVignette() {
    const strength = state.settings.timeOfDay === 'night' ? 0.72 : 0.55;
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.78);
    g.addColorStop(0, 'rgba(0, 0, 0, 0)');
    g.addColorStop(1, 'rgba(0, 0, 0, ' + strength + ')');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  /* ============================================================
     RENDER
     ============================================================ */
  function render() {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    if (state.shake > 0.001 && state.settings.shake) {
      const s = state.shake * 16;
      ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
    }
    drawGround();
    drawScenery();
    drawRoad();
    for (const e of state.enemies) drawCar(e.x, e.y, e.w, e.h, e.color, 0);
    for (const r of state.rings) drawRing(r);
    drawVehicleBody(state.settings.vehicle, player.x, player.y, player.tilt);
    drawTimeOverlay();
    drawPoliceLights();
    if (state.settings.timeOfDay === 'night') {
      for (const e of state.enemies) drawHeadlightBeam(e.x, e.y - e.h / 2 + 4, e.w, false);
      drawHeadlightBeam(player.x, player.y - player.h / 2 + 4, player.w, true);
      for (const e of state.enemies) drawTaillightGlow(e.x, e.y + e.h / 2 - 6, e.w, false);
      drawTaillightGlow(player.x, player.y + player.h / 2 - 6, player.w, true);
    } else if (state.settings.timeOfDay === 'evening') {
      for (const e of state.enemies) drawTaillightGlow(e.x, e.y + e.h / 2 - 6, e.w, false);
    }
    drawExplosionParticles();
    drawAmbientParticles();
    ctx.restore();
    drawVignette();
  }

  /* ============================================================
     SPAWN / LÓGICA
     ============================================================ */
  function trySpawn() {
    const params = DIFFICULTY_PARAMS[state.settings.difficulty];
    const blocked = LANES.filter(lx =>
      state.enemies.some(e => Math.abs(e.x - lx) < 1 && e.y < SPAWN_BAND)
    );
    if (blocked.length >= params.maxBlocked) return;
    const free = LANES.filter(lx => blocked.indexOf(lx) === -1);
    if (free.length === 0) return;
    state.enemies.push({
      x: free[(Math.random() * free.length) | 0],
      y: -CAR_H, w: CAR_W, h: CAR_H,
      speedMul: rand(0.45, 0.85),
      color: ENEMY_COLORS[(Math.random() * ENEMY_COLORS.length) | 0],
      honked: false
    });
  }

  function updateGame(dt) {
    if (state.dead) return;
    const params = DIFFICULTY_PARAMS[state.settings.difficulty];
    state.speed = Math.min(params.maxSpeed, state.speed + params.accel * dt);
    state.distance += (state.speed * dt) / 12;
    state.roadScroll += state.speed * dt;

    /* 🎮 MOVIMENTAÇÃO */
    let dirX;
    if (pointerActive && pointerTargetX !== null) {
      dirX = clamp((pointerTargetX - player.x) / 30, -1, 1);
    } else {
      dirX = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    }
    const dirY = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    const k = Math.min(1, (dirX === 0 && dirY === 0 ? 12 : 16) * dt);
    player.vx += (dirX * PLAYER_SPEED - player.vx) * k;
    player.vy += (dirY * PLAYER_SPEED * 0.75 - player.vy) * k;
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    const pMinX = INNER_LEFT + player.w / 2;
    const pMaxX = INNER_RIGHT - player.w / 2;
    if (player.x < pMinX) { player.x = pMinX; player.vx = 0; }
    if (player.x > pMaxX) { player.x = pMaxX; player.vx = 0; }
    if (player.y < PLAYER_MIN_Y) { player.y = PLAYER_MIN_Y; player.vy = 0; }
    if (player.y > PLAYER_MAX_Y) { player.y = PLAYER_MAX_Y; player.vy = 0; }
    player.tilt = (player.vx / PLAYER_SPEED) * 0.13;

    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      trySpawn();
      const t = clamp((state.speed - params.startSpeed) / (params.maxSpeed - params.startSpeed), 0, 1);
      state.spawnTimer = params.spawnBase - t * (params.spawnBase - params.spawnMin);
    }
    state.ringSpawnTimer -= dt;
    if (state.ringSpawnTimer <= 0) { spawnRing(); state.ringSpawnTimer = rand(0.9, 1.8); }

    const pad = 7;
    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const e = state.enemies[i];
      e.y += state.speed * (1 - e.speedMul) * dt;
      if (e.y > H + e.h) { state.enemies.splice(i, 1); continue; }
      const dx = Math.abs(e.x - player.x);
      const dy = Math.abs(e.y - player.y);
      if (dx < (e.w + player.w) / 2 - pad && dy < (e.h + player.h) / 2 - pad) { gameOver(); return; }
      const nearX = dx < (e.w + player.w) / 2 + 26;
      const nearY = dy < (e.h + player.h) / 2 + 40;
      if (nearX && nearY && !e.honked) { e.honked = true; safe(() => AudioSys.playHorn()); }
      if ((!nearX || dy > (e.h + player.h) / 2 + 130) && e.honked) e.honked = false;
    }

    /* 💍 ANÉIS */
    for (let i = state.rings.length - 1; i >= 0; i--) {
      const r = state.rings[i];
      r.life -= dt;
      r.phase += dt * 6;
      if (r.life <= 0) { state.rings.splice(i, 1); continue; }
      if (Math.abs(r.x - player.x) < player.w / 2 + RING_R &&
        Math.abs(r.y - player.y) < player.h / 2 + RING_R) {
        state.rings.splice(i, 1);
        state.ringScore += RING_POINTS;
        state.coins += RING_POINTS;
        saveProgress();
        safe(() => AudioSys.playRing());
      }
    }
    safe(() => AudioSys.updateEngine((state.speed - params.startSpeed) / (params.maxSpeed - params.startSpeed)));
  }

  /* ============================================================
     HUD / TELAS
     ============================================================ */
  function updateHUD() {
    const d = Math.floor(state.distance);
    if (d !== state.lastScore) { state.lastScore = d; setText(scoreEl, d + ' m'); }
    setText(speedEl, Math.round(state.speed * 0.42) + ' km/h');
    if (state.ringScore !== state.lastRingScore) {
      state.lastRingScore = state.ringScore;
      setText(ringsEl, state.ringScore);
    }
  }

  function showScreen(name) {
    state.screen = name;
    for (const k in overlays) overlays[k].classList.toggle('hidden', k !== name);
    hud.classList.toggle('hidden', name !== 'playing' && name !== 'paused');
    pauseBtn.classList.toggle('hidden', name !== 'playing');
    touchControls.classList.toggle('hidden', name !== 'playing');
  }

  function resetGame() {
    const params = DIFFICULTY_PARAMS[state.settings.difficulty];
    Object.assign(state, {
      speed: params.startSpeed, distance: 0,
      spawnTimer: 0.7, shake: 0,
      ringScore: 0, ringSpawnTimer: 1.0,
      lastScore: -1, lastRingScore: -1, dead: false
    });
    state.enemies.length = 0;
    state.particles.length = 0;
    state.rings.length = 0;
    setPlayerVehicle(state.settings.vehicle);
    player.x = W / 2; player.y = PLAYER_Y;
    player.vx = 0; player.vy = 0; player.tilt = 0;
    keys.left = keys.right = keys.up = keys.down = false;
    pointerActive = false; pointerTargetX = null;
  }

  function startGame() {
    if (overTimer) { clearTimeout(overTimer); overTimer = null; }
    safe(ensureAudio);
    resetGame();
    initScenery();
    showScreen('playing');
    safe(() => { AudioSys.playStart(); AudioSys.startEngine(); AudioSys.resume(); });
  }
  function pauseGame() {
    if (state.screen !== 'playing' || state.dead) return;
    showScreen('paused');
    safe(() => AudioSys.stopEngine());
    safe(() => AudioSys.playButton());
  }
  function resumeGame() {
    if (state.screen !== 'paused') return;
    showScreen('playing');
    safe(() => { AudioSys.startEngine(); AudioSys.playButton(); });
  }
  function goToMenu() {
    safe(() => { AudioSys.stopEngine(); AudioSys.playButton(); });
    showScreen('menu');
    updateMenuBest();
  }
  function gameOver() {
    if (state.dead) return;
    state.dead = true;
    safe(() => { state.shake = 1; spawnExplosion(); AudioSys.stopEngine(); AudioSys.playCollision(); });
    setTimeout(() => safe(() => AudioSys.playGameOver()), 250);
    const diff = state.settings.difficulty;
    const dist = Math.floor(state.distance);
    if (dist > state.records[diff]) {
      state.records[diff] = dist;
      saveJSON('fuga_records', state.records);
    }
    setText(finalScoreEl, dist + ' m');
    setText(finalBestEl, state.records[diff] + ' m');
    setText(finalRingsEl, state.ringScore);
    setText(finalDiffEl, DIFFICULTY_PARAMS[diff].label);
    if (overTimer) clearTimeout(overTimer);
    overTimer = setTimeout(() => { overTimer = null; safe(() => showScreen('over')); }, 420);
  }
  function updateMenuBest() {
    const diff = state.settings.difficulty;
    setText(menuBestEl, state.records[diff] + ' m');
    setText(menuDiffLabel, DIFFICULTY_PARAMS[diff].label);
  }

  /* ============================================================
     LOJA
     ============================================================ */
  function makePreview(id, size) {
    const c = document.createElement('canvas');
    const dp = Math.min(window.devicePixelRatio || 1, 2);
    c.width = size * dp; c.height = size * dp;
    c.style.width = size + 'px'; c.style.height = size + 'px';
    const prev = ctx;
    ctx = c.getContext('2d');
    ctx.setTransform(dp, 0, 0, dp, 0, 0);
    try {
      const v = VEHICLES[id];
      const scale = Math.min((size * 0.7) / v.w, (size * 0.85) / v.h);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(scale, scale);
      drawVehicleBody(id, 0, 0, 0);
      ctx.restore();
    } finally { ctx = prev; }
    return c;
  }

  function renderShop() {
    setText(shopCoinsEl, state.coins);
    shopListEl.innerHTML = '';
    Object.keys(VEHICLES).forEach(id => {
      const v = VEHICLES[id];
      const owned = state.unlockedVehicles.includes(id);
      const equipped = state.settings.vehicle === id;
      const canAfford = state.coins >= v.price;
      const item = document.createElement('div');
      item.className = 'shop-item' + (equipped ? ' equipped' : '');
      item.appendChild(makePreview(id, 72));
      const name = document.createElement('strong');
      name.textContent = v.name;
      item.appendChild(name);
      const priceEl = document.createElement('span');
      priceEl.className = 'shop-price' + (owned ? ' owned' : '');
      priceEl.textContent = owned ? (equipped ? 'Em uso' : 'Desbloqueado') : '💰 ' + v.price;
      item.appendChild(priceEl);
      const btn = document.createElement('button');
      btn.className = 'shop-btn';
      if (equipped) { btn.textContent = 'Em uso'; btn.disabled = true; }
      else if (owned) { btn.textContent = 'Equipar'; btn.onclick = () => equipVehicle(id); }
      else if (canAfford) { btn.textContent = 'Comprar'; btn.onclick = () => buyVehicle(id); }
      else { btn.textContent = 'Sem moedas'; btn.disabled = true; }
      item.appendChild(btn);
      shopListEl.appendChild(item);
    });
  }

  function buyVehicle(id) {
    const v = VEHICLES[id];
    if (!v || state.unlockedVehicles.includes(id) || state.coins < v.price) return;
    state.coins -= v.price;
    state.unlockedVehicles.push(id);
    saveProgress();
    safe(() => AudioSys.playConfirm());
    renderShop();
  }

  function equipVehicle(id) {
    if (!state.unlockedVehicles.includes(id)) return;
    state.settings.vehicle = id;
    setPlayerVehicle(id);
    saveJSON('fuga_settings', state.settings);
    safe(() => AudioSys.playButton());
    renderShop();
  }

  function openShop() {
    safe(ensureAudio);
    renderShop();
    showScreen('shop');
    safe(() => AudioSys.playButton());
  }

  /* ============================================================
     CONFIGURAÇÕES
     ============================================================ */
  function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tabName));
    safe(() => AudioSys.playButton());
  }

  function updateSettingsUI() {
    document.querySelectorAll('#difficultyGroup .option-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.diff === state.settings.difficulty));
    document.querySelectorAll('#mapGroup .option-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.map === state.settings.map));
    document.querySelectorAll('#timeGroup .option-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.time === state.settings.timeOfDay));
    prefShake.checked = !!state.settings.shake;

    const a = state.settings.audio;
    musicSlider.value = Math.round(a.music * 100);
    sfxSlider.value = Math.round(a.sfx * 100);
    engineSlider.value = Math.round(a.engine * 100);
    setText(musicVal, Math.round(a.music * 100) + '%');
    setText(sfxVal, Math.round(a.sfx * 100) + '%');
    setText(engineVal, Math.round(a.engine * 100) + '%');

    updateMenuBest();
  }

  const saveSettings = () => saveJSON('fuga_settings', state.settings);

  function setDifficulty(diff) {
    if (!DIFFICULTY_PARAMS[diff]) return;
    state.settings.difficulty = diff;
    saveSettings(); updateSettingsUI(); safe(() => AudioSys.playButton());
  }
  function setMap(map) {
    if (!MAPS[map]) return;
    state.settings.map = map;
    saveSettings(); initScenery(); state.ambient.length = 0;
    updateSettingsUI(); safe(() => AudioSys.playButton());
  }
  function setTimeOfDay(time) {
    if (!TIME_OPTIONS.includes(time)) return;
    state.settings.timeOfDay = time;
    saveSettings(); updateSettingsUI(); safe(() => AudioSys.playButton());
  }
  function setVolume(kind, val01) {
    state.settings.audio[kind] = val01;
    saveSettings();
    safe(() => AudioSys.setVolumes(state.settings.audio.music, state.settings.audio.sfx, state.settings.audio.engine));
    setText({ music: musicVal, sfx: sfxVal, engine: engineVal }[kind], Math.round(val01 * 100) + '%');
  }
  function resetDefaults() {
    state.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    saveSettings();
    safe(() => AudioSys.setVolumes(state.settings.audio.music, state.settings.audio.sfx, state.settings.audio.engine));
    initScenery(); state.ambient.length = 0;
    updateSettingsUI(); safe(() => AudioSys.playConfirm());
  }
  function openSettings() {
    state.settingsReturn = state.screen === 'paused' ? 'pause' : 'menu';
    safe(ensureAudio); updateSettingsUI(); showScreen('settings'); safe(() => AudioSys.playButton());
  }
  function closeSettings() {
    safe(() => AudioSys.playButton());
    showScreen(state.settingsReturn === 'pause' ? 'paused' : 'menu');
    updateMenuBest();
  }
  function openRecords() {
    safe(() => AudioSys.playButton());
    recordsList.innerHTML = '';
    ['low', 'medium', 'hardcore'].forEach(k => {
      const row = document.createElement('div');
      row.className = 'record-item';
      const span = document.createElement('span');
      span.textContent = DIFFICULTY_PARAMS[k].label.toUpperCase();
      const strong = document.createElement('strong');
      strong.textContent = state.records[k] + ' m';
      row.append(span, strong);
      recordsList.appendChild(row);
    });
    showScreen('records');
  }

  /* ============================================================
     RESETAR JOGO — zera progresso, preserva preferências
     ─────────────────────────────────────────────────────────────
     • Reseta apenas: moedas, recordes, veículos, veículo equipado
     • Preserva: dificuldade, mapa, horário, áudio, tremor
     • Remove chaves de progresso do localStorage
     ───────────────────────────────────────────────────────────── */
  function resetGameProgress() {
    const msg =
      'Tem certeza de que deseja resetar o jogo?\n\n' +
      'Todo o seu progresso, pontuações, moedas e veículos ' +
      'desbloqueados serão perdidos. Essa ação não poderá ' +
      'ser desfeita.';
    if (!confirm(msg)) return;

    // --- zera progresso em memória ---
    state.coins = 0;
    state.unlockedVehicles = ['red'];
    state.records = { low: 0, medium: 0, hardcore: 0 };
    state.settings.vehicle = 'red';
    setPlayerVehicle('red');

    // --- limpa localStorage de progresso ---
    removeLS('fuga_progress');
    removeLS('fuga_records');

    // --- reescreve estado zerado (mantém demais settings) ---
    saveProgress();
    saveJSON('fuga_records', state.records);
    saveJSON('fuga_settings', state.settings);

    // --- atualiza UI imediatamente ---
    updateMenuBest();
    updateSettingsUI();
    safe(() => AudioSys.playConfirm());
    alert('Progresso resetado com sucesso!');
  }

  /* ============================================================
     EVENTOS UI
     ============================================================ */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (btn) {
      safe(ensureAudio);
      const actions = {
        play: () => { safe(() => AudioSys.playConfirm()); startGame(); },
        resume: resumeGame,
        'go-menu': goToMenu,
        'open-shop': openShop,
        'close-shop': () => { safe(() => AudioSys.playButton()); showScreen('menu'); },
        'open-settings': openSettings,
        'close-settings': closeSettings,
        'open-records': openRecords,
        'close-records': () => { safe(() => AudioSys.playButton()); showScreen('menu'); },
        'save-settings': () => { safe(() => AudioSys.playConfirm()); saveSettings(); closeSettings(); },
        'reset-defaults': resetDefaults,
        'reset-game': resetGameProgress
      };
      (actions[btn.dataset.action] || (() => { }))();
      return;
    }
    const tab = e.target.closest('.tab');
    if (tab) return switchTab(tab.dataset.tab);
    const diffBtn = e.target.closest('#difficultyGroup .option-btn');
    if (diffBtn) return setDifficulty(diffBtn.dataset.diff);
    const mapBtn = e.target.closest('#mapGroup .option-btn');
    if (mapBtn) return setMap(mapBtn.dataset.map);
    const timeBtn = e.target.closest('#timeGroup .option-btn');
    if (timeBtn) return setTimeOfDay(timeBtn.dataset.time);
  });

  musicSlider.addEventListener('input', function () { safe(ensureAudio); setVolume('music', this.value / 100); });
  sfxSlider.addEventListener('input', function () { safe(ensureAudio); setVolume('sfx', this.value / 100); });
  engineSlider.addEventListener('input', function () { safe(ensureAudio); setVolume('engine', this.value / 100); });
  prefShake.addEventListener('change', function () {
    state.settings.shake = !!this.checked;
    saveSettings(); safe(ensureAudio); safe(() => AudioSys.playButton());
  });
  pauseBtn.addEventListener('click', pauseGame);

  /* ============================================================
     TECLADO
     ============================================================ */
  const KEY_MAP = {
    ArrowLeft: 'left', a: 'left', A: 'left',
    ArrowRight: 'right', d: 'right', D: 'right',
    ArrowUp: 'up', w: 'up', W: 'up',
    ArrowDown: 'down', s: 'down', S: 'down'
  };

  window.addEventListener('keydown', e => {
    safe(ensureAudio);
    const dir = KEY_MAP[e.key];
    if (dir) {
      keys[dir] = true;
      if (state.screen === 'playing') e.preventDefault();
      return;
    }
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
      if (state.screen === 'playing') { pauseGame(); e.preventDefault(); }
      else if (state.screen === 'paused') { resumeGame(); e.preventDefault(); }
    } else if ((e.key === ' ' || e.key === 'Enter') &&
      (state.screen === 'menu' || state.screen === 'over')) {
      startGame(); e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('keyup', e => {
    const dir = KEY_MAP[e.key];
    if (dir) keys[dir] = false;
  });

  window.addEventListener('blur', () => {
    keys.left = keys.right = keys.up = keys.down = false;
    pointerActive = false;
    if (state.screen === 'playing') pauseGame();
  });

  /* ============================================================
     TOUCH
     ============================================================ */
  function bindHold(el, setter) {
    const down = e => { e.preventDefault(); safe(ensureAudio); setter(true); el.classList.add('active'); };
    const up = e => { if (e) e.preventDefault(); setter(false); el.classList.remove('active'); };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('contextmenu', e => e.preventDefault());
  }
  bindHold(btnLeft, v => { keys.left = v; });
  bindHold(btnRight, v => { keys.right = v; });

  function canvasX(clientX) {
    const rect = canvas.getBoundingClientRect();
    return (clientX - rect.left) * (W / rect.width);
  }
  canvas.addEventListener('pointerdown', e => {
    if (state.screen !== 'playing') return;
    safe(ensureAudio);
    pointerActive = true;
    pointerTargetX = canvasX(e.clientX);
  });
  canvas.addEventListener('pointermove', e => {
    if (!pointerActive) return;
    pointerTargetX = canvasX(e.clientX);
  });
  window.addEventListener('pointerup', () => { pointerActive = false; pointerTargetX = null; });
  window.addEventListener('pointercancel', () => { pointerActive = false; pointerTargetX = null; });

  /* ============================================================
     LOOP
     ============================================================ */
  let lastTime = 0;
  function loop(ts) {
    try {
      if (!lastTime) lastTime = ts;
      let dt = (ts - lastTime) / 1000;
      lastTime = ts;
      dt = Math.min(dt, 0.05);

      if (state.screen === 'playing') {
        updateGame(dt);
      } else if (state.screen !== 'paused') {
        state.roadScroll += 100 * dt;
      }
      if (state.screen !== 'paused') {
        updateEffects(dt);
        updateAmbientParticles(dt);
        state.animTime += dt;
      }
      render();
      if (state.screen === 'playing' || state.screen === 'paused') updateHUD();
    } catch (err) {
      console.error('Loop error:', err);
      if (state.screen === 'playing' && !state.dead) safe(gameOver);
    }
    requestAnimationFrame(loop);
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    AudioSys.volumes = {
      music: state.settings.audio.music,
      sfx: state.settings.audio.sfx,
      engine: state.settings.audio.engine
    };
    initScenery();
    updateSettingsUI();
    updateMenuBest();
    showScreen('menu');

    const tryInitAudio = () => {
      safe(ensureAudio);
      window.removeEventListener('pointerdown', tryInitAudio);
      window.removeEventListener('keydown', tryInitAudio);
    };
    window.addEventListener('pointerdown', tryInitAudio);
    window.addEventListener('keydown', tryInitAudio);

    requestAnimationFrame(loop);
  }

  init();
})();