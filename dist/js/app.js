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

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
