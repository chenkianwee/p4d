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
