let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 1000);

    startBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(timerInterval);
    startBtn.textContent = "Start";
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  lapCount = 1;
  display.textContent = "00:00:00";
  startBtn.textContent = "Start";
  lapList.innerHTML = "";
}

function addLap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount++} - ${formatTime(elapsedTime)}`;
    lapList.appendChild(li);
  }
}

startBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
