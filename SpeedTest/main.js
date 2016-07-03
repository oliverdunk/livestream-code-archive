class SpeedTest {

  constructor() {
    this.updateProgress = this.updateProgress.bind(this);
    this.lastRotation = -145;

    this.testFiles = ["https://cdn.rawgit.com/oliverdunk/LiveCode/gh-pages/SpeedTest/files/20MB.zip"];
    this.runTest();
    this.setupServiceWorker();
  }

  setupServiceWorker() {
    //Registers a service worker if the browser supports this
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('serviceWorker.js', { scope: '/livestream-code-archive/SpeedTest/' });
  }

  runTest() {
    this.downloadFile(this.testFiles[0]);
  }

  downloadFile(url) {
    var speedTest = this;
    var request = new XMLHttpRequest();
    request.addEventListener('progress', this.updateProgress);
    request.addEventListener('loadstart', function() {
      //Request has started, keep track of the UNIX time
      speedTest.startTime = new Date().getTime();
    });
    request.open("GET", url + this.getCacheBuster() , true);
    request.send();
  }

  getCacheBuster() {
    return "?" + Math.random().toString(36).substring(7);
  }

  updateProgress(evt) {
    var secondsElapsed = (new Date().getTime() - this.startTime) / 1000;
    var mbPerSecond = (evt.loaded / secondsElapsed / 128 / 1000).toFixed(1);

    document.querySelector('.wheel-text .speed-whole').innerHTML = mbPerSecond.split(".")[0];
    document.querySelector('.wheel-text .speed-dec').innerHTML = `.${mbPerSecond.split(".")[1]}`;

    var rotation = -145 + ((mbPerSecond / 100) * 290);
    if(rotation > 145) rotation = 145;

    anime({
      targets: ['.dial'],
      rotate: [this.lastRotation, rotation],
      duration: 1000,
      elasticity: 700
    });

    this.lastRotation = rotation;
  }

}

window.addEventListener('load', function() {
  new SpeedTest();
});
