function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  console.log(images);
  const modal = document.querySelector('.modal');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  let currentImage;

  // open modal
  function openModal() {
    console.info('Opening modal!');
    // check to see if modal is already open
    if (modal.matches('.open')) {
      console.info('modal already open');
    }
    modal.classList.add('open');
  }

  // close modal
  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for click and keyboard
  }

  // handle click outside modal event
  function handleModalClickOutside(e) {
    console.log('target:', e.target);
    console.log('currentTarget:', e.currentTarget);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  // handle esc key press to close modal
  function handleEsckeyPress(e) {
    if (e.key === 'Escape') closeModal();
  }

  // show images
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

  // These are our event listeners
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  modal.addEventListener('click', handleModalClickOutside);
  window.addEventListener('keyup', handleEsckeyPress);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
