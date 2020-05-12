function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }
  this.gallery = gallery;

  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevBtn = this.modal.querySelector('.prev');
  this.nextBtn = this.modal.querySelector('.next');

  // bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleEsckeyPress = this.handleEsckeyPress.bind(this);
  this.handleModalClickOutside = this.handleModalClickOutside.bind(this);

  // These are our event listeners
  this.images.forEach(image =>
    image.addEventListener('click', e => this.showImage(e.currentTarget))
  );

  this.images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') this.showImage(e.currentTarget);
    })
  );

  this.modal.addEventListener('click', this.handleModalClickOutside);
}

Gallery.prototype.openModal = function() {
  console.info('Opening modal!');
  // check to see if modal is already open
  if (this.modal.matches('.open')) {
    console.info('modal already open');
  }
  this.modal.classList.add('open');

  // event listeners to be bound when we open the modal:
  window.addEventListener('keyup', this.handleEsckeyPress);
  this.nextBtn.addEventListener('click', this.showNextImage);
  this.prevBtn.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  // TODO: add event listeners for click and keyboard
  window.removeEventListener('keyup', this.handleEsckeyPress);
  this.nextBtn.removeEventListener('click', this.showNextImage);
  this.prevBtn.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleModalClickOutside = function(e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleEsckeyPress = function(e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showImage = function(el) {
  if (!el) {
    console.info('no image to show');
  }
  // update the modal with this info
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

Gallery.prototype.showNextImage = function() {
  console.log(this);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
console.log(gallery1, gallery2);
