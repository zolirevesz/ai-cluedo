// ═══════════════════════════════════════
// GAME LOGIC
// ═══════════════════════════════════════


let currentRound = 0;
let questionsRemaining = 0;
let usedPromptIds = new Set();
let usedPromptsThisRound = [];
let selectedSuspect = null;
let currentFilter = 'all';
let currentPrompts = [];
let timerSeconds = 0;
let timerInterval = null;
let timerExpired = false;
let hintUsed = false;
let highlightedPromptId = null;


function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


function getPromptsForRound(round) {
  const pools = [ROUND1_PROMPTS, ROUND2_PROMPTS, ROUND3_PROMPTS];
  return shuffleArray(pools[round]).map((p, i) => ({ ...p, id: `r${round}-${i}` }));
}


// ─── SCREEN MANAGEMENT ───
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


// ─── START GAME ───
function startGame() {
  currentRound = 0;
  hintUsed = false;
  highlightedPromptId = null;
  showRoundTransition();
}


// ─── ROUND TRANSITION ───
function showRoundTransition() {
  const info = ROUND_INFO[currentRound];
  document.getElementById('rt-title').textContent = info.title;
  document.getElementById('rt-description').textContent = info.description;
  var timeMins = Math.floor(info.timeLimit / 60);
  document.getElementById('rt-limit').textContent = 'Felhaszn\u00e1lhat\u00f3 k\u00e9rd\u00e9sek: ' + info.limit + ' | Id\u0151korl\u00e1t: ' + timeMins + ' perc';
  showScreen('round-transition');
}


// ─── ENTER ROUND ───
function enterRound() {
  const info = ROUND_INFO[currentRound];
  questionsRemaining = info.limit;
  usedPromptsThisRound = [];


  document.getElementById('round-badge').textContent = info.roundLabel;
  document.getElementById('q-counter').textContent = questionsRemaining;
  var welcomeText = currentRound === 2
    ? 'K\u00e9rdezz\u00e9tek a nyomoz\u00f3t! \u0150 seg\u00edt \u00f6sszef\u00fcgg\u00e9seket tal\u00e1lni.'
    : 'V\u00e1lassz egy k\u00e9rd\u00e9st a jobb oldali panelb\u0151l, hogy megk\u00e9rdezd a gyan\u00fas\u00edtottakat.';
  var chatContainer = document.getElementById('chat-messages');
  chatContainer.innerHTML = '<div class="chat-welcome" id="chat-welcome">' + welcomeText + '</div>';


  currentPrompts = getPromptsForRound(currentRound);
  usedPromptIds = new Set();


  highlightedPromptId = null;
  document.getElementById('hint-btn').disabled = hintUsed;


  // Reset UI elements from previous round
  document.getElementById('end-round-wrap').classList.remove('visible');
  document.getElementById('timeup-ribbon').classList.remove('visible');
  document.querySelector('.prompts-panel').classList.remove('disabled');
  document.getElementById('round-timer').classList.remove('warning', 'critical', 'expired');


  renderFilters();
  renderPrompts();
  showScreen('game-screen');
  startTimer(info.timeLimit);
}


// ─── FILTERS ───
function renderFilters() {
  var filterContainer = document.getElementById('prompts-filter');
  filterContainer.innerHTML = '';
  currentFilter = 'all';


  var targets;
  if (currentRound === 2) {
    targets = [
      { key: 'all', label: 'Mind' },
      { key: 'nyomozo', label: '\uD83D\uDD0D Nyomoz\u00f3' }
    ];
  } else {
    targets = [
      { key: 'all', label: 'Mind' },
      { key: 'istvan', label: '\uD83C\uDFA9 Istv\u00e1n' },
      { key: 'katalin', label: '\uD83D\uDC69\u200D\uD83D\uDCBC Katalin' },
      { key: 'anna', label: '\uD83C\uDFAD Anna' },
      { key: 'tamas', label: '\uD83E\uDDE5 Tam\u00e1s' },
      { key: 'viktor', label: '\uD83D\uDE24 Viktor' }
    ];
  }


  targets.forEach(function(t) {
    var btn = document.createElement('button');
    btn.className = 'filter-btn' + (t.key === 'all' ? ' active' : '');
    btn.textContent = t.label;
    btn.onclick = function() {
      currentFilter = t.key;
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderPrompts();
    };
    filterContainer.appendChild(btn);
  });
}


