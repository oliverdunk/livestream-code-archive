class Refresh {

  constructor() {
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.spinnerIcon = document.querySelector('#js-refresh');
    this.spinnerImage = document.querySelector('.spinner-image');

    this.dragging = false;
    this.animating = false;
    this.startY = 0;
    this.currentY = 0;

    this.registerEventListeners();
  }

  registerEventListeners() {
    document.addEventListener('touchstart', this.touchStart);
    document.addEventListener('touchmove', this.touchMove);
    document.addEventListener('touchend', this.touchEnd);

    document.addEventListener('mousedown', this.touchStart);
    document.addEventListener('mousemove', this.touchMove);
    document.addEventListener('mouseup', this.touchEnd);
  }

  touchStart(evt) {
    evt.preventDefault();
    if(this.dragging)
      return;

    this.dragging = true;
    this.startY = evt.screenY || evt.touches[0].screenY;
  }

  touchMove(evt) {
    if(this.animating || !this.dragging)
      return;

    if(evt.originalEvent) this.currentY = evt.screenY || evt.originalEvent.touches[0].screenY;
    else this.currentY = evt.screenY || evt.touches[0].screenY;

    let distanceDragged = (this.currentY - this.startY);

    this.spinnerIcon.style.transform = `translateY(${distanceDragged * 1.25}px)`;
    this.spinnerImage.style.transform = `rotate(${distanceDragged * 1.2}deg)`;
    this.spinnerImage.style.opacity = Math.min(distanceDragged * 0.0035, 1);
  }

  touchEnd() {
    let distanceDragged = (this.currentY - this.startY);

    let refresh = () => {
      this.spinnerIcon.removeEventListener('transitionend', refresh);
      this.spinnerImage.style.transition = "transform 2s";
      this.spinnerImage.style.transform = "rotate(1000deg)";
      this.spinnerImage.addEventListener('transitionend', removeIcon);
    };

    let removeIcon = () => {
      this.spinnerImage.removeEventListener('transitionend', removeIcon);
      this.spinnerIcon.style.transition = "transform 0.2s";
      this.spinnerIcon.style.transform = "translateY(200px) scale(0.1)";
      this.spinnerIcon.addEventListener('transitionend', reset);
    };

    let reset = (evt) => {
      if(evt.target.nodeName === "IMG") return;
      this.spinnerIcon.style.transition = "";
      this.spinnerIcon.style.transform = "";
      this.spinnerImage.style.transform = "";
      this.spinnerImage.style.transition = "";
      this.dragging = false;
      this.animating = false;
      this.spinnerIcon.removeEventListener('transitionend', reset);
    };

    refresh = refresh.bind(this);
    removeIcon = removeIcon.bind(this);
    reset = reset.bind(this);

    if(distanceDragged < 150){
      reset();
      return;
    }

    this.animating = true;
    this.spinnerIcon.style.transform = "translateY(200px)";
    this.spinnerIcon.style.transition = "transform 0.2s";
    this.spinnerImage.style.opacity = "1";
    this.spinnerIcon.addEventListener('transitionend', refresh);
  }

}

window.addEventListener('load', () => new Refresh());
