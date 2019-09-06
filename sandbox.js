// var cv  = document.getElementById('cv'),
// // console.log(cv);
// ctx = cv.getContext('2d');
//
// for(var i = 0; i <= 255; i++) {
//     ctx.beginPath();
//
//     // var color = 'rgb(255, ' + i + ', ' + i + ')';
//     var color = 'rgb(255, 50, 50)';
//     ctx.fillStyle = color;
//
//     ctx.fillRect(i * 2, 0, 2, 4000);
// }

// cv.onclick = function(e) {
//     var x = e.offsetX,
//         y = e.offsetY,
//         p = ctx.getImageData(x, y, 1, 1),
//         x = p.data;
//
//     alert('Color: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')');
// };


// var viewer = new Cesium.Viewer('cesiumContainer', {
//   terrainProvider : Cesium.createWorldTerrain()});
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : Cesium.createTileMapServiceImageryProvider({
        url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    })
    // baseLayerPicker : false,
    // geocoder : false
});
// viewer.shouldAnimate = true;

// var mapDict = {"footprint": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/buildings_2015_princeton.geojson',
//               "road": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/roads_2015_princeton.geojson',
//               "imp": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/imps_2015_princeton.geojson',
//               "pervious": 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/pervious_2015_princeton.geojson'};
// var colourDict = {'treeheight': 'https://raw.githubusercontent.com/chenkianwee/geojsonexamples/master/treeheights_2015_princeton.geojson',
//                   'solar':'test'};
