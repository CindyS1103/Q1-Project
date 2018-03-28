let submitButton = document.getElementById('searchButton')
submitButton.addEventListener('click', function(e) {
  e.preventDefault()
  var searchBoxValue = document.getElementById('searchInput').value

  fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?source=InciWeb,EO,IDC,NASA_DISP,GDACS,UNISYS,NOAA_CPC`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      let apiData = myJson.events;

      if(searchBoxValue.toLowerCase() === 'wildfires') {
        populateTheSelect('Wildfires')
      } else if(searchBoxValue.toLowerCase() === 'floods') {
        populateTheSelect('Floods')
      } else if(searchBoxValue.toLowerCase() === 'severe storms') {
         populateTheSelect('Severe Storms')
      } else if(searchBoxValue.toLowerCase() === 'temperature extremes') {
          populateTheSelect('Temperature Extremes')

      } else if (searchBoxValue.toLowerCase() === 'volcanoes') {
        populateTheSelect('Volcanoes')
      }

      function populateTheSelect(str) {
        let mydiv = document.getElementById('inlineFormCustomSelectPref');
        let filteredEvents = apiData.filter(event => {

          return event.categories[0].title == str
        })

        for (var i = 0; i < filteredEvents.length; i++) {
          let newdiv = document.createElement("option")
          let myLinks = filteredEvents[i].title;
          newdiv.innerHTML = myLinks;
          newdiv.value = filteredEvents[i].sources[0].url;
          mydiv.appendChild(newdiv);
        }
      }

      document.getElementById("mySidenav").style.width = "50%";

      let resultsButton = document.getElementById('searchResults')
      resultsButton.addEventListener('click', function(e) {
        e.preventDefault();
        let naturalDisasterSelectField = document.getElementById('inlineFormCustomSelectPref');

        window.location.href = naturalDisasterSelectField.value;
        document.getElementById("searchInput").value = "";
      })
    })
});

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("inlineFormCustomSelectPref").innerHTML = "";
  document.getElementById("searchInput").value = "";
}

function myFunction() {
  var x = document.getElementById("myNavbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
