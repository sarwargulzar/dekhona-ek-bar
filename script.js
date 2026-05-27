// script.js – interactive apology flow with moving "No" button and confetti

// Helper to create a button element
function createBtn(label, onClick, disabled = false) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.disabled = disabled;
  btn.addEventListener('click', onClick);
  return btn;
}

// Render a message and an array of button elements
function render(message, buttons) {
  const msgDiv = document.getElementById('message');
  const btnDiv = document.getElementById('buttons');
  msgDiv.innerHTML = `<p>${message}</p>`;
  btnDiv.innerHTML = '';
  buttons.forEach(b => btnDiv.appendChild(b));
}

// Move a button to a random position inside the container
function moveButtonRandomly(btn) {
  const container = document.querySelector('.container');
  const rect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const maxX = rect.width - btnRect.width - 20;
  const maxY = rect.height - btnRect.height - 20;
  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;
  btn.style.position = 'absolute';
  btn.style.left = `${randX}px`;
  btn.style.top = `${randY}px`;
}

// Confetti helper – triggers a short burst (requires canvas-confetti library)
function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 }
    });
  }
}

/* ------------------ Dialogue Flow ------------------ */
function start() {
  render(
    "jaan please forgive me naaa",
    [createBtn('Yes', stepYesFirst), createBtn('No', stepNoFirst)]
  );
}

function stepYesFirst() {
  render(
    "yaaaaay!! love you jan",
    [createBtn('I love you dudu', stepFinalThanks)]
  );
}

function stepNoFirst() {
  render(
    "jaaaaaan please baby maaf kardo aise gussa rehkar kuch nahi milta please maaf kardo",
    [createBtn('Yes', stepYesSecond), createBtn('No', stepNoSecond)]
  );
}

function stepYesSecond() {
  const finalMsg = `
    thank u thank u thank u baby sooooooooo much baby i loveeeeeeeee you 
    soooooooooooooooooooooooooooooooooooooooooooooooooooooo muuuuuuccccccccchhhhhhhhhh 
    muah muah bubu love you baby my sweetu tabish
  `.replace(/\s+/g, ' ');
  render(finalMsg, []);
  launchConfetti();
}

// Clicking the second "No" moves the button around
function stepNoSecond(event) {
  const noBtn = event.target;
  moveButtonRandomly(noBtn);
  // keep track of attempts to show a hint
  noBtn.dataset.clicks = (Number(noBtn.dataset.clicks) || 0) + 1;
  if (Number(noBtn.dataset.clicks) >= 3) {
    const hint = document.createElement('p');
    hint.style.color = '#ff4e42';
    hint.textContent = '😉 Keep trying, or click "Yes"!';
    document.getElementById('buttons').appendChild(hint);
  }
}

function stepFinalThanks() {
  // reuse the same final thank‑you flow
  stepYesSecond();
}

window.addEventListener('DOMContentLoaded', start);
