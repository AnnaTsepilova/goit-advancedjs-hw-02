import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  resetBtn: document.querySelector('button[data-reset]'),
  dateValue: document.querySelector('#datetime-picker'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let deltaTime = null;
let timeStampSelectedDate = null;

refs.startBtn.setAttribute('disabled', 'disabled');
refs.resetBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeStampSelectedDate = selectedDates[0].getTime();
    checkDate(selectedDates[0], refs.startBtn);
    deltaTime = timeStampSelectedDate - Date.now();
  },
};

flatpickr(refs.dateValue, options);

refs.startBtn.addEventListener('click', onBtnStartClick);
refs.resetBtn.addEventListener('click', onBtnResetClick);

function checkDate(date, btn) {
  if (date.getTime() < Date.now()) {
    btn.setAttribute('disabled', 'disabled');
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future!',
      position: 'topRight',
    });
  } else {
    btn.removeAttribute('disabled');
  }
}

function onBtnStartClick() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.dateValue.setAttribute('disabled', 'disabled');
  refs.resetBtn.removeAttribute('disabled');

  intervalId = setInterval(() => {
    deltaTime -= 1000;

    if (timeStampSelectedDate <= Date.now()) {
      clearInterval(intervalId);
      refs.dateValue.removeAttribute('disabled');
    }

    let { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimerFace({ days, hours, minutes, seconds });
  }, 1000);
}

function onBtnResetClick() {
  clearInterval(intervalId);
  refs.dateValue.removeAttribute('disabled');
  refs.startBtn.removeAttribute('disabled');
  refs.resetBtn.setAttribute('disabled', 'disabled');

  flatpickr(refs.dateValue, options);

  refs.daysField.textContent = '00';
  refs.hoursField.textContent = '00';
  refs.minutesField.textContent = '00';
  refs.secondsField.textContent = '00';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}
