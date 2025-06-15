'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

/* ------------------------------------------------------------------------- */

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

/* ------------------------------------------------------------------------- */

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', function () {
    console.log(`Button ${i + 1} clicked`);
    openModal();
  });
}

btnCloseModal.addEventListener('click', function () {
  console.log('Close button clicked');
  closeModal();
});

overlay.addEventListener('click', function () {
  console.log('Overlay clicked');
  closeModal();
});

/* ------------------------------------------------------------------------- */

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape') {
    closeModal();
  }
});