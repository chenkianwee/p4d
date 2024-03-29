// ==========================================================================
// Main Script
// ==========================================================================
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Zjc2MGIyNi05N2NhLTQ2ZjItOTk1My1mYTU2MmEyM2EzYTciLCJpZCI6MTQzNTEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjUyODk5NTF9.viMI8njkZyAJVsXDUsKAuc6ZnIN7NDJCdfU9Pi7po3I';
//Create the cesium viewer
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : Cesium.createTileMapServiceImageryProvider({
        url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    })
});
// Fly to a nice overview of the city.
viewer.camera.flyTo({
    destination : new Cesium.Cartesian3.fromDegrees(-74.654683, 40.341393,5000),
});
//Reset all the selections
resetAllSelection();
//Prepare all the selections
loadFalseColourSelect();
//Load all the urls of the maps
var mapLoadedDict = {};
var mapUrl = 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/json_url/mapurl.json';
//Load all the urls of the falsecolour maps
var colourLoadedDict = {};
var colourUrl = 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/json_url/coloururl.json'
// ==========================================================================
// View Functions
// ==========================================================================
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
  var isChecked = selectMaps.checked

  if(isChecked == true) {
    // Check if this map layer has already been loaded
    if(mapSelect in mapLoadedDict) {
      loaded = mapLoadedDict[mapSelect];
      loaded.then(function(dataSource) {
        dataSource.show = true;
      })
    } else {
      $.getJSON(mapUrl, function(data){
        map2Load = data[mapSelect];
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
            stroke: Cesium.Color.TRANSPARENT,
            fill: Cesium.Color.GREEN.withAlpha(1.0),
            strokeWidth: 3
          });
        }

        viewer.dataSources.add(geoJson);
        mapLoadedDict[mapSelect] = geoJson;
      })
    }
  }
  else {
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

function changeColours(selectedValue) {
  console.log(selectedValue);
  //---------------------------
  //NO MAPS ARE SELECTED
  //---------------------------
  // turn off everything that is loaded
  switchOffAllLoaded(colourLoadedDict);
  switchOffSelected(mapLoadedDict, ["roofs"]);

  //---------------------------------
  //THE TREE HEIGHT MAP IS SELECTED
  //---------------------------------
  if (selectedValue === "treeheight") {
    if(selectedValue in colourLoadedDict) {
      // just reload what is loaded, and turn off the rest of the layers
      switchOnLoaded(selectedValue, colourLoadedDict);
    }
    else {
      // load and process the data
      $.getJSON(colourUrl, function(data){
        geojsonUrl = data[selectedValue];
        $.getJSON(geojsonUrl, function(data){
          // load the chosen data & change the falosecolour bar
          var label = selectedValue + "(m)";
          geoJsonData = loadFalseColour(data, label);
          var promise = Cesium.GeoJsonDataSource.load(geoJsonData, {
            stroke: Cesium.Color.TRANSPARENT
          });
          console.log("finished reading the geojson data");
          promise.then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i=0; i<entities.length;i++) {
              var entity = entities[i];
              // console.log(entity.properties.tree_height._value);
              // entity.polygon.height = 40;
            }
            viewer.zoomTo(dataSource);
          })
          colourLoadedDict[selectedValue] = promise;
        })
      })
    }
  }
  //---------------------------------
  //---------------------------------
  else if (selectedValue === "bldgenergy") {
    console.log("roof");
  }
  //---------------------------------
  //---------------------------------
  else {
    var isRoofSolar = selectedValue.includes("roofsolar");
    if (isRoofSolar === true) {
      // load the roof plan
      if("roofs" in mapLoadedDict) {
        loaded = mapLoadedDict["roofs"];
        loaded.then(function(dataSource) {
          dataSource.show = true;
        })
      } else {
        $.getJSON(mapUrl, function(data){
          roofplan = data["roofs"];
          var promise = Cesium.GeoJsonDataSource.load(roofplan,
          {
            stroke: Cesium.Color.WHITE,
            fill: Cesium.Color.GREY.withAlpha(1.0),
            strokeWidth: 3
          });
          promise.then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i=0; i<entities.length;i++) {
              var entity = entities[i];
              // console.log(entity.properties.tree_height._value);
              var roofHeight = entity.properties.zmax._value;
              entity.polygon.height = roofHeight;
            }
            viewer.zoomTo(dataSource);
          })
          mapLoadedDict["roofs"] = promise;
        });
      }
      // read the solar value from json
      $.getJSON(colourUrl, function(data){
        var roofSolarJsonUrl = data[selectedValue];
        $.getJSON(roofSolarJsonUrl, function(jdata) {
          console.log(jdata.length);
          dynamicFalseColour(mapLoadedDict["roofs"], jdata);
        });

        // var promise = Cesium.GeoJsonDataSource.load(roofplan,
        // {
        //   stroke: Cesium.Color.WHITE,
        //   fill: Cesium.Color.GREY.withAlpha(1.0),
        //   strokeWidth: 3
        // });
        //
        // promise.then(function(dataSource) {
        //   viewer.dataSources.add(dataSource);
        //   var entities = dataSource.entities.values;
        //   for (var i=0; i<entities.length;i++) {
        //     var entity = entities[i];
        //     // console.log(entity.properties.tree_height._value);
        //     var roofHeight = entity.properties.zmax._value;
        //     entity.polygon.height = roofHeight;
        //   }
        //   viewer.zoomTo(dataSource);
        // })
        //
        // mapLoadedDict["roofs"] = promise;
      });
    }
  }
}
