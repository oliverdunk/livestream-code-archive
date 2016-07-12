class Search {

  constructor() {
    this.searchElement = document.querySelector('#search');
    this.resultsContainer = document.querySelector('.results');
    this.stationPreview = new StationPreview();

    this.autoComplete = this.autoComplete.bind(this);
    this.onClick = this.onClick.bind(this);
    this.registerEventListeners();
    this.autoComplete();
  }

  registerEventListeners() {
    this.searchElement.addEventListener('input', this.autoComplete);
    document.querySelector('.close').addEventListener('click', function() {
      document.querySelector('.station-preview').style.display = "none";
    });
  }

  autoComplete() {
    var query = this.searchElement.value;
    var resultsContainer = this.resultsContainer;
    var listener = this.onClick;

    this.getSearchResults(query).then(function(results) {
      resultsContainer.innerHTML = '';
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        var div = document.createElement('div');
        div.innerHTML = result.name;
        div.className = 'result';
        div.id = result.id;
        div.addEventListener('click', listener);
        resultsContainer.appendChild(div);
      }
    });
  }

  onClick(evt) {
    var stationPreview = this.stationPreview;
    this.getStopInfo(evt.target.id)
    .then(function(json) {
      stationPreview.renderStation(json);
    })
  }

  getSearchResults(query) {
    query = query.trim();
    return new Promise(function(resolve, reject) {
      if(query.length === 0) resolve([]);
      else fetch("https://api.tfl.gov.uk/Stoppoint/Search/" + query + "?modes=tube")
      .then(function(response) {
        response.json().then(function(json) {
          resolve(json.matches);
        });
      });
    });
  }

  getStopInfo(id) {
    return new Promise(function(resolve, reject) {
      fetch("https://api.tfl.gov.uk/Stoppoint/" + id)
      .then(function(response) {
        response.json().then(function(json) {
          resolve(json);
        });
      })
    });
  }

}

window.addEventListener('load', new Search());
