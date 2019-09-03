// ==========================================================================
// Main Script
// ==========================================================================
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Zjc2MGIyNi05N2NhLTQ2ZjItOTk1My1mYTU2MmEyM2EzYTciLCJpZCI6MTQzNTEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjUyODk5NTF9.viMI8njkZyAJVsXDUsKAuc6ZnIN7NDJCdfU9Pi7po3I';
var viewer = new Cesium.Viewer('cesiumContainer');
viewer.shouldAnimate = true;
// Fly to a nice overview of the city.
viewer.camera.flyTo({
    destination : new Cesium.Cartesian3.fromDegrees(-74.654683, 40.341393,5000),
});

document.getElementById('myViews').selectedIndex = 0;
// document.getElementById('selectMaps').selectedIndex = 0;

var mapLoadedDict = {};
var mapDict = {"footprint": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/buildings_2015_princeton.geojson',
              "road": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/roads_2015_princeton.geojson',
              "imp": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/imps_2015_princeton.geojson',
              "pervious": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/pervious_2015_princeton.geojson'};

var colourLoadedDict = {};
var colourDict = {'treeheight': 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/treeheights_2015_princeton.geojson'};

var cv  = document.getElementById('cv'),
// console.log(cv);
ctx = cv.getContext('2d');

for(var i = 0; i <= 255; i++) {
    ctx.beginPath();

    // var color = 'rgb(255, ' + i + ', ' + i + ')';
    var color = 'rgb(255, 50, 50)';
    ctx.fillStyle = color;

    ctx.fillRect(i * 2, 0, 2, 4000);
}

// cv.onclick = function(e) {
//     var x = e.offsetX,
//         y = e.offsetY,
//         p = ctx.getImageData(x, y, 1, 1),
//         x = p.data;
//
//     alert('Color: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')');
// };
// ==========================================================================
// Functions
// ==========================================================================
// Views Function
function showViews() {
  document.getElementById('myViews').classList.toggle("show");
}

function changeView(viewSelect) {
  var myViews = document.getElementById('myViews');
  var viewOptions = myViews.getElementsByTagName('option');
  var defaultView = viewOptions[0];
  if (viewSelect === 1) {
    viewer.camera.flyTo({
        destination : new Cesium.Cartesian3.fromDegrees(-74.654683, 40.341393,1000),
    });
  }
  if (viewSelect === 2) {
    viewer.camera.flyTo({
        destination : new Cesium.Cartesian3.fromDegrees(-74.654683, 40.341393,1000),
    });
  }
  if (viewSelect === 3) {
    viewer.camera.flyTo({
        destination : new Cesium.Cartesian3.fromDegrees(-74.654683, 40.341393,1000),
    });
  }
  var viewName = viewOptions[viewSelect].textContent;
  defaultView.textContent="prevSelection:" + viewName;
  myViews.selectedIndex = 0;
  document.getElementById('myViews').classList.toggle("show");
}

// ==============================================================================
// Maps Function
// ==============================================================================
function showMaps() {
  document.getElementById('myMaps').classList.toggle("show");
}

function filterMaps() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("mapsInput");
  filter = input.value.toUpperCase();
  select = document.getElementById("myMaps");
  options = select.getElementsByTagName("li");
  for (i=0; i<options.length; i++) {
    txtValue = options[i].textContent || options[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "";
      // options[i].selected = true;
    } else {
      options[i].style.display = "none";
    }
  }
}

function changeMap(mapSelect) {
  var selectMaps = document.getElementById(mapSelect);
  var map2Load = mapDict[mapSelect];
  var isChecked = selectMaps.checked
  if(isChecked == true) {
    // Check if this map layer has already been loaded
    if(mapSelect in mapLoadedDict) {
      loaded = mapLoadedDict[mapSelect];
      loaded.then(function(dataSource) {
        dataSource.show = true;
      })
    } else {
      if (mapSelect === 'footprint') {
        var geoJson = Cesium.GeoJsonDataSource.load(map2Load,
        {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.GREY.withAlpha(1.0),
          strokeWidth: 3
        });
      } else if (mapSelect === 'road') {
        var geoJson = Cesium.GeoJsonDataSource.load(map2Load,
        {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BLACK.withAlpha(1.0),
          strokeWidth: 3
        });
      } else if (mapSelect === 'imp') {
        var geoJson = Cesium.GeoJsonDataSource.load(map2Load,
        {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.BROWN.withAlpha(1.0),
          strokeWidth: 3
        });
      } else if (mapSelect === 'pervious') {
        var geoJson = Cesium.GeoJsonDataSource.load(map2Load,
        {
          stroke: Cesium.Color.WHITE,
          fill: Cesium.Color.GREEN.withAlpha(1.0),
          strokeWidth: 3
        });
      }

      viewer.dataSources.add(geoJson);
      mapLoadedDict[mapSelect] = geoJson;
    }
  } else {
    loaded = mapLoadedDict[mapSelect];
    loaded.then(function(dataSource) {
      dataSource.show = false;
    })
  }
}

// ==============================================================================
// Extrusions Function
// ==============================================================================
function showExtrusions() {
  document.getElementById('myExtrusions').classList.toggle("show");
}

function filterExtrusions() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("extrusionsInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myExtrusions");
  a = div.getElementsByTagName("option");
  for (i=0; i<a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// ==============================================================================
// FalseColours Function
// ==============================================================================
function showColours() {
  document.getElementById('myColours').classList.toggle("show");
}

function filterColours() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("coloursInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myColours");
  a = div.getElementsByTagName("option");
  for (i=0; i<a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