// ─── RENDER PROMPTS ───
function renderPrompts() {
  var list = document.getElementById('prompts-list');
  list.innerHTML = '';


  var filtered = currentFilter === 'all'
    ? currentPrompts
    : currentPrompts.filter(function(p) { return p.target === currentFilter; });


  if (highlightedPromptId && !hintAnimating) {
    filtered = filtered.slice().sort(function(a, b) {
      if (a.id === highlightedPromptId) return -1;
      if (b.id === highlightedPromptId) return 1;
      return 0;
    });
  }


  filtered.forEach(function(prompt) {
    var card = document.createElement('div');
    var classes = 'prompt-card';
    if (usedPromptIds.has(prompt.id)) classes += ' used';
    if (prompt.id === highlightedPromptId && !usedPromptIds.has(prompt.id)) classes += ' highlighted';
    card.className = classes;


    var targetInfo = prompt.target === 'nyomozo'
      ? { name: 'Nyomoz\u00f3', emoji: '\uD83D\uDD0D' }
      : CHARACTERS[prompt.target];


    card.innerHTML = '<div class="prompt-target">' + targetInfo.emoji + ' ' + targetInfo.name + '</div>'
      + '<div class="prompt-text">' + prompt.text + '</div>';


    if (!usedPromptIds.has(prompt.id)) {
      card.onclick = function() { usePrompt(prompt); };
    }


    list.appendChild(card);
  });
}


// ─── HINT ───
var hintAnimating = false;


function useHint() {
  if (hintUsed || timerExpired || questionsRemaining <= 0) return;
  hintUsed = true;
  document.getElementById('hint-btn').disabled = true;


  var available = currentPrompts.filter(function(p) {
    return p.quality === 'strong' && !usedPromptIds.has(p.id);
  });
  if (available.length === 0) return;


  var pick = available[Math.floor(Math.random() * available.length)];
  highlightedPromptId = pick.id;


  // Reset filter to "all" so card is visible
  currentFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var allBtn = document.querySelector('.filter-btn');
  if (allBtn) allBtn.classList.add('active');


  // Render WITHOUT sort so the card stays in its original position
  hintAnimating = true;
  renderPrompts();


  var list = document.getElementById('prompts-list');
  var targetCard = list.querySelector('.prompt-card.highlighted');
  var firstCard = list.querySelector('.prompt-card');
  if (!targetCard || !firstCard || targetCard === firstCard) {
    hintAnimating = false;
    if (targetCard) {
      targetCard.classList.add('hint-settle');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }


  // Start animation after a brief pause
  setTimeout(function() {
    // Record old position
    var oldRect = targetCard.getBoundingClientRect();


    // Move DOM node to top
    list.insertBefore(targetCard, firstCard);


    // Record new position
    var newRect = targetCard.getBoundingClientRect();
    var deltaY = oldRect.top - newRect.top;


    // FLIP: place at old position, then animate to new
    targetCard.style.transform = 'translateY(' + deltaY + 'px)';
    targetCard.style.transition = 'none';
    targetCard.classList.add('hint-animate');


    // Force reflow
    targetCard.offsetHeight;


    // Animate to final position
    targetCard.style.transition = 'transform .8s cubic-bezier(.4,0,.2,1)';
    targetCard.style.transform = 'translateY(0)';


    // Clean up after animation
    setTimeout(function() {
      targetCard.style.transform = '';
      targetCard.style.transition = '';
      targetCard.classList.remove('hint-animate');
      targetCard.classList.add('hint-settle');
      hintAnimating = false;
      list.scrollTo({ top: 0, behavior: 'smooth' });
    }, 850);
  }, 400);
}


// ─── USE PROMPT ───
function usePrompt(prompt) {
  if (questionsRemaining <= 0 || usedPromptIds.has(prompt.id) || timerExpired) return;


  usedPromptIds.add(prompt.id);
  usedPromptsThisRound.push(prompt);
  questionsRemaining--;
  document.getElementById('q-counter').textContent = questionsRemaining;


  var welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.remove();


  var chatContainer = document.getElementById('chat-messages');


  var userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = '<div class="msg-sender">Ti k\u00e9rdesitek</div><div>' + prompt.text + '</div>';
  chatContainer.appendChild(userMsg);


  var typingMsg = document.createElement('div');
  typingMsg.className = 'chat-msg ai';
  var targetInfo = prompt.target === 'nyomozo'
    ? { name: 'Nyomoz\u00f3', emoji: '\uD83D\uDD0D' }
    : CHARACTERS[prompt.target];
  typingMsg.innerHTML = '<div class="msg-sender">' + targetInfo.emoji + ' ' + targetInfo.name + '</div>'
    + '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatContainer.appendChild(typingMsg);
  chatContainer.scrollTop = chatContainer.scrollHeight;


  var delay = 800 + Math.random() * 1200;
  setTimeout(function() {
    typingMsg.innerHTML = '<div class="msg-sender">' + targetInfo.emoji + ' ' + targetInfo.name + '</div>'
      + '<div>' + prompt.response + '</div>';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    renderPrompts();


    if (questionsRemaining <= 0) {
      document.querySelector('.prompts-panel').classList.add('disabled');
      setTimeout(function() { showEndRoundButton(); }, 1000);
    }
  }, delay);
}


// ─── END ROUND BUTTON ───
function showEndRoundButton() {
  document.getElementById('end-round-wrap').classList.add('visible');
}


// ─── TIMER ───
function startTimer(seconds) {
  stopTimer();
  timerSeconds = seconds;
  timerExpired = false;
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      timerExpired = true;
      stopTimer();
      handleTimeUp();
    }
  }, 1000);
}


