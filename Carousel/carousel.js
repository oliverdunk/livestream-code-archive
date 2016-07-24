class Carousel {

  constructor() {
    this.animating = false;

    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this._onLeftAnimationEnd = this._onLeftAnimationEnd.bind(this);
    this._onRightAnimationEnd = this._onRightAnimationEnd.bind(this);
    this._registerEventListeners();
  }

  _registerEventListeners() {
    document.querySelector(".carousel-next").addEventListener('click', this.slideLeft);
    document.querySelector(".carousel-previous").addEventListener('click', this.slideRight);
  }

  slideLeft() {
    if(this.animating) return;
    this.animating = true;
    var carousel = document.querySelector('.carousel-items');
    carousel.style.transition = "transform 2s";
    carousel.style.transform = `translateX(-100%)`;
    carousel.addEventListener('transitionend', this._onLeftAnimationEnd);
  }

  slideRight() {
    if(this.animating) return;
    this.animating = true;
    var carousel = document.querySelector('.carousel-items');
    var lastChild = carousel.children[carousel.children.length - 1];
    carousel.insertBefore(lastChild, carousel.children[0]);
    carousel.style.transform = `translateX(-100%)`;
    carousel.addEventListener('transitionend', this._onRightAnimationEnd);

    var redraw = carousel.offsetHeight; //Force window redraw
    carousel.style.transition = "transform 2s";
    carousel.style.transform = `translateX(0%)`;
  }

  _onRightAnimationEnd() {
    var carousel = document.querySelector('.carousel-items');
    carousel.removeEventListener('transitionend', this._onRightAnimationEnd);
    carousel.style.transition = "";
    this.animating = false;
  }

  _onLeftAnimationEnd() {
    var carousel = document.querySelector('.carousel-items');
    carousel.removeEventListener('transitionend', this._onLeftAnimationEnd);
    var firstItem = carousel.children[0];
    carousel.appendChild(firstItem);
    carousel.style.transform = "translateX(0%)";
    carousel.style.transition = "";
    this.animating = false;
  }

}

window.addEventListener('load', new Carousel());
