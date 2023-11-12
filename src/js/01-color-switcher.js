const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const body = document.querySelector('body');

stopBtn.setAttribute('disabled', 'disabled');

let timerId = null;

const onStartBtnClick = () => {
  setBtnStatus(true, startBtn);
  setBtnStatus(false, stopBtn);
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopBtnClick = () => {
  setBtnStatus(true, stopBtn);
  setBtnStatus(false, startBtn);
  clearInterval(timerId);
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function setBtnStatus(isStarted, btn) {
  if (isStarted) {
    btn.setAttribute('disabled', 'disabled');
  } else {
    btn.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
