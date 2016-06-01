class Ripple {

  constructor() {
    this.buttons = document.querySelectorAll('.ripple');
    this.registerEventListeners();
  }

  registerEventListeners() {
    for(var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', this.createRipple);
    }
  }

  createRipple(evt) {
    var boundingBox = this.getBoundingClientRect();
    console.log(boundingBox);

    var ripple = document.createElement('div');
    ripple.className = "ripple-container";
    ripple.style.width = boundingBox.width;
    ripple.style.height = boundingBox.height;
    ripple.style.top = boundingBox.top;
    ripple.style.left = boundingBox.left;
    this.appendChild(ripple);

    var offsetLeft = evt.screenX - boundingBox.left - 50;
    var offsetTop = evt.screenY - boundingBox.bottom - 75;

    var rippleWave = document.createElement('div');
    rippleWave.className = "ripple-wave";
    rippleWave.style.height = boundingBox.height;
    rippleWave.style.width = boundingBox.height;
    rippleWave.style.top = offsetTop;
    rippleWave.style.left = offsetLeft;
    ripple.appendChild(rippleWave);

    setTimeout(function() {
      rippleWave.style.transform = "scale(10)";
      rippleWave.style.opacity = 0;
      setTimeout(() => ripple.remove(), 1500);
    }, 20);
  }

}

window.addEventListener('load', () => new Ripple());
