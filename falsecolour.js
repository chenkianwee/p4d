function loadFalseColourSelect() {
  // load the monthly roof solar
  var colours = document.getElementById('selectColours');
  var mthRoofSolarList = ["Roof Solar Jan", "Roof Solar Feb", "Roof Solar Mar", "Roof Solar Apr",
                          "Roof Solar May", "Roof Solar Jun", "Roof Solar Jul", "Roof Solar Aug",
                          "Roof Solar Sep", "Roof Solar Oct", "Roof Solar Nov", "Roof Solar Dec"];

  for (var i = 0; i <12; i++) {
    var option = document.createElement('option');
    option.value = "roofsolar" + i.toString();
    option.textContent = mthRoofSolarList[i];
    colours.appendChild(option);
  }
}

function loadFalseColour(geoJsonData, label, inverse = false){
  var valueList = [];
  features = geoJsonData.features;

  features.forEach(function(feature){
    valueX = feature.properties.tree_height;
    valueList.push(valueX);
  });

  var maxValue = Math.max.apply(null, valueList);
  var minValue = Math.min.apply(null, valueList);
  setupFalseColourBar(minValue, maxValue, label, inverse = inverse)
  features.forEach(function(feature){
    valueX = feature.properties.tree_height;
    rgb = pseudoColour(valueX, minValue, maxValue, inverse = inverse)
    properties = feature.properties;
    var r = rgb.r.toString();
    var g = rgb.g.toString();
    var b = rgb.b.toString();
    var rgbString = "rgb(" + r + "," + g + "," + b + ")"
    properties["fill"] = rgbString;
    properties["fill-opacity"] = 0.6;
  });

  return geoJsonData;
}

function setupFalseColourBar(minValue, maxValue, label, inverse = false){
  colourBar = document.getElementById("falseColour");
  barList = colourBar.getElementsByTagName("div");
  var interval = barList.length;
  var rangeX = maxValue - minValue;
  var inc = rangeX/interval;
  var inc2 = inc/2;

  for (i=0; i<interval; i++) {
    bar = barList[i];
    var barValue = minValue + (inc*i);
    var barValue2 = barValue + inc;
    var barMid = ((barValue2 - barValue)/2) + barValue;
    barValue = Math.round(barValue*1000)/1000;
    barValue2 = Math.round(barValue2*1000)/1000;
    barMid = Math.round(barMid*1000)/1000;
    var barTxt = barValue.toString() + '-' + barValue2.toString();
    rgb = pseudoColour(barMid, minValue, maxValue, inverse = false)
    var rgbString = "background-color:rgb(" + rgb.r.toString() + "," + rgb.g.toString() + "," + rgb.b.toString() + ");";
    bar.style = rgbString;
    if(i === 0) {
      var barTxt1 = label + ':' +  barTxt;
      bar.color = "rgb(255,0,0)";
      bar.textContent = barTxt1;
    } else {
      bar.textContent = barTxt;
    }
  }
}

function pseudoColour(value, minValue, maxValue, inverse = false){
  var h;
  var rangeX = maxValue - minValue;

  if (value <= minValue) {
    if (inverse === false) {
      h = 250.0;
    } else {
      h = 0.0;
    }
  } else if (value >= maxValue) {
    if (inverse === false) {
      h = 0.0;
    } else {
      h = 250.0;
    }
  } else {
    var normValue = value-minValue;
    if (inverse === false) {
      h = 250 - ((normValue/rangeX) * 250)
    } else {
      h = (normValue/rangeX) * 250
    }
  }
  var normH = h/360;
  rgb = HSVtoRGB( normH, 1.0, 1.0)
  return rgb
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}
