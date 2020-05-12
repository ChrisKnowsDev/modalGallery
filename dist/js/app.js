function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('Opening modal!');
    // check to see if modal is already open
    if (modal.matches('.open')) {
      console.info('modal already open');
    }
    modal.classList.add('open');

    // event listeners to be bound when we open the modal:
    window.addEventListener('keyup', handleEsckeyPress);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for click and keyboard
    window.removeEventListener('keyup', handleEsckeyPress);
    nextBtn.removeEventListener('click', showNextImage);
    prevBtn.removeEventListener('click', showPrevImage);
  }

  function handleModalClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleEsckeyPress(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
    }
    // update the modal with this info
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // These are our event listeners
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  modal.addEventListener('click', handleModalClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