function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}


function updateTimerDisplay() {
  var mins = Math.floor(timerSeconds / 60);
  var secs = timerSeconds % 60;
  var display = mins + ':' + (secs < 10 ? '0' : '') + secs;
  document.getElementById('timer-value').textContent = display;
  var timerEl = document.getElementById('round-timer');
  if (timerSeconds <= 10) {
    timerEl.classList.add('warning');
    timerEl.classList.add('critical');
  } else if (timerSeconds <= 60) {
    timerEl.classList.add('warning');
    timerEl.classList.remove('critical');
  } else {
    timerEl.classList.remove('warning');
    timerEl.classList.remove('critical');
  }
}


function handleTimeUp() {
  // Stop flashing, keep red box
  document.getElementById('round-timer').classList.add('expired');
  // Show red ribbon
  document.getElementById('timeup-ribbon').classList.add('visible');
  // Disable all prompts
  document.querySelector('.prompts-panel').classList.add('disabled');
  // Show end round button in side panel
  showEndRoundButton();
}


// ─── ROUND SUMMARY ───
function showRoundSummary() {
  stopTimer();
  var info = ROUND_INFO[currentRound];
  document.getElementById('rs-title').textContent = info.title + ' \u2013 \u00d6sszegz\u00e9s';


  var strongCount = 0;
  var weakCount = 0;
  usedPromptsThisRound.forEach(function(p) {
    if (p.quality === 'strong') strongCount++;
    else weakCount++;
  });


  var statsHtml = '<div class="summary-stat stat-strong">'
    + '<div class="stat-num">' + strongCount + '</div>'
    + '<div class="stat-label">Er\u0151s k\u00e9rd\u00e9s</div></div>'
    + '<div class="summary-stat stat-weak">'
    + '<div class="stat-num">' + weakCount + '</div>'
    + '<div class="stat-label">Gyenge k\u00e9rd\u00e9s</div></div>';
  document.getElementById('summary-stats').innerHTML = statsHtml;


  var listHtml = '';
  usedPromptsThisRound.forEach(function(p) {
    var targetInfo = p.target === 'nyomozo'
      ? { name: 'Nyomoz\u00f3', emoji: '\uD83D\uDD0D' }
      : CHARACTERS[p.target];
    var qualityLabel = p.quality === 'strong' ? '\uD83D\uDCAA Er\u0151s k\u00e9rd\u00e9s' : '\uD83D\uDD0E Gyenge k\u00e9rd\u00e9s';
    listHtml += '<div class="summary-card ' + p.quality + '">'
      + '<div class="summary-label">' + targetInfo.emoji + ' ' + targetInfo.name + ' \u2013 ' + qualityLabel + '</div>'
      + '<div class="summary-prompt">\u201e' + p.text + '\u201d</div>'
      + '<div class="summary-explanation">' + (p.explanation || '') + '</div>'
      + '</div>';
  });
  document.getElementById('summary-list').innerHTML = listHtml;


  var nextLabel = currentRound < 2 ? 'K\u00f6vetkez\u0151 k\u00f6r' : 'V\u00e1d emel\u00e9se';
  document.getElementById('rs-next-btn').textContent = nextLabel;


  showScreen('round-summary');
}


// ─── PROCEED FROM SUMMARY ───
function proceedFromSummary() {
  currentRound++;
  if (currentRound < 3) {
    showRoundTransition();
  } else {
    showAccusation();
  }
}


// ─── ACCUSATION ───
function showAccusation() {
  var grid = document.getElementById('suspect-grid');
  grid.innerHTML = '';
  selectedSuspect = null;
  document.getElementById('accuse-btn').disabled = true;


  Object.entries(CHARACTERS).forEach(function(entry) {
    var key = entry[0];
    var char = entry[1];
    var card = document.createElement('div');
    card.className = 'suspect-card';
    card.innerHTML = '<div class="suspect-avatar">' + char.emoji + '</div>'
      + '<div class="suspect-name">' + char.name + '</div>'
      + '<div class="suspect-role">' + char.role + '</div>';
    card.onclick = function() {
      document.querySelectorAll('.suspect-card').forEach(function(c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      selectedSuspect = key;
      document.getElementById('accuse-btn').disabled = false;
    };
    grid.appendChild(card);
  });


  showScreen('accusation-screen');
}


function lockAccusation() {
  if (!selectedSuspect) return;
  var char = CHARACTERS[selectedSuspect];
  document.getElementById('locked-suspect-name').textContent = char.emoji + ' ' + char.name + ' (' + char.role + ')';
  showScreen('locked-screen');
}
