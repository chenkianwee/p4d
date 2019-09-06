function resetAllSelection() {
  document.getElementById('myViews').selectedIndex = 0;
  document.getElementById('selectExtrusions').selectedIndex = 0;
  document.getElementById('selectColours').selectedIndex = 0;
  var myMaps = document.getElementById('myMaps');
  var mapOptions = myMaps.getElementsByTagName('input');
  for (i=0; i<mapOptions.length - 1; i++) {
    var input = mapOptions[i+1];
    input.checked = false;
  }
}

function switchOnLoaded(selectedValue, loadedDict){
  loaded = loadedDict[selectedValue];
  loaded.then(function(dataSource) {
    dataSource.show = true;
  })

  var keys = Object.keys(loadedDict);
  var index = keys.indexOf(selectedValue);
  if (index > -1){
    keys.splice(index,1);
  }
  keys.forEach(function(element){
    loadedColour = loadedDict[element];
    loadedColour.then(function(dataSource) {
      dataSource.show = false;})
  })
}

function switchOffAllLoaded(loadedDict){
  var keys = Object.keys(loadedDict);
  if(keys.length !=0) {
    keys.forEach(function(element){
      loadedColour = loadedDict[element];
      loadedColour.then(function(dataSource) {
        dataSource.show = false;})
    })
  }
}
