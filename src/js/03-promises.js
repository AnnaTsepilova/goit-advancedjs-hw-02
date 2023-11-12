import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value > 0 && step.value > 0 && amount.value > 0) {
    let delayTime = Number.parseInt(delay.value);
    for (let i = 0; i < Number.parseInt(amount.value); i += 1) {
      createPromise(i, delayTime)
        .then(({ position, delay }) => {
          iziToast.success({
            title: 'Success',
            message: `Fulfilled promise ${position} in ${delay}ms`,
            position: 'topRight',
            maxWidth: '300px',
          });
        })
        .catch(({ position, delay }) => {
          iziToast.error({
            title: 'Error',
            message: `Rejected promise ${position} in ${delay}ms`,
            position: 'topRight',
            maxWidth: '300px',
          });
        });
      delayTime += Number.parseInt(step.value);
    }
  } else {
    iziToast.warning({
      title: 'Warning',
      message: `Please enter a positive number`,
      position: 'topRight',
      maxWidth: '300px',
    });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
