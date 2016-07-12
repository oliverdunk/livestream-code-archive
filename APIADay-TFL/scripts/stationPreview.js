class StationPreview {

  constructor() {

  }

  renderStation(data) {
    var container = document.querySelector('.station-preview');
    container.style.display = "block";
    container.querySelector('.name').innerHTML = data.commonName;
    container.querySelector('.id').innerHTML = data.naptanId;

    var modes = data.modes;

    var hasTrain = false;
    var hasTube = false;
    var hasBus = false;

    if(modes.indexOf('national-rail') !== -1) hasTrain = true;
    if(modes.indexOf('international-rail') !== -1) hasTrain = true;
    if(modes.indexOf('bus') !== -1) hasBus = true;
    if(modes.indexOf('tube') !== -1) hasTube = true;

    container.querySelector('.tube').className =
      'service tube' + (hasTube ? "" : " unavailable");

    container.querySelector('.train').className =
      'service train' + (hasTrain ? "" : " unavailable");

    container.querySelector('.bus').className =
      'service bus' + (hasBus ? "" : " unavailable");
  }

}
